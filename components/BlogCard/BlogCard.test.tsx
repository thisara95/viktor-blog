import { render, screen } from '@testing-library/react';
import BlogCard from './BlogCard';
import { BlogPost } from '@/types/blog';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe('BlogCard', () => {
  const mockPost: BlogPost = {
    id: 1,
    title: 'Test Blog Post',
    slug: 'test-blog-post',
    excerpt: 'This is a test excerpt',
    body: 'Test content',
    publication_date: '2024-01-15',
    created_at: '2024-01-15',
    updated_at: '2024-01-15',
    cover: {
      id: 1,
      name: 'test-image.jpg',
      url: '/test-image.jpg',
      alternativeText: 'Test image',
      formats: {
        medium: {
          url: '/test-image-medium.jpg',
          name: 'test-image-medium.jpg',
          width: 500,
          height: 300,
        },
      },
    },
    author: {
      id: 1,
      full_name: 'John Doe',
      created_at: '2024-01-15',
      updated_at: '2024-01-15',
    },
    blogpost_categories: [
      {
        id: 1,
        name: 'Technology',
      },
      {
        id: 2,
        name: 'Programming',
      },
    ],
  };

  it('renders blog post title', () => {
    render(<BlogCard post={mockPost} />);
    expect(screen.getByText('Test Blog Post')).toBeInTheDocument();
  });

  it('renders blog post excerpt', () => {
    render(<BlogCard post={mockPost} />);
    expect(screen.getByText('This is a test excerpt')).toBeInTheDocument();
  });

  it('renders author name', () => {
    render(<BlogCard post={mockPost} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('renders formatted publication date', () => {
    render(<BlogCard post={mockPost} />);
    expect(screen.getByText('January 15, 2024')).toBeInTheDocument();
  });

  it('renders categories', () => {
    render(<BlogCard post={mockPost} />);
    expect(screen.getByText('Technology')).toBeInTheDocument();
    expect(screen.getByText('Programming')).toBeInTheDocument();
  });

  it('renders image with correct attributes', () => {
    render(<BlogCard post={mockPost} />);
    const image = screen.getByAltText('Test image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://cms.viktor.ai/test-image-medium.jpg');
  });

  it('renders without categories when none provided', () => {
    const postWithoutCategories = { ...mockPost, blogpost_categories: [] };
    render(<BlogCard post={postWithoutCategories} />);
    expect(screen.queryByText('Technology')).not.toBeInTheDocument();
  });

  it('renders without excerpt when not provided', () => {
    const postWithoutExcerpt = { ...mockPost, excerpt: undefined };
    render(<BlogCard post={postWithoutExcerpt} />);
    expect(screen.queryByText('This is a test excerpt')).not.toBeInTheDocument();
  });

  it('renders without author when not provided', () => {
    const postWithoutAuthor = { ...mockPost, author: undefined };
    render(<BlogCard post={postWithoutAuthor} />);
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });

  it('handles image URL that starts with http', () => {
    const postWithHttpImage = {
      ...mockPost,
      cover: {
        ...mockPost.cover!,
        formats: {
          medium: {
            url: 'http://example.com/image.jpg',
            name: 'image.jpg',
            width: 500,
            height: 300,
          },
        },
      },
    };
    render(<BlogCard post={postWithHttpImage} />);
    const image = screen.getByAltText('Test image');
    expect(image).toHaveAttribute('src', 'http://example.com/image.jpg');
  });

  it('uses placeholder when no cover image provided', () => {
    const postWithoutCover = { ...mockPost, cover: undefined };
    render(<BlogCard post={postWithoutCover} />);
    // When there's no cover, the image should not be rendered
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
