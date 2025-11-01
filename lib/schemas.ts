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
  alternativeText: z.string().nullable().optional(),
  url: z.string(),
  formats: z.object({
    thumbnail: ImageFormatSchema.optional(),
  }).nullable().optional(),
});

// Author schema
export const AuthorSchema = z.object({
  id: z.number(),
  full_name: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  avatar: AvatarSchema.nullable().optional(),
});

// Blog post category schema
export const BlogPostCategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

// Cover image schema
const CoverImageSchema = z.object({
  id: z.number(),
  name: z.string(),
  alternativeText: z.string().nullable().optional(),
  url: z.string(),
  width: z.number().nullable().optional(),
  height: z.number().nullable().optional(),
  formats: z.object({
    thumbnail: ImageFormatSchema.optional(),
    small: ImageFormatSchema.optional(),
    medium: ImageFormatSchema.optional(),
    large: ImageFormatSchema.optional(),
  }).nullable().optional(),
});

// Blog post schema
export const BlogPostSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string().nullable().optional(),
  body: z.string().nullable().optional(),
  intro: z.string().nullable().optional(),
  publication_date: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  published_at: z.string().nullable().optional(),
  is_long_post: z.boolean().nullable().optional(),
  meta_title: z.string().nullable().optional(),
  meta_description: z.string().nullable().optional(),
  cover: CoverImageSchema.nullable().optional(),
  author: AuthorSchema.nullable().optional(),
  blogpost_categories: z.array(BlogPostCategorySchema).nullable().optional(),
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
