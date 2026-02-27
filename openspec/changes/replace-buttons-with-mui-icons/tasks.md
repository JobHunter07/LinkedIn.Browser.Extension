## 1. Dependencies

- [x] 1.1 Install `@mui/icons-material` as a production dependency (`npm install @mui/icons-material`)
- [x] 1.2 Verify `package.json` lists `@mui/icons-material` under `dependencies`

## 2. SaveJobButton – Work Icon

- [x] 2.1 Open `src/components/SaveJobButton.tsx`
- [x] 2.2 Add import: `import WorkIcon from '@mui/icons-material/Work'`
- [x] 2.3 Replace the text "Save Job" inside the `<button>` with `<WorkIcon fontSize="small" />`
- [x] 2.4 Add `aria-label="Save Job"` to the `<button>` element
- [x] 2.5 Verify the button still calls `handleSaveJob` on click

## 3. ControlPanel – VolumeOff and ViewList Icons

- [x] 3.1 Open `src/components/ControlPanel.tsx`
- [x] 3.2 Add imports: `import VolumeOffIcon from '@mui/icons-material/VolumeOff'` and `import ViewListIcon from '@mui/icons-material/ViewList'`
- [x] 3.3 Replace the text "Control" inside the Control tab `<button>` with `<VolumeOffIcon fontSize="small" />`
- [x] 3.4 Add `aria-label="Control"` to the Control tab `<button>`
- [x] 3.5 Replace the text "Saved Job" inside the Saved Job tab `<button>` with `<ViewListIcon fontSize="small" />`
- [x] 3.6 Add `aria-label="Saved Job"` to the Saved Job tab `<button>`

## 4. Build Verification

- [x] 4.1 Run `npm run build:firefox` and confirm 0 errors
- [x] 4.2 Visually verify popup shows three icons (VolumeOff, Work, ViewList) with no text labels
- [x] 4.3 Verify tab switching still works correctly with icon buttons
- [x] 4.4 Verify Save Job icon button still saves the job correctly
