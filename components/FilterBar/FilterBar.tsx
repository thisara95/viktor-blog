'use client';

import { Author, BlogPostCategory } from '@/types/blog';

interface FilterBarProps {
  categories: BlogPostCategory[];
  authors: Author[];
  selectedCategory?: number;
  selectedAuthor?: number;
  selectedSort?: string;
  onCategoryChange: (categoryId: number | undefined) => void;
  onAuthorChange: (authorId: number | undefined) => void;
  onSortChange: (sort: string | undefined) => void;
}

export default function FilterBar({
  categories,
  authors,
  selectedCategory,
  selectedAuthor,
  selectedSort,
  onCategoryChange,
  onAuthorChange,
  onSortChange,
}: FilterBarProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Category Filter */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            value={selectedCategory || ''}
            onChange={(e) => onCategoryChange(e.target.value ? Number(e.target.value) : undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Author Filter */}
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
            Author
          </label>
          <select
            id="author"
            value={selectedAuthor || ''}
            onChange={(e) => onAuthorChange(e.target.value ? Number(e.target.value) : undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Authors</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.full_name}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div>
          <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
            Sort By
          </label>
          <select
            id="sort"
            value={selectedSort || ''}
            onChange={(e) => onSortChange(e.target.value || undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Default</option>
            <option value="publication_date:DESC">Newest First</option>
            <option value="publication_date:ASC">Oldest First</option>
            <option value="title:ASC">Title A-Z</option>
            <option value="title:DESC">Title Z-A</option>
          </select>
        </div>
      </div>
    </div>
  );
}
