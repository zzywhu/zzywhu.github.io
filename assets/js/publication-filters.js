(() => {
    document.querySelectorAll('[data-publication-browser]').forEach(browser => {
        const filters = browser.querySelector('.publication-filters');
        const buttons = Array.from(filters.querySelectorAll('[data-publication-filter]'));
        const list = browser.querySelector('[data-publication-list]');
        const papers = Array.from(list.querySelectorAll('.research-item'));
        const originalOrder = new Map(papers.map((paper, index) => [paper, index]));

        function select(category) {
            buttons.forEach(button => {
                button.setAttribute('aria-pressed', String(button.dataset.publicationFilter === category));
            });
            const ordered = [...papers].sort((left, right) => {
                if (category !== 'all') {
                    const priority = Number(right.dataset.firstAuthor === 'true') - Number(left.dataset.firstAuthor === 'true');
                    if (priority) return priority;
                }
                return right.dataset.publicationDate.localeCompare(left.dataset.publicationDate) ||
                    originalOrder.get(left) - originalOrder.get(right);
            });
            ordered.forEach(paper => {
                paper.hidden = category !== 'all' && paper.dataset.publicationCategory !== category;
            });
            list.append(...ordered);
        }

        buttons.forEach(button => button.addEventListener('click', () => select(button.dataset.publicationFilter)));
        select('all');
        filters.hidden = false;
    });
})();
