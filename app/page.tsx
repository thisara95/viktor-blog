'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { BlogPost, Author, BlogPostCategory } from '@/types/blog';
import { fetchBlogPosts, fetchBlogPostsCount, fetchCategories, fetchAuthors } from '@/lib/api';
import { BlogCard, Pagination, SearchBar, FilterBar, ErrorTrigger } from '@/components';

const POSTS_PER_PAGE = 9;

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogPostCategory[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get filters from URL
  const currentPage = Number(searchParams.get('page')) || 1;
  const searchQuery = searchParams.get('search') || '';
  const categoryId = searchParams.get('category') ? Number(searchParams.get('category')) : undefined;
  const authorId = searchParams.get('author') ? Number(searchParams.get('author')) : undefined;
  const sort = searchParams.get('sort') || undefined;

  // Update URL with new params
  const updateURL = (params: Record<string, string | number | undefined>) => {
    const newParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        newParams.set(key, String(value));
      } else {
        newParams.delete(key);
      }
    });

    router.push(`?${newParams.toString()}`, { scroll: false });
  };

  // Fetch data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [postsData, count, categoriesData, authorsData] = await Promise.all([
          fetchBlogPosts({
            start: (currentPage - 1) * POSTS_PER_PAGE,
            limit: POSTS_PER_PAGE,
            search: searchQuery || undefined,
            categoryId,
            authorId,
            sort,
          }),
          fetchBlogPostsCount({
            search: searchQuery || undefined,
            categoryId,
            authorId,
          }),
          fetchCategories(),
          fetchAuthors(),
        ]);

        setPosts(postsData);
        setTotalPosts(count);
        setCategories(categoriesData);
        setAuthors(authorsData);
      } catch (err) {
        setError('Failed to load blog posts. Please try again later.');
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [currentPage, searchQuery, categoryId, authorId, sort]);

  const handleSearch = (query: string) => {
    updateURL({ search: query, page: 1 });
  };

  const handleCategoryChange = (category: number | undefined) => {
    updateURL({ category, page: 1 });
  };

  const handleAuthorChange = (author: number | undefined) => {
    updateURL({ author, page: 1 });
  };

  const handleSortChange = (sortValue: string | undefined) => {
    updateURL({ sort: sortValue, page: 1 });
  };

  const handlePageChange = (page: number) => {
    updateURL({ page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Viktor Blog</h1>
          <p className="mt-2 text-gray-600">Explore our latest articles and insights</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar initialValue={searchQuery} onSearch={handleSearch} />
        </div>

        {/* Filters */}
        <div className="mb-8">
          <FilterBar
            categories={categories}
            authors={authors}
            selectedCategory={categoryId}
            selectedAuthor={authorId}
            selectedSort={sort}
            onCategoryChange={handleCategoryChange}
            onAuthorChange={handleAuthorChange}
            onSortChange={handleSortChange}
          />
        </div>

        {/* Results Info */}
        <div className="mb-4 text-sm text-gray-600">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <p>
              Showing {posts.length > 0 ? (currentPage - 1) * POSTS_PER_PAGE + 1 : 0} -{' '}
              {Math.min(currentPage * POSTS_PER_PAGE, totalPosts)} of {totalPosts} posts
            </p>
          )}
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(POSTS_PER_PAGE)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md h-96 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Blog Posts Grid */}
        {!loading && posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No blog posts found.</p>
            <p className="text-gray-400 mt-2">Try adjusting your search or filters.</p>
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm">
            Sample Viktor Blog - Built by Thisara Gunarathna
          </p>
        </div>
      </footer>

      {/* Error Trigger - For testing ErrorBoundary */}
      {process.env.NODE_ENV === 'development' && <ErrorTrigger />}
    </div>
  );
}
