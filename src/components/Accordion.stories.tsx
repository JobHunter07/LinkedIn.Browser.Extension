import type { Meta, StoryObj } from '@storybook/react-vite';
import Accordion from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Atoms/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  args: {
    title: 'Raw JSON',
    children: 'Expandable content section'
  },
  parameters: {
    docs: {
      description: {
        component:
          'Specification\n- Atomic Level: Atom\n- Purpose: Single disclosure primitive for compact expandable content.\n- Inputs: title, children, defaultOpen.\n- Behavior: Native details/summary toggle with icon affordance.\n- Responsive: Uses intrinsic flow layout and adapts to parent width.'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {};

export const Open: Story = {
  args: {
    defaultOpen: true
  }
};
