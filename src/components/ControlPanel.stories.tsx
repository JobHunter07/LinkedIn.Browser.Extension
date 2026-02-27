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
  argTypes: {
    closePanel: {
      action: 'closePanel',
      description: 'Called when the user closes the panel.'
    },
    hardRefresh: {
      action: 'hardRefresh',
      description: 'Called when the Reload button triggers a hard extension refresh.'
    },
    userSettings: {
      control: 'object',
      description: 'Full settings object read from chrome.storage (disablePromoted, disableSuggested, disableNews, disableFeed, theme).'
    },
    savedJob: {
      control: 'object',
      description: 'Optional saved-job payload {title, company, url, raw}. When present the Saved Job tab activates automatically.'
    },
    clearSavedJob: {
      action: 'clearSavedJob',
      description: 'Called when the user dismisses the saved-job preview.'
    }
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
