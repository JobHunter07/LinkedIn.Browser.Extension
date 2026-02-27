## Context

The popup currently renders three text-based interactive elements across two components:

- **`SaveJobButton.tsx`** – a `<button>` labeled "Save Job"
- **`ControlPanel.tsx`** – two `<button role="tab">` elements labeled "Control" and "Saved Job"

These text labels consume horizontal space and look out of place compared to the icon-driven header (which already uses `lucide-react` icons). The goal is to replace all three with icon-only buttons using Material UI icons, matching the phone-app aesthetic shown in the design mockup.

The project already has `@mui/material`, `@emotion/react`, and `@emotion/styled` installed. Only `@mui/icons-material` needs to be added.

## Goals / Non-Goals

**Goals:**
- Replace "Control" tab button with `VolumeOffIcon` from `@mui/icons-material`
- Replace "Save Job" button with `WorkIcon` from `@mui/icons-material`
- Replace "Saved Job" tab button with `ViewListIcon` from `@mui/icons-material`
- Maintain all existing click/functionality behavior (tab switching, job saving)
- Keep ARIA accessibility: use `aria-label` on each icon button so screen readers still describe function
- Add `@mui/icons-material` as a production dependency

**Non-Goals:**
- Replacing the theme toggle or close icons in `Header.tsx` (those already use lucide-react icons and are not in scope)
- Adding tooltips or hover text (icons stand alone)
- Changing any state management, tab logic, or job-save logic
- Re-styling other UI elements

## Decisions

### Use `@mui/icons-material` SVG icon components directly

**Decision**: Import individual MUI icon components (e.g., `import VolumeOffIcon from '@mui/icons-material/VolumeOff'`) and render them inside existing `<button>` elements rather than using MUI `<IconButton>`.

**Rationale**: Keeps the existing button markup and CSS class names intact (`.nnl-tab-btn`, `.nnl-save-job-btn`). Swapping only the inner content minimizes diff and avoids introducing MUI's own styling system for button chrome, which could conflict with Tailwind/custom CSS.

**Alternative considered**: Use MUI `<IconButton>` wrapper. Rejected because MUI `IconButton` brings its own padding, ripple, and styling that would override or conflict with existing `.nnl-tab-btn` styles.

### Icon mapping as specified in mockup

| Current button | Replacement icon | Import path |
|---|---|---|
| "Control" | `VolumeOff` | `@mui/icons-material/VolumeOff` |
| "Save Job" | `Work` | `@mui/icons-material/Work` |
| "Saved Job" | `ViewList` | `@mui/icons-material/ViewList` |

### Icon sizing

Use `fontSize="small"` (18px) to match the existing `lucide-react` icon size used in `Header.tsx`.

## Risks / Trade-offs

- **Bundle size** → `@mui/icons-material` is large but Vite tree-shakes per named import. Each icon adds ~1-2 KB to the bundle. Mitigation: use direct path imports (`@mui/icons-material/VolumeOff`) rather than named barrel imports.
- **Visual regression** → Icons may render slightly different sizes than text labels; visual QA needed. Mitigation: use `fontSize="small"` and verify in Storybook.
- **Accessibility** → Removing text labels requires explicit `aria-label` attributes. Mitigation: add `aria-label` to each button matching its previous text label.
