import type { Meta, StoryObj } from '@storybook/react-vite';
import App from './App';

const meta: Meta<typeof App> = {
  title: 'Pages/App',
  component: App,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Specification\n- Atomic Level: Page\n- Purpose: Entry screen that composes panel trigger and control panel flow.\n- Inputs: Internal settings/storage and browser message events.\n- Behavior: Opens/closes panel, syncs settings, and reacts to saved-job events.\n- Responsive: Root container scales to available viewport width by default.'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
