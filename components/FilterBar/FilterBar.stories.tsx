import type { Meta, StoryObj } from '@storybook/react';
import FilterBar from './FilterBar';
import { Author, BlogPostCategory } from '@/types/blog';

const meta = {
  title: 'Components/FilterBar',
  component: FilterBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onCategoryChange: (categoryId) => console.log('Category changed:', categoryId),
    onAuthorChange: (authorId) => console.log('Author changed:', authorId),
    onSortChange: (sort) => console.log('Sort changed:', sort),
  },
  decorators: [
    (Story) => (
      <div style={{ width: '800px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FilterBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockCategories: BlogPostCategory[] = [
  { id: 1, name: 'Technology' },
  { id: 2, name: 'Web Development' },
  { id: 3, name: 'Design' },
  { id: 4, name: 'Business' },
];

const mockAuthors: Author[] = [
  { id: 1, full_name: 'John Doe', created_at: '2024-01-01', updated_at: '2024-01-01' },
  { id: 2, full_name: 'Jane Smith', created_at: '2024-01-01', updated_at: '2024-01-01' },
  { id: 3, full_name: 'Bob Johnson', created_at: '2024-01-01', updated_at: '2024-01-01' },
];

export const Default: Story = {
  args: {
    categories: mockCategories,
    authors: mockAuthors,
  },
};

export const WithSelectedCategory: Story = {
  args: {
    categories: mockCategories,
    authors: mockAuthors,
    selectedCategory: 2,
  },
};

export const WithSelectedAuthor: Story = {
  args: {
    categories: mockCategories,
    authors: mockAuthors,
    selectedAuthor: 1,
  },
};

export const WithSelectedSort: Story = {
  args: {
    categories: mockCategories,
    authors: mockAuthors,
    selectedSort: 'publication_date:DESC',
  },
};

export const AllFiltersSelected: Story = {
  args: {
    categories: mockCategories,
    authors: mockAuthors,
    selectedCategory: 1,
    selectedAuthor: 2,
    selectedSort: 'title:ASC',
  },
};

export const EmptyCategories: Story = {
  args: {
    categories: [],
    authors: mockAuthors,
  },
};

export const EmptyAuthors: Story = {
  args: {
    categories: mockCategories,
    authors: [],
  },
};
