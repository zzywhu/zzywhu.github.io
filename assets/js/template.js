(function() {
  if (!document.getElementById('tagFilter')) return;
// Interactions from w-r-s/academic-homepage-template, adapted only for personal content.
            // Inject counts into tag buttons (after full DOM is parsed)
            document.addEventListener('DOMContentLoaded', function() {
              const rows = document.querySelectorAll('tr[data-tags]');
              const total = rows.length;
              document.querySelectorAll('.tag-btn').forEach(function(btn) {
                const tag = btn.dataset.tag;
                const count = tag === 'all' ? total : Array.from(rows).filter(r => r.dataset.tags.split(',').includes(tag)).length;
                btn.insertAdjacentHTML('beforeend', '<span class="tag-count">' + count + '</span>');
              });
            });

            // Tag filter
            document.getElementById('tagFilter').addEventListener('click', function(e) {
              const btn = e.target.closest('.tag-btn');
              if (!btn) return;
              document.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active'));
              btn.classList.add('active');
              document.querySelectorAll('.tag-btn').forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
              const tag = btn.dataset.tag;
              document.querySelectorAll('tr[data-tags]').forEach(function(row) {
                row.style.display = (tag === 'all' || row.dataset.tags.split(',').includes(tag)) ? '' : 'none';
              });
            });


})();

	          (function() {
	            var rows = document.querySelectorAll('.publications-table tr[data-tags]');

	            rows.forEach(function(row, index) {
	              var title = row.querySelector('papertitle');
	              if (!title) return;

	              var titleContainer = title.closest('a') || title;
	              var firstBreak = titleContainer.nextElementSibling;
	              if (!firstBreak || firstBreak.tagName !== 'BR') return;

	              var lastBreak = firstBreak.nextElementSibling;
	              while (lastBreak && lastBreak.tagName !== 'BR') {
	                lastBreak = lastBreak.nextElementSibling;
	              }
	              if (!lastBreak) return;

	              var authorNodes = [];
	              var node = firstBreak.nextSibling;
	              while (node && node !== lastBreak) {
	                authorNodes.push(node);
	                node = node.nextSibling;
	              }

	              var shell = document.createElement('div');
	              shell.className = 'publication-authors-shell';
	              var authors = document.createElement('div');
	              authors.className = 'publication-authors';
	              authors.id = 'publication-authors-' + index;
	              authorNodes.forEach(function(authorNode) {
	                authors.appendChild(authorNode);
	              });

	              var toggle = document.createElement('button');
	              toggle.type = 'button';
	              toggle.className = 'publication-authors-toggle';
	              toggle.textContent = '▶';
	              toggle.setAttribute('aria-controls', authors.id);
	              toggle.setAttribute('aria-expanded', 'false');
	              toggle.setAttribute('aria-label', 'Expand author list');
	              toggle.title = 'Expand author list';

	              shell.appendChild(authors);
	              shell.appendChild(toggle);
	              firstBreak.parentNode.insertBefore(shell, firstBreak);
	              firstBreak.remove();
	              lastBreak.remove();

	              toggle.addEventListener('click', function() {
	                var expanded = shell.classList.toggle('expanded');
	                toggle.textContent = expanded ? '▼' : '▶';
	                toggle.setAttribute('aria-expanded', String(expanded));
	                toggle.setAttribute('aria-label', expanded ? 'Collapse author list' : 'Expand author list');
	                toggle.title = expanded ? 'Collapse author list' : 'Expand author list';
	              });
	            });

	            function updateAuthorToggles() {
	              document.querySelectorAll('.publication-authors-shell').forEach(function(shell) {
	                var authors = shell.querySelector('.publication-authors');
	                var toggle = shell.querySelector('.publication-authors-toggle');
	                var wasExpanded = shell.classList.contains('expanded');
	                if (wasExpanded) shell.classList.remove('expanded');
	                var hasOverflow = authors.scrollHeight > authors.clientHeight + 1;
	                if (wasExpanded) shell.classList.add('expanded');
	                toggle.hidden = !hasOverflow;
	              });
	            }

	            updateAuthorToggles();
              var filter = document.getElementById('tagFilter');
              if (filter) filter.addEventListener('click', function() { requestAnimationFrame(updateAuthorToggles); });

	            var resizeFrame;
	            window.addEventListener('resize', function() {
	              cancelAnimationFrame(resizeFrame);
	              resizeFrame = requestAnimationFrame(updateAuthorToggles);
	            }, { passive: true });
	          })();
    // Back to Top
    (function() {
      var btn = document.getElementById('backToTop');

      window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
          btn.classList.add('visible');
        } else {
          btn.classList.remove('visible');
        }
      });
    })();

    function scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
