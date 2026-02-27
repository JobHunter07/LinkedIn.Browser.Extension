import type { Meta, StoryObj } from '@storybook/react-vite';
import JobPreview from './JobPreview';

const meta: Meta<typeof JobPreview> = {
  title: 'Organisms/JobPreview',
  component: JobPreview,
  tags: ['autodocs'],
  args: {
    title: 'Senior Frontend Engineer',
    company: 'Acme Labs',
    url: 'https://www.linkedin.com/jobs/view/1234567890?trackingId=abc123',
    raw: JSON.stringify({ title: 'Senior Frontend Engineer', company: 'Acme Labs', url: 'https://www.linkedin.com/jobs/view/1234567890?trackingId=abc123' }),
    onClose: () => undefined,
    onCopy: () => undefined,
    embedded: false
  },
  parameters: {
    docs: {
      description: {
        component:
          'Specification\n- Atomic Level: Organism\n- Purpose: Saved-job data preview with canonical URL and JSON copy action.\n- Inputs: title, company, url, raw payload, copy/close callbacks, embedded mode.\n- Behavior: Normalizes LinkedIn URL, renders fields, and exposes copy + close actions.\n- Responsive: Readable stacked fields and actions in compact panel containers.'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Dialog: Story = {};

export const Embedded: Story = {
  args: {
    embedded: true
  }
};
