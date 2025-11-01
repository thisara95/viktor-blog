import { z } from 'zod';

// Image format schema
const ImageFormatSchema = z.object({
  url: z.string(),
  name: z.string(),
  width: z.number(),
  height: z.number(),
});

// Avatar schema for Author
const AvatarSchema = z.object({
  id: z.number(),
  name: z.string(),
  alternativeText: z.string().optional(),
  url: z.string(),
  formats: z.object({
    thumbnail: ImageFormatSchema.optional(),
  }).optional(),
});

// Author schema
export const AuthorSchema = z.object({
  id: z.number(),
  full_name: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  avatar: AvatarSchema.optional(),
});

// Blog post category schema
export const BlogPostCategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

// Cover image schema
const CoverImageSchema = z.object({
  id: z.number(),
  name: z.string(),
  alternativeText: z.string().optional(),
  url: z.string(),
  width: z.number().optional(),
  height: z.number().optional(),
  formats: z.object({
    thumbnail: ImageFormatSchema.optional(),
    small: ImageFormatSchema.optional(),
    medium: ImageFormatSchema.optional(),
    large: ImageFormatSchema.optional(),
  }).optional(),
});

// Blog post schema
export const BlogPostSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string().optional(),
  body: z.string().optional(),
  intro: z.string().optional(),
  publication_date: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  published_at: z.string().optional(),
  is_long_post: z.boolean().optional(),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  cover: CoverImageSchema.optional(),
  author: AuthorSchema.optional(),
  blogpost_categories: z.array(BlogPostCategorySchema).optional(),
});

// Array schemas for API responses
export const BlogPostsArraySchema = z.array(BlogPostSchema);
export const CategoriesArraySchema = z.array(BlogPostCategorySchema);
export const AuthorsArraySchema = z.array(AuthorSchema);

// Count schema for count endpoints
export const CountSchema = z.number();

// Export types inferred from schemas
export type BlogPostSchemaType = z.infer<typeof BlogPostSchema>;
export type AuthorSchemaType = z.infer<typeof AuthorSchema>;
export type BlogPostCategorySchemaType = z.infer<typeof BlogPostCategorySchema>;
