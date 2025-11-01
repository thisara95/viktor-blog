import type { Meta, StoryObj } from '@storybook/react';
import SearchBar from './SearchBar';

const meta = {
  title: 'Components/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onSearch: (query: string) => console.log('Search query:', query),
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithInitialValue: Story = {
  args: {
    initialValue: 'Next.js tutorials',
  },
};

export const Empty: Story = {
  args: {
    initialValue: '',
  },
};
