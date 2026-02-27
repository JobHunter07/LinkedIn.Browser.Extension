import type { Meta, StoryObj } from '@storybook/react-vite';
import SaveJobButton from './SaveJobButton';

const meta: Meta<typeof SaveJobButton> = {
  title: 'Atoms/SaveJobButton',
  component: SaveJobButton,
  tags: ['autodocs'],
  argTypes: {
    // SaveJobButton accepts no props — it reads the page DOM on click and posts
    // an NNL_SAVED_JOB message to window.  Use ControlPanel stories to test the
    // full save + preview flow end-to-end.
  },
  parameters: {
    docs: {
      description: {
        component:
          'Specification\n- Atomic Level: Atom\n- Purpose: Captures current job metadata from page DOM and emits save event.\n- Inputs: none (reads page title/company/location URL).\n- Behavior: Normalizes URL and posts NNL_SAVED_JOB payload to window.\n- Responsive: Standalone button component with stable dimensions.'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
