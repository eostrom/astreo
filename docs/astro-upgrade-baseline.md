# Astro Upgrade Baseline

Captured before the Astro upgrade on 2026-11-24. Use this as a reference when checking upgrade results; the committed lockfile is the source of truth for the baseline dependency resolutions.

## Source revision

- Baseline commit: `1b7c0793a3f5c222375b445daede490e40a11b08`
- Baseline lockfile: [`yarn.lock`](../yarn.lock) at that commit
- Astro was `5.18.0`; the project used Yarn `4.0.2`.

## Runtime

- Local Node: `24.16.0` (from `.tool-versions`)
- Production Node: `v24.22.3` (reported by the site owner; not independently verified from deployment configuration)

## Checks

- `yarn build`: passed; `astro check` reported 0 errors and warnings, and the build generated 60 pages.
- `yarn lint-check`: passed.
- `yarn install --immutable`: succeeded with an unmet `postcss` peer warning from `postcss-nesting`; this warning is intentionally deferred for now.

## Security audit

- Baseline command: `yarn npm audit --all --recursive --json`
- Result: 139 advisories across 32 packages — 2 critical, 68 high, 55 moderate, and 14 low.
- Reported critical findings included Astro 5.18.0's AVIF optimization issue (reported fixed in Astro 7.2.8 or later) and a transitive `tar` issue via `node-gyp`.
- These are audit findings, not proof that the site is exploitable. The audit should be rerun after dependency upgrades.

## Comparison artifacts

At baseline, a 60-route manifest and representative home, arts article, MDX article, and shows HTML snapshots were saved outside the repository at:

`/var/folders/mw/nf9wcwv95x54tl3pxkxn0tb40000gp/T/junie-session-261102-145414-1mge/astro-baseline`

This is a temporary system location and may no longer be available; the committed lockfile and this note are the durable baseline records.