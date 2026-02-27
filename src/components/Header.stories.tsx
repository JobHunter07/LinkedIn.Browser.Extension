import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
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
  argTypes: {
    theme: {
      control: 'radio',
      options: ['DARK', 'LIGHT'],
      description: 'Active theme value — controls which icon and aria-label the toggle button renders.'
    },
    toggleTheme: {
      action: 'toggleTheme',
      description: 'Called when the user clicks the sun/moon theme-toggle button.'
    },
    closePanel: {
      action: 'closePanel',
      description: 'Called when the user clicks the close (X) button.'
    }
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

export const Dark: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const themeToggle = canvas.getByRole('button', { name: 'Switch to light theme' });

    await expect(themeToggle.getAttribute('title')).toBe('Light mode');
  }
};

export const Light: Story = {
  args: {
    theme: 'LIGHT'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const themeToggle = canvas.getByRole('button', { name: 'Switch to dark theme' });

    await expect(themeToggle.getAttribute('title')).toBe('Dark mode');
  }
};
