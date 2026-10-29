# Zhiyu Zhou’s academic homepage

Rebuilt from [w-r-s/academic-homepage-template](https://github.com/w-r-s/academic-homepage-template), upstream commit 3e688b9cdb8928aa90ce2469b932cd4661723f97. The original stylesheet, profile table, SVG contact icons, publication cards, and custom cursors replace the previous template. Jekyll supplies personal content from the existing data files.

## Content and design

- _data/profile.yml: biography, contact details and honors.
- Experience lists the AGIBOT internship, Wuhan University Ph.D. studies and undergraduate studies, using logos in experience/.
- _data/research.yml: four research directions and their descriptions.
- _publications/: publication metadata, covers and links.
- Publications are grouped by the four research directions, with first-author papers first and newest papers first within each authorship group. Demo media occupy 44% of desktop cards; talks use compact images beside their descriptions.
- _news/: news entries and icons.
- _includes/: the new template’s data-driven sections.
- stylesheet.css: upstream stylesheet with the unused landscape footer removed.
- template-components.css: white publication card styles adapted from the upstream HTML.
- custom.css: responsive layout and personal-content integration.
- assets/js/site.js: author expansion and navigation.
- images/icon/: original template cursor assets.
- cv_zhiyu_zhou/, files/, patent/, talks/: retained personal documents.

## Local preview

```sh
bundle config set --local path vendor/bundle
bundle install
bundle exec jekyll serve
```

Open http://localhost:4000. To build only, run `bundle exec jekyll build`.
Docker users can run `docker compose up --build`.

The pre-existing LICENSE is retained for the earlier template-derived history. The new template is credited above.
