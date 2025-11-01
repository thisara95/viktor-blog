import { BlogPost, Author, BlogPostCategory } from '@/types/blog';
import {
  BlogPostsArraySchema,
  CategoriesArraySchema,
  AuthorsArraySchema,
  CountSchema,
} from './schemas';
import { ZodError } from 'zod';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://cms.viktor.ai';

interface FetchBlogPostsParams {
  start?: number;
  limit?: number;
  search?: string;
  categoryId?: number;
  authorId?: number;
  sort?: string;
}

export async function fetchBlogPosts(params: FetchBlogPostsParams = {}): Promise<BlogPost[]> {
  try {
    const queryParams = new URLSearchParams();

    if (params.start !== undefined) queryParams.append('_start', params.start.toString());
    if (params.limit !== undefined) queryParams.append('_limit', params.limit.toString());
    if (params.search) queryParams.append('title_contains', params.search);
    if (params.categoryId) queryParams.append('blogpost_categories.id', params.categoryId.toString());
    if (params.authorId) queryParams.append('author.id', params.authorId.toString());
    if (params.sort) queryParams.append('_sort', params.sort);

    const url = `${API_BASE_URL}/blogposts${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

    const response = await fetch(url, { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`Failed to fetch blog posts: ${response.statusText}`);
    }

    const data = await response.json();

    // Validate response with Zod
    const validatedData = BlogPostsArraySchema.parse(data);

    return validatedData as BlogPost[];
  } catch (error) {
    if (error instanceof ZodError) {
      console.error('Blog posts validation error:', error.issues);
      throw new Error(`Invalid blog posts data received from API: ${error.issues[0]?.message || 'Unknown validation error'}`);
    }
    throw error;
  }
}

export async function fetchBlogPostsCount(params: Omit<FetchBlogPostsParams, 'start' | 'limit'> = {}): Promise<number> {
  try {
    const queryParams = new URLSearchParams();

    if (params.search) queryParams.append('title_contains', params.search);
    if (params.categoryId) queryParams.append('blogpost_categories.id', params.categoryId.toString());
    if (params.authorId) queryParams.append('author.id', params.authorId.toString());

    const url = `${API_BASE_URL}/blogposts/count${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

    const response = await fetch(url, { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`Failed to fetch blog posts count: ${response.statusText}`);
    }

    const data = await response.json();

    // Validate response with Zod
    const validatedData = CountSchema.parse(data);

    return validatedData;
  } catch (error) {
    if (error instanceof ZodError) {
      console.error('Count validation error:', error.issues);
      throw new Error(`Invalid count data received from API: ${error.issues[0]?.message || 'Unknown validation error'}`);
    }
    throw error;
  }
}

export async function fetchCategories(): Promise<BlogPostCategory[]> {
  try {
    const url = `${API_BASE_URL}/blogpost-categories`;

    const response = await fetch(url, { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }

    const data = await response.json();

    // Validate response with Zod
    const validatedData = CategoriesArraySchema.parse(data);

    return validatedData as BlogPostCategory[];
  } catch (error) {
    if (error instanceof ZodError) {
      console.error('Categories validation error:', error.issues);
      throw new Error(`Invalid categories data received from API: ${error.issues[0]?.message || 'Unknown validation error'}`);
    }
    throw error;
  }
}

export async function fetchAuthors(): Promise<Author[]> {
  try {
    const url = `${API_BASE_URL}/authors`;

    const response = await fetch(url, { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`Failed to fetch authors: ${response.statusText}`);
    }

    const data = await response.json();

    // Validate response with Zod
    const validatedData = AuthorsArraySchema.parse(data);

    return validatedData as Author[];
  } catch (error) {
    if (error instanceof ZodError) {
      console.error('Authors validation error:', error.issues);
      throw new Error(`Invalid authors data received from API: ${error.issues[0]?.message || 'Unknown validation error'}`);
    }
    throw error;
  }
}
