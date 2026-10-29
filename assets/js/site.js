/* Interactions for the w-r-s academic homepage template and personal paper data. */
(() => {
    const authorShells = Array.from(document.querySelectorAll('.publication-authors-shell'));
    function updateAuthors() {
        authorShells.forEach(shell => {
            const authors = shell.querySelector('.publication-authors');
            const button = shell.querySelector('.publication-authors-toggle');
            if (!authors.getClientRects().length) return;
            const expanded = shell.classList.contains('expanded');
            if (expanded) shell.classList.remove('expanded');
            button.hidden = authors.scrollHeight <= authors.clientHeight + 1;
            if (expanded) shell.classList.add('expanded');
        });
    }
    authorShells.forEach(shell => {
        const button = shell.querySelector('.publication-authors-toggle');
        button.addEventListener('click', () => {
            const expanded = shell.classList.toggle('expanded');
            button.textContent = expanded ? '▼' : '▶';
            button.setAttribute('aria-expanded', String(expanded));
            button.setAttribute('aria-label', expanded ? 'Collapse author list' : 'Expand author list');
        });
    });

    updateAuthors();
    window.addEventListener('resize', updateAuthors, { passive: true });
    if (document.fonts) document.fonts.ready.then(updateAuthors);

    const backToTop = document.getElementById('backToTop');
    const nav = document.querySelector('.section-drip-nav');
    function updateScroll() {
        if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 300);
    }
    if (backToTop) backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    });
    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', updateScroll, { passive: true });
    updateScroll();
    if (nav && 'IntersectionObserver' in window) {
        const links = Array.from(nav.querySelectorAll('a'));
        const visible = new Set();
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => entry.isIntersecting ? visible.add(entry.target.id) : visible.delete(entry.target.id));
            const current = links.find(link => visible.has(link.hash.slice(1)));
            if (!current) return;
            links.forEach(link => {
                if (link === current) link.setAttribute('aria-current', 'location');
                else link.removeAttribute('aria-current');
            });
        }, { rootMargin: '-5% 0px -55% 0px' });
        links.forEach(link => {
            const section = document.getElementById(link.hash.slice(1));
            if (section) observer.observe(section);
        });
    }
})();
