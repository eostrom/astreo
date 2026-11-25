# Astro Upgrade Baseline

Captured before the Astro upgrade on 2026-11-24. Use this as a reference when checking upgrade results; the committed lockfile is the source of truth for the baseline dependency resolutions.

## Source revision

- Baseline commit: `1b7c0793a3f5c222375b445daede490e40a11b08`
- Baseline lockfile: [`yarn.lock`](../yarn.lock) at that commit
- Astro was `5.18.0`; the project used Yarn `4.0.2`.

## Registry versions checked on 2026-11-24

- Latest stable releases: Astro `7.4.13`, `@astrojs/mdx` `8.1.6`, `astro-seo-meta` `7.0.2`, `@astrojs/check` `0.9.12`, and TypeScript `7.0.2`.
- Astro 6 checkpoint releases: Astro `6.4.8`, `@astrojs/mdx` `6.0.3` (peers require Astro `^6.4.0` and `@astrojs/markdown-satteri` `^0.3.0`), and `astro-seo-meta` `6.0.0` (peer requires Astro `^6.0.0`).
- Astro 7 compatibility: `@astrojs/mdx` `8.1.6` requires Astro `^7.2.10`, `@astrojs/markdown-remark` `^7.3.0`, and `@astrojs/markdown-satteri` `^0.4.0`; `astro-seo-meta` `7.0.2` requires Astro `^7.0.0`.
- `@astrojs/check` `0.9.12` accepts TypeScript `^5.0.0 || ^6.0.0`, so TypeScript 7 is not a compatible update for this checkpoint.

## Runtime

- Local Node: `24.16.0` (from `.tool-versions`)
- Production Node: `v24.22.3` (reported by the site owner; not independently verified from deployment configuration)

## Checks

- `yarn build`: passed; `astro check` reported 0 errors and warnings, and the build generated 60 pages.
- `yarn lint-check`: passed.
- No pre-existing build or lint failures were found.
- `yarn install --immutable`: succeeded with an unmet `postcss` peer warning from `postcss-nesting`; this warning is intentionally deferred for now.

## Security audit

- Baseline command: `yarn npm audit --all --recursive --json`
- Result: 139 advisories across 32 packages — 2 critical, 68 high, 55 moderate, and 14 low.
- Reported critical findings included Astro 5.18.0's AVIF optimization issue (reported fixed in Astro 7.2.8 or later) and a transitive `tar` issue via `node-gyp`.
- These are audit findings, not proof that the site is exploitable. The audit should be rerun after dependency upgrades.

## Comparison artifacts

The 60-route baseline manifest is preserved in [`astro-upgrade-baseline-routes.txt`](./astro-upgrade-baseline-routes.txt).