import type { Meta, StoryObj } from '@storybook/react';
import BlogCard from './BlogCard';
import { BlogPost } from '@/types/blog';

const meta = {
  title: 'Components/BlogCard',
  component: BlogCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '400px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BlogCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockPost: BlogPost = {
  id: 1,
  title: 'Getting Started with Next.js 14',
  slug: 'getting-started-nextjs-14',
  excerpt: 'Learn how to build modern web applications with Next.js 14 and its powerful features.',
  body: 'Full article content here...',
  publication_date: '2024-01-15',
  created_at: '2024-01-15',
  updated_at: '2024-01-15',
  cover: {
    id: 1,
    name: 'nextjs-cover.jpg',
    url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    alternativeText: 'Next.js logo',
    formats: {
      medium: {
        url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
        name: 'nextjs-cover-medium.jpg',
        width: 750,
        height: 500,
      },
    },
  },
  author: {
    id: 1,
    full_name: 'John Doe',
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  },
  blogpost_categories: [
    { id: 1, name: 'Technology' },
    { id: 2, name: 'Web Development' },
  ],
};

export const Default: Story = {
  args: {
    post: mockPost,
  },
};

export const WithoutCategories: Story = {
  args: {
    post: {
      ...mockPost,
      blogpost_categories: [],
    },
  },
};

export const WithoutExcerpt: Story = {
  args: {
    post: {
      ...mockPost,
      excerpt: undefined,
    },
  },
};

export const WithoutAuthor: Story = {
  args: {
    post: {
      ...mockPost,
      author: undefined,
    },
  },
};

export const WithoutCover: Story = {
  args: {
    post: {
      ...mockPost,
      cover: undefined,
    },
  },
};

export const LongTitle: Story = {
  args: {
    post: {
      ...mockPost,
      title: 'This is a very long blog post title that should demonstrate how the component handles text overflow and line clamping functionality',
    },
  },
};

export const MultipleCategories: Story = {
  args: {
    post: {
      ...mockPost,
      blogpost_categories: [
        { id: 1, name: 'Technology' },
        { id: 2, name: 'Web Development' },
        { id: 3, name: 'JavaScript' },
        { id: 4, name: 'React' },
        { id: 5, name: 'Next.js' },
      ],
    },
  },
};
