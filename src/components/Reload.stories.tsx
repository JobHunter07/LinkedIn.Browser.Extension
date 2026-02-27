import type { Meta, StoryObj } from '@storybook/react-vite';
import Reload from './Reload';

const meta: Meta<typeof Reload> = {
  title: 'Atoms/Reload',
  component: Reload,
  tags: ['autodocs'],
  args: {
    closePanel: () => undefined,
    hardRefresh: () => undefined
  },
  parameters: {
    docs: {
      description: {
        component:
          'Specification\n- Atomic Level: Atom\n- Purpose: Single troubleshooting action that refreshes extension state.\n- Inputs: closePanel and hardRefresh callbacks.\n- Behavior: Invokes refresh then closes the panel on one button press.\n- Responsive: Button container keeps action legible in small panel widths.'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
