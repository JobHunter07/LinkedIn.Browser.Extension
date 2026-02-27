import type { Meta, StoryObj } from '@storybook/react-vite';
import Footer from './Footer';

const meta: Meta<typeof Footer> = {
  title: 'Organisms/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Specification\n- Atomic Level: Organism\n- Purpose: Composite footer with project actions and social links.\n- Inputs: none (derives environment to show browser icon).\n- Behavior: Renders action pills, divider, and link icon list.\n- Responsive: Wrap-safe footer groups for compact panel widths.'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
