## ADDED Requirements

### Requirement: Control tab uses VolumeOff icon
The Control tab button in `ControlPanel.tsx` SHALL render a `VolumeOffIcon` from `@mui/icons-material/VolumeOff` instead of the text label "Control". The button SHALL retain its existing `role="tab"`, `aria-selected`, and tab-switching behavior. The button SHALL have `aria-label="Control"`.

#### Scenario: Control tab renders VolumeOff icon
- **WHEN** the ControlPanel is rendered
- **THEN** the Control tab button displays a VolumeOff icon with no visible text label

#### Scenario: Control tab icon button is accessible
- **WHEN** a screen reader focuses the Control tab button
- **THEN** the button announces "Control" via its aria-label

#### Scenario: Control tab icon button switches active tab
- **WHEN** the user clicks the Control tab icon button
- **THEN** the active tab changes to "control" and the icon button reflects the active state

### Requirement: Save Job button uses Work icon
The Save Job button in `SaveJobButton.tsx` SHALL render a `WorkIcon` from `@mui/icons-material/Work` instead of the text "Save Job". The button SHALL retain all existing job-saving logic and SHALL have `aria-label="Save Job"`.

#### Scenario: Save Job button renders Work icon
- **WHEN** the SaveJobButton component is rendered
- **THEN** the button displays a Work icon with no visible text label

#### Scenario: Save Job icon button is accessible
- **WHEN** a screen reader focuses the Save Job button
- **THEN** the button announces "Save Job" via its aria-label

#### Scenario: Save Job icon button triggers job save
- **WHEN** the user clicks the Save Job icon button
- **THEN** the existing job-save logic executes (posts NNL_SAVED_JOB message) unchanged

### Requirement: Saved Job tab uses ViewList icon
The Saved Job tab button in `ControlPanel.tsx` SHALL render a `ViewListIcon` from `@mui/icons-material/ViewList` instead of the text label "Saved Job". The button SHALL retain its existing `role="tab"`, `aria-selected`, and tab-switching behavior. The button SHALL have `aria-label="Saved Job"`.

#### Scenario: Saved Job tab renders ViewList icon
- **WHEN** the ControlPanel is rendered
- **THEN** the Saved Job tab button displays a ViewList icon with no visible text label

#### Scenario: Saved Job tab icon button is accessible
- **WHEN** a screen reader focuses the Saved Job tab button
- **THEN** the button announces "Saved Job" via its aria-label

#### Scenario: Saved Job tab icon button switches active tab
- **WHEN** the user clicks the Saved Job tab icon button
- **THEN** the active tab changes to "saved" and the icon button reflects the active state

### Requirement: MUI icons-material dependency installed
The project SHALL have `@mui/icons-material` listed as a production dependency in `package.json`.

#### Scenario: Package available at build time
- **WHEN** the Firefox build (`npm run build:firefox`) is executed
- **THEN** the build completes with 0 errors and the icon imports resolve successfully
