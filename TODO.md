# TODO

- [ ] Add arts/works page
- [ ] Update code/works page
- [ ] Consider rethinking shows page for symmetry
- [ ] set up prettier

- green stuff
  - metrics as of 2026-11-24
    - Ecograder https://ecograder.com/pro/report/93724012-5e25-441f-9d48-fa8158fa3c22/combined
      - 51/100: 61 weight, 95 performance, 4 hosting. 0.417g/view
    - WCC https://www.websitecarbon.com/website/erikostrom-com/
      - grade E, worse than 61% globally. 0.35g/visit
    - CarbonThinking https://carbonthinking.org/r/erikostrom-com-7e9f13?render=1
      - rating C, cleaner than 78% "of those tested by this model." 0.46g, 0.009g cached
  - [ ] drop Twitter JS
  - [ ] shrink background image
  - [ ] green hosting (Cloudflare?)
    - https://dannymoons.nl/posts/exploring-cloudflare-as-a-vercel-alternative
- performance
  - 2026-11-24: Lighthouse 96
  - [ ] dependency tree – HTML to CSS to fonts
  - [ ] giant image
  - [ ] Twitter widget cache lifetime
- a11y
  - 2026-11-24: Lighthouse 88 (compare with before color audit)
  - [ ] works non-link
  - [x] no main landmark on home page (or elsewhere)
- [ ] security audit
  - yarn npm audit --all --recursive
- [ ] Link between corresponding code/arts pages (right now the sidebar
      always goes to "words")
- [ ] disable side panel links to the same site section
- [ ] disable nav links to the page you're already on (fixes the
      `shows` fade-out/fade-in flicker on arts->arts navigation, same
      root cause as the side panel item above)
- [ ] improve semantic markup (header/footer tags, etc.)
