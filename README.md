# Zhiyu Zhou’s academic homepage

Content migrated directly into [w-r-s/academic-homepage-template](https://w-r-s.github.io/academic-homepage-template/), [source repository](https://github.com/w-r-s/academic-homepage-template), upstream commit `3e688b9cdb8928aa90ce2469b932cd4661723f97`.

The root `stylesheet.css` is an unchanged copy of the upstream stylesheet. The page uses the upstream profile table, headings, news dates, contact icons, publication card markup, direction filter buttons, author expansion and experience rows. The previous custom stylesheet, separate card stylesheet, layout overrides and sidebar navigation have been removed. Citation statistics, the biography-copy character, the landscape footer and yellow paper highlights remain removed as requested.

Jekyll supplies personal content: 14 publications with original links/media, four research directions, nine news entries, three experience entries, three patents, two presentations and six honors. Direction buttons filter the same paper table; first-author papers come first, with newest papers first within each authorship group. There are no fictional author or link replacements from the sample template. Research and Patents align with Publications; paper media fill a 34% column with a smaller gap to the text, as requested.

- `_data/profile.yml`: biography, contact information, experience, education and honors.
- `_data/research.yml`: publication filters and research descriptions.
- `_publications/` and `_news/`: publication and news content.
- `_includes/` and `_layouts/default.html`: personal content rendered in upstream markup.
- `assets/js/template.js`: upstream filtering, author expansion and back-to-top interactions.
- `experience/`, `images/`, `files/`, `patent/`, `talks/`, `cv_zhiyu_zhou/`: preserved personal assets and documents.

## Local preview

```sh
BUNDLE_PATH=vendor/bundle bundle exec jekyll serve
```

Open http://localhost:4000. Build with `BUNDLE_PATH=vendor/bundle bundle exec jekyll build`.

The pre-existing LICENSE is retained for the earlier template-derived history. The new template is credited above.
