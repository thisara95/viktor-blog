import type { Meta, StoryObj } from '@storybook/react';
import Pagination from './Pagination';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onPageChange: (page: number) => console.log('Page changed to:', page),
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstPage: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
  },
};

export const FewPages: Story = {
  args: {
    currentPage: 2,
    totalPages: 3,
  },
};

export const ManyPages: Story = {
  args: {
    currentPage: 15,
    totalPages: 50,
  },
};

export const SinglePage: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
  },
};

export const TwoPages: Story = {
  args: {
    currentPage: 1,
    totalPages: 2,
  },
};
