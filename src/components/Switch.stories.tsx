import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import Switch from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Atoms/Switch',
  component: Switch,
  tags: ['autodocs'],
  args: {
    id: 'storybook-switch',
    name: 'storybook-switch',
    checked: true,
    onChange: () => undefined
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Current on/off state of the toggle.'
    },
    id: {
      control: 'text',
      description: 'HTML id attribute — must be unique per page and links the label to the input.'
    },
    name: {
      control: 'text',
      description: 'HTML name attribute for the underlying checkbox input.'
    },
    onChange: {
      action: 'onChange',
      description: 'Fired when the user toggles the switch.'
    }
  },
  render: (args) => {
    const [checked, setChecked] = useState(args.checked);
    return <Switch {...args} checked={checked} onChange={(event) => setChecked(event.target.checked)} />;
  },
  parameters: {
    docs: {
      description: {
        component:
          'Specification\n- Atomic Level: Atom\n- Purpose: Controlled toggle for boolean settings.\n- Inputs: id/name, checked, onChange.\n- Behavior: Reflects controlled state and emits input change events.\n- Responsive: Inline control scales with parent row layout.'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {};
