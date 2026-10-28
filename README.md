# Zhiyu Zhou’s academic homepage

A minimal Jekyll site hosted on GitHub Pages. No Node.js build or frontend framework is required.

## Content

- `_data/profile.yml`: biography, contact details, education, experience and awards.
- `_data/research.yml`: four research directions, their introductory sentences and publication filter labels.
- `_publications/`: publication metadata, images and links; `research_area` assigns a paper to `slam`, `calibration`, `perception` or `embodied`.
- `_news/`: dated news entries.
- `_includes/patent_list.html`: shared patent list.
- `talks.html`: presentations.
- `assets/css/minimal.css`: responsive site styles.
- `assets/js/research-tabs.js`: publication, patent and talk tabs.
- `assets/js/publication-filters.js`: research-area filters; All shows newest first, while each area puts first-author papers first and sorts each authorship group newest first.
- `assets/js/scholar-citations.js`: loads the latest citation count from the `google-scholar-stats` branch, without rebuilding the site.
- `cv_zhiyu_zhou/`: retained LaTeX résumé sources.

## Local preview

```sh
bundle config set --local path vendor/bundle
bundle install
bundle exec jekyll serve
```

Open http://localhost:4000. To build only, run `bundle exec jekyll build`.
Docker users can run `docker compose up --build`.

The original template is [academic-homepage](https://github.com/luost26/academic-homepage). See `LICENSE`.

## Citation updates

The `Update Google Scholar citations` workflow fetches the public Scholar profile every six hours and can also be run manually from Actions. It runs once when its workflow or crawler is pushed to `main`. No API key is required. Successful fetches update `google-scholar-stats/gs_data.json`; failed or blocked fetches leave the previous count intact. The homepage displays the last successful sync date, rather than claiming a live connection to Google Scholar. Its initial offline fallback is the historical snapshot in `_data/scholar_stats.json`.
