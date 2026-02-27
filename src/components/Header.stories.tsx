import type { Meta, StoryObj } from '@storybook/react-vite';
import Header from './Header';

const meta: Meta<typeof Header> = {
  title: 'Organisms/Header',
  component: Header,
  tags: ['autodocs'],
  args: {
    closePanel: () => undefined,
    toggleTheme: () => undefined,
    theme: 'DARK'
  },
  parameters: {
    docs: {
      description: {
        component:
          'Specification\n- Atomic Level: Organism\n- Purpose: Control panel header with title, theme toggle, and close action.\n- Inputs: closePanel callback, toggleTheme callback, theme value.\n- Behavior: Exposes primary panel controls with icon-based affordances.\n- Responsive: Maintains aligned controls and title in narrow widths.'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Dark: Story = {};

export const Light: Story = {
  args: {
    theme: 'LIGHT'
  }
};
