## Why

The extension popup currently uses text-based buttons ("Control", "Save Job", "Saved Job") that take up horizontal space and feel inconsistent with modern app experiences. Replacing them with recognizable Material UI icons creates a cleaner, phone-app-style header that communicates function visually and reduces clutter.

## What Changes

- Replace the "Control" text button with the `VolumeOff` icon from `@mui/icons-material`
- Replace the "Save Job" text button with the `Work` icon from `@mui/icons-material`
- Replace the "Saved Job" text button with the `ViewList` icon from `@mui/icons-material`
- Remove all visible button labels; icons stand alone (no tooltips required unless noted in design)
- Install `@mui/icons-material` and `@mui/material` peer dependencies if not already present

## Capabilities

### New Capabilities

- `icon-navigation-buttons`: Icon-only navigation buttons in the popup header replacing the existing text-based Control / Save Job / Saved Job buttons

### Modified Capabilities

<!-- No existing spec-level requirements are changing -->

## Impact

- `src/components/Header.tsx` – button rendering logic updated to use MUI icon components
- `src/components/Header.stories.tsx` – stories updated to reflect new icon buttons
- `package.json` – may require adding `@mui/icons-material` and its peer dependencies (`@mui/material`, `@emotion/react`, `@emotion/styled`)
- Bundle size will increase slightly due to MUI icon imports (tree-shaken per icon used)
