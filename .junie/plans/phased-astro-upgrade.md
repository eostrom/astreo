---
sessionId: session-261102-145414-1mge
---

# Requirements

### Goal

Upgrade from Astro 5 to the latest stable Astro safely, with a working Astro 6 checkpoint and separately validated dependency updates. Preserve existing routes, content, presentation and SEO metadata.

### Scope

- Inventory direct dependencies, peer requirements, security advisories and the deployment runtime before changing versions.
- Upgrade the Astro ecosystem in compatible groups; update other dependencies in isolated groups when safe, recording any deferred incompatibilities.
- Keep TypeScript on a version supported by `@astrojs/check`; its current latest release supports TypeScript 5 or 6, not 7.
- Do not redesign the site or replace its hosting setup. If the deployment Node version cannot be verified from available configuration, report it as an outstanding deployment prerequisite.
- Complete one delivery stage at a time, present its checklist and results for user review, and wait for approval before beginning the next stage.

# Technical Design

### Current state

- `package.json` and `yarn.lock` use Yarn 4.0.2, Astro 5.18, MDX 4, `astro-seo-meta` 5 and `astro check && astro build`. The registry currently lists Astro 7.4.5 as latest; recheck all versions and peer ranges when executing.
- `.tool-versions` pins Node 24.16.0, compatible with the current Astro 7 minimum of 22.23.4. No hosting or CI configuration was found to verify production Node.
- `src/content/config.ts` defines legacy `words` and `shows` collections. Both article routes and `src/components/ShowRow.astro` call `entry.render()`; routes derive their slugs from titles.
- `astro.config.mjs` configures MDX and a custom Shiki theme. `eslint.config.mjs` directly imports `astro-eslint-parser`, which is not declared in `package.json`.

### Upgrade approach

- Establish baseline output and validation results before dependency changes. Preserve existing unrelated edits; distinguish pre-existing failures from regressions.
- First migrate the collections on Astro 5: move the configuration to `src/content.config.ts`, use explicit `glob()` loaders for the existing directories and Markdown/MDX files, remove legacy `type` fields, and use `render(entry)` from `astro:content`. Preserve schemas, title-based route slugs, draft filtering and ordering.
- Upgrade to the latest compatible Astro 6, MDX and SEO package versions together, observing their peer requirements. Check Zod 4 schema and frontmatter behavior, Shiki/theme output, heading IDs and SEO API compatibility. Keep this as a verified checkpoint before Astro 7.
- Upgrade Astro and integrations to mutually compatible current stable versions. Astro 7 changes the Markdown processor, compiler and whitespace behavior: preserve rendered content and links, fixing invalid templates or selecting documented compatibility settings only where needed. Check MDX's Markdown processor peers rather than installing optional packages blindly.
- Update lint/format tooling and other direct dependencies separately, respecting peers. Declare `astro-eslint-parser` directly if retained; update `eslint.config.mjs` only as needed for compatible tooling. Defer unsupported major versions rather than forcing peer mismatches.

### Files

- Modify `package.json`, `yarn.lock`, `astro.config.mjs`, the two `src/pages/{arts,code}/words/[slug].astro` routes, `src/components/ShowRow.astro`, and any affected templates or lint configuration only as required.
- Move `src/content/config.ts` to `src/content.config.ts`; retain the existing `src/content/words` and `src/content/shows` data.

### References

- [Astro 6 migration guide](https://docs.astro.build/en/guides/upgrade-to/v6/)
- [Astro 7 migration guide](https://docs.astro.build/en/guides/upgrade-to/v7/)

# Testing

### Validation

- Record the existing build and lint results, installed/available versions and peer warnings before changes. Save a baseline route manifest and representative generated HTML outside the project; do not assume the initial build or lint is clean.
- At each checkpoint run `yarn build` and `yarn lint-check`, compare against the baseline, and verify a reproducible Yarn install and peer requirements. Investigate new failures before proceeding.
- Compare generated routes and article counts, draft exclusion, both article sections and title-derived links; check show content, date parsing and ordering, accounting for the build-date-dependent show list.
- Check representative Markdown and MDX pages for headings and anchor IDs, links, images, fenced-code highlighting and the custom theme; compare SEO/Open Graph/Twitter tags, CSS and inline spacing. Smoke-test development and production preview routes.
- Report unresolved pre-existing failures, compatibility deferrals and any unverified production Node/deployment requirements; do not claim deployment validation without access.

# Delivery Steps

Complete one stage at a time. At each stage's review checkpoint, present the completed checklist, changes and validation results; stop and wait for user approval before starting the next stage.

### Step 1: Establish upgrade baseline and inventory

The existing site and dependency constraints have a recorded baseline for review.

- [x] Capture current build and lint results, dependency/peer and security findings, and representative generated routes and HTML outside the project.
- [ ] Verify local Node and Yarn versions and identify any accessible deployment runtime configuration.
- [ ] Record pre-existing failures and the exact stable versions available at execution time.
- [ ] Present the baseline checklist and findings; pause for user review and approval.

### Step 2: Migrate legacy content collections on Astro 5

Existing articles and shows use the current content-layer APIs without changing their public behavior.

- [ ] Move `src/content/config.ts` to `src/content.config.ts` and define explicit loaders for both collections.
- [ ] Replace legacy rendering calls in both article routes and `src/components/ShowRow.astro` with `render(entry)`.
- [ ] Build and compare routes, drafts, content and show ordering with the baseline.
- [ ] Present the migration checklist, changes and validation results; pause for user review and approval.

### Step 3: Upgrade and validate Astro 6 ecosystem

A compatible Astro 6 checkpoint builds and preserves the existing site.

- [ ] Update Astro, MDX, SEO integration and checker to mutually compatible versions in `package.json` and `yarn.lock`.
- [ ] Resolve applicable Zod 4, frontmatter, SEO, Shiki and heading differences without changing intended content or URLs.
- [ ] Run build and lint checks and compare representative generated pages and metadata.
- [ ] Present the Astro 6 checklist, changes and validation results; pause for user review and approval.

### Step 4: Upgrade to current stable Astro

The site runs on the latest compatible stable Astro release with its rendering behavior checked.

- [ ] Update Astro and its integrations together, checking Node and processor peer requirements.
- [ ] Address Astro 7 compiler, Markdown and whitespace changes in affected configuration or templates while preserving content and presentation.
- [ ] Validate routes, Markdown and MDX output, heading anchors, styles, SEO, development and production preview.
- [ ] Present the Astro upgrade checklist, changes and validation results; pause for user review and approval.

### Step 5: Update remaining compatible dependencies

Other dependency groups are updated where compatible, with unsupported upgrades documented.

- [ ] Update runtime libraries and lint/format tooling in separate compatible groups; fix peer declarations and tool configuration where necessary.
- [ ] Keep TypeScript within `@astrojs/check`'s supported range and record any other deferred major upgrades.
- [ ] Re-run build, lint, dependency/peer checks and representative site comparisons; report remaining deployment prerequisites.
- [ ] Present the dependency-update checklist, changes and validation results for final user review.
