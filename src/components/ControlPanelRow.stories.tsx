import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import ControlPanelRow from './ControlPanelRow';
import Switch from './Switch';

const meta: Meta<typeof ControlPanelRow> = {
  title: 'Atoms/ControlPanelRow',
  component: ControlPanelRow,
  tags: ['autodocs'],
  args: {
    primaryText: 'News & Ad Sections',
    secondaryText: 'Remove LinkedIn News & Ad sidebars.'
  },
  argTypes: {
    primaryText: {
      control: 'text',
      description: 'Primary label for the row. Accepts plain text or a React node.'
    },
    secondaryText: {
      control: 'text',
      description: 'Helper description shown below the primary label.'
    },
    children: {
      control: false,
      description: 'The interactive control (e.g. Switch) rendered on the trailing edge of the row.'
    }
  },
  render: (args) => {
    const [checked, setChecked] = useState(true);
    return (
      <ControlPanelRow {...args}>
        <Switch id="row-switch" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
      </ControlPanelRow>
    );
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
