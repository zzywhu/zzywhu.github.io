"""Fetch the public Scholar profile; keep existing statistics if fetching fails."""

import argparse
import json
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


class CitationParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_table = False
        self.in_cell = False
        self.cells = []
        self.cell = ""

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "table" and attrs.get("id") == "gsc_rsb_st":
            self.in_table = True
        if self.in_table and tag == "td" and "gsc_rsb_std" in attrs.get("class", "").split():
            self.in_cell = True
            self.cell = ""

    def handle_data(self, data):
        if self.in_cell:
            self.cell += data

    def handle_endtag(self, tag):
        if tag == "td" and self.in_cell:
            self.cells.append(self.cell.strip())
            self.in_cell = False
        if tag == "table":
            self.in_table = False


def fetch_stats(scholar_id):
    request = Request(
        "https://scholar.google.com/citations?user=" + scholar_id + "&hl=en",
        headers={"User-Agent": "Mozilla/5.0", "Accept-Language": "en-US,en;q=0.9"},
    )
    with urlopen(request, timeout=30) as response:
        page = response.read().decode("utf-8")
    parser = CitationParser()
    parser.feed(page)
    # All-time and recent counts alternate: citations, h-index, i10-index.
    if len(parser.cells) < 6:
        raise ValueError("Scholar statistics table unavailable; previous data was not changed")
    numbers = [value.replace(",", "").replace("\u00a0", "") for value in parser.cells[:6]]
    if not all(value.isascii() and value.isdigit() for value in numbers):
        raise ValueError("Invalid Scholar statistics; previous data was not changed")
    return {
        "scholar_id": scholar_id,
        "citedby": int(numbers[0]),
        "hindex": int(numbers[2]),
        "i10index": int(numbers[4]),
        "updated": datetime.now(timezone.utc).isoformat(timespec="seconds"),
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--scholar-id", required=True)
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()
    if not all(character.isalnum() or character in "_-" for character in args.scholar_id):
        parser.error("Scholar ID must contain only letters, numbers, underscores or hyphens")
    try:
        stats = fetch_stats(args.scholar_id)
    except (HTTPError, URLError, TimeoutError, ValueError) as error:
        if args.output.exists():
            print(f"Failed to refresh Scholar statistics ({error}); keeping existing data.")
            return
        raise RuntimeError("Failed to fetch Scholar statistics and no previous data exists.") from error
    temporary = args.output.with_suffix(".tmp")
    temporary.write_text(json.dumps(stats, indent=2) + "\n", encoding="utf-8")
    temporary.replace(args.output)
    print("Google Scholar citations:", stats["citedby"])


if __name__ == "__main__":
    main()
