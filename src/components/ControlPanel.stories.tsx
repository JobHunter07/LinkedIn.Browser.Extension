import type { Meta, StoryObj } from '@storybook/react-vite';
import ControlPanel from './ControlPanel';
import { DEFAULTS } from './constants';

const meta: Meta<typeof ControlPanel> = {
  title: 'Organisms/ControlPanel',
  component: ControlPanel,
  tags: ['autodocs'],
  args: {
    closePanel: () => undefined,
    hardRefresh: () => undefined,
    userSettings: DEFAULTS,
    savedJob: null,
    clearSavedJob: () => undefined
  },
  parameters: {
    docs: {
      description: {
        component:
          'Specification\n- Atomic Level: Organism\n- Purpose: Main settings and saved-job workflow container.\n- Inputs: callback handlers, userSettings, optional savedJob payload.\n- Behavior: Tab navigation, setting toggles, save/reload actions, preview rendering.\n- Responsive: Vertical panel layout with sections and actions that wrap naturally.'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ControlsTab: Story = {};

export const SavedJobTab: Story = {
  args: {
    savedJob: {
      title: 'Senior Frontend Engineer',
      company: 'Acme Labs',
      url: 'https://www.linkedin.com/jobs/view/1234567890/',
      raw: JSON.stringify({ title: 'Senior Frontend Engineer', company: 'Acme Labs', url: 'https://www.linkedin.com/jobs/view/1234567890/' })
    }
  }
};
