(() => {
    const summary = document.querySelector('[data-scholar-stats-url]');
    if (!summary) return;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    fetch(summary.dataset.scholarStatsUrl, { cache: 'no-store', signal: controller.signal })
        .then(response => {
            if (!response.ok) throw new Error('Citation data unavailable');
            return response.json();
        })
        .then(data => {
            const scholarId = String(data.scholar_id || '').split('&')[0];
            // Older crawler files stored a UTC timestamp without an ISO separator.
            const timestamp = String(data.updated || '');
            const date = new Date(timestamp.includes('T') ? timestamp : timestamp.replace(' ', 'T') + 'Z');
            if (scholarId !== summary.dataset.scholarId ||
                !Number.isSafeInteger(data.citedby) || data.citedby < 0 ||
                Number.isNaN(date.getTime())) throw new Error('Invalid citation data');
            summary.querySelector('[data-citation-count]').textContent = data.citedby.toLocaleString('en-US');
            const updated = summary.querySelector('[data-citation-updated]');
            updated.textContent = 'Updated ' + date.toLocaleDateString('en-US', {
                year: 'numeric', month: 'short', day: '2-digit', timeZone: 'Asia/Shanghai'
            });
            updated.title = 'Latest successful Google Scholar sync: ' + date.toISOString();
        })
        .catch(() => {
            summary.querySelector('[data-citation-updated]').title =
                'Showing the last available count. Open Google Scholar for the latest citations.';
        })
        .finally(() => clearTimeout(timeout));
})();
