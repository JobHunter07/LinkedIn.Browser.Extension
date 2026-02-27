import type { Meta, StoryObj } from '@storybook/react-vite';
import NNLButton from './NNLButton';

const meta: Meta<typeof NNLButton> = {
  title: 'Atoms/NNLButton',
  component: NNLButton,
  tags: ['autodocs'],
  args: {
    showPanel: false,
    onToggle: () => undefined,
    theme: 'DARK'
  },
  argTypes: {
    showPanel: {
      control: 'boolean',
      description: 'When true the extension panel is open — applies the active visual state to the icon.'
    },
    onToggle: {
      action: 'onToggle',
      description: 'Called when the user clicks the button to open or close the panel.'
    },
    theme: {
      control: 'radio',
      options: ['DARK', 'LIGHT'],
      description: 'Controls which logo variant (dark / light) is rendered.'
    }
  },
  parameters: {
    docs: {
      description: {
        component:
          'Specification\n- Atomic Level: Atom\n- Purpose: Extension launcher button that toggles panel visibility state.\n- Inputs: showPanel, onToggle callback, theme.\n- Behavior: Displays theme-specific icon and active visual state when panel is open.\n- Responsive: Fixed icon target with stable hit area across viewport sizes.'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Active: Story = {
  args: {
    showPanel: true
  }
};
