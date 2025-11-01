import type { Meta, StoryObj } from '@storybook/react';
import Maintenance from './Maintenance';

const meta = {
  title: 'Components/Maintenance',
  component: Maintenance,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Maintenance>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithEstimatedTime: Story = {
  args: {
    estimatedTime: '2 hours',
  },
};

export const WithCustomMessage: Story = {
  args: {
    message: 'We are currently upgrading our systems to serve you better. Thank you for your patience!',
    estimatedTime: '30 minutes',
  },
};

export const QuickMaintenance: Story = {
  args: {
    message: 'Quick system update in progress.',
    estimatedTime: '5 minutes',
  },
};

export const LongMaintenance: Story = {
  args: {
    message: 'We are performing major infrastructure upgrades. This may take a while.',
    estimatedTime: '4-6 hours',
  },
};

export const NoEstimatedTime: Story = {
  args: {
    message: 'Scheduled maintenance in progress. We will be back shortly.',
  },
};
