export interface Author {
  id: number;
  full_name: string;
  created_at: string;
  updated_at: string;
  avatar?: {
    id: number;
    name: string;
    alternativeText?: string;
    url: string;
    formats?: {
      thumbnail?: { url: string; name: string };
    };
  };
}

export interface BlogPostCategory {
  id: number;
  name: string;
  slug?: string;
  created_at?: string;
  updated_at?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  body?: string;
  intro?: string;
  publication_date: string;
  created_at: string;
  updated_at: string;
  published_at?: string;
  is_long_post?: boolean;
  meta_title?: string;
  meta_description?: string;
  cover?: {
    id: number;
    name: string;
    alternativeText?: string;
    url: string;
    width?: number;
    height?: number;
    formats?: {
      thumbnail?: { url: string; name: string; width: number; height: number };
      small?: { url: string; name: string; width: number; height: number };
      medium?: { url: string; name: string; width: number; height: number };
      large?: { url: string; name: string; width: number; height: number };
    };
  };
  author?: Author;
  blogpost_categories?: BlogPostCategory[];
}

export interface BlogFilters {
  search?: string;
  categoryId?: number;
  authorId?: number;
  sort?: 'publication_date:ASC' | 'publication_date:DESC' | 'title:ASC' | 'title:DESC';
  page?: number;
  limit?: number;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}
