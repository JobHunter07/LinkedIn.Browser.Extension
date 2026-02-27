# Project Overview

## Purpose
LinkedIn.Browser.Extension is a Manifest V3 browser extension for LinkedIn that reduces feed noise and provides job-hunt utilities.

Current user-facing capabilities include:
- Hiding Promoted posts in the feed
- Hiding Suggested posts in the feed
- Hiding LinkedIn News and ad/sidebar modules on supported pages
- Focus Mode (hide main feed content)
- Theme toggle (dark/light) for the control panel
- Saved Job preview surfaced in the panel via `window.postMessage`

The extension runs as a LinkedIn content script, mounts a React UI into a Shadow DOM host, and applies DOM filtering logic based on persisted user settings.

## Tech Stack
- Language: TypeScript
- UI: React 18 (`react`, `react-dom`)
- Build tooling: Vite 5 + `@crxjs/vite-plugin`
- Styling: Tailwind CSS + project CSS
- Icons/UI libs: `lucide-react`, `@mui/material`, `@emotion/*`
- Storybook: Storybook 10 + Vitest addon integration
- Testing runtime support: Vitest + Playwright browser provider (storybook tests configured)

## Runtime Architecture
- Extension manifest: `manifest.json` (MV3)
- Content script entry: `src/index.tsx`
  - Injects host node into LinkedIn pages
  - Mounts React app inside Shadow DOM
  - Injects bundled control-panel CSS into shadow root
- App shell: `src/App.tsx`
  - Loads settings from `chrome.storage.sync`
  - Reacts to storage updates
  - Initializes feed/news purger based on settings
  - Handles saved-job message events and panel visibility
- Filtering engine: `src/services/FilterEngine.ts`
  - Uses DOM queries + mutation observation to hide targeted content
  - Applies toggles for promoted/suggested/news/feed states
- Settings layer: `src/components/useSettings.ts`
  - `getAll` and partial writes to `chrome.storage`
  - Uses defaults from `src/components/constants.ts`

## Build & Dev Commands
- Install dependencies: `npm install`
- Dev (Chromium mode): `npm run dev`
- Dev (Firefox mode): `npm run dev:firefox`
- Build (Chromium mode): `npm run build`
- Build (Firefox mode): `npm run build:firefox`
- Storybook: `npm run storybook`
- Build Storybook: `npm run build-storybook`

Firefox build notes:
- `scripts/run-env.js` sets env vars cross-platform (uses `cross-env` on Windows)
- `scripts/strip-use-dynamic-url.js` post-processes `dist/manifest.json` for Firefox compatibility

## Conventions
- Keep changes focused and minimal; avoid unrelated refactors.
- Prefer TypeScript types from existing shared definitions (`Settings`, etc.).
- Use React function components and hooks.
- Persist user preferences in `chrome.storage.sync` unless explicitly needing local-only state.
- For content filtering, prefer robust selector fallbacks and safe null checks.
- UI should remain compatible with Shadow DOM injection model.

## Testing & Validation Expectations
- Validate TypeScript/build success after changes.
- Required in this repository: run `npm run build:firefox` after code changes.
- If build errors occur, fix and re-run until clean.
- For UI/component changes, optionally validate with Storybook where relevant.

## Scope Boundaries
- Target surface is LinkedIn pages matching `https://www.linkedin.com/*`.
- Extension currently requires only `storage` permission.
- Browser support focus:
  - Chromium-based browsers (standard build)
  - Firefox/Gecko (firefox build path + manifest post-process)

## Key Files
- `manifest.json`
- `vite.config.ts`
- `src/index.tsx`
- `src/App.tsx`
- `src/services/FilterEngine.ts`
- `src/components/useSettings.ts`
- `src/components/constants.ts`
- `scripts/run-env.js`
- `scripts/strip-use-dynamic-url.js`

## OpenSpec Guidance
When proposing or implementing OpenSpec changes in this repo:
- Anchor behavior changes to concrete user-visible extension functionality.
- Call out whether changes affect content filtering selectors, settings schema, or UI controls.
- Include browser-compatibility considerations when touching build/manifest logic.
- Treat Firefox build success as a release gate for completion.