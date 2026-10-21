# Zhiyu Zhou’s academic homepage

A minimal Jekyll site hosted on GitHub Pages. No Node.js build or frontend framework is required.

## Content

- `_data/profile.yml`: biography, contact details, education, experience and awards.
- `_publications/`: publication metadata, images and links, displayed newest first.
- `_news/`: dated news entries.
- `_includes/patent_list.html`: shared patent list.
- `talks.html`: presentations.
- `assets/css/minimal.css`: responsive site styles.
- `assets/js/research-tabs.js`: publication, patent and talk tabs.
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
