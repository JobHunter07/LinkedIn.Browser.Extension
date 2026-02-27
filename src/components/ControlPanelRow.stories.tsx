import type { Meta, StoryObj } from '@storybook/react-vite';
import ControlPanelRow from './ControlPanelRow';
import Switch from './Switch';

const meta: Meta<typeof ControlPanelRow> = {
  title: 'Atoms/ControlPanelRow',
  component: ControlPanelRow,
  tags: ['autodocs'],
  args: {
    primaryText: 'News & Ad Sections',
    secondaryText: 'Remove LinkedIn News & Ad sidebars.',
    children: <Switch id="row-switch" checked={true} onChange={() => undefined} />
  },
  parameters: {
    docs: {
      description: {
        component:
          'Specification\n- Atomic Level: Atom\n- Purpose: Reusable labeled row scaffold for a control and descriptive text.\n- Inputs: primaryText, secondaryText, and child control node.\n- Behavior: Aligns content and target control in a single accessible row.\n- Responsive: Text and control adapt to constrained width without overflow.'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
