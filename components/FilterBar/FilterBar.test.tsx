import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterBar from './FilterBar';
import { Author, BlogPostCategory } from '@/types/blog';

describe('FilterBar', () => {
  const mockCategories: BlogPostCategory[] = [
    { id: 1, name: 'Technology' },
    { id: 2, name: 'Programming' },
    { id: 3, name: 'Design' },
  ];

  const mockAuthors: Author[] = [
    { id: 1, full_name: 'John Doe', created_at: '2024-01-15', updated_at: '2024-01-15' },
    { id: 2, full_name: 'Jane Smith', created_at: '2024-01-15', updated_at: '2024-01-15' },
    { id: 3, full_name: 'Bob Johnson', created_at: '2024-01-15', updated_at: '2024-01-15' },
  ];

  const mockOnCategoryChange = jest.fn();
  const mockOnAuthorChange = jest.fn();
  const mockOnSortChange = jest.fn();

  beforeEach(() => {
    mockOnCategoryChange.mockClear();
    mockOnAuthorChange.mockClear();
    mockOnSortChange.mockClear();
  });

  it('renders all filter sections', () => {
    render(
      <FilterBar
        categories={mockCategories}
        authors={mockAuthors}
        onCategoryChange={mockOnCategoryChange}
        onAuthorChange={mockOnAuthorChange}
        onSortChange={mockOnSortChange}
      />
    );

    expect(screen.getByLabelText('Category')).toBeInTheDocument();
    expect(screen.getByLabelText('Author')).toBeInTheDocument();
    expect(screen.getByLabelText('Sort By')).toBeInTheDocument();
  });

  it('renders all category options', () => {
    render(
      <FilterBar
        categories={mockCategories}
        authors={mockAuthors}
        onCategoryChange={mockOnCategoryChange}
        onAuthorChange={mockOnAuthorChange}
        onSortChange={mockOnSortChange}
      />
    );

    expect(screen.getByRole('option', { name: 'All Categories' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Technology' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Programming' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Design' })).toBeInTheDocument();
  });

  it('renders all author options', () => {
    render(
      <FilterBar
        categories={mockCategories}
        authors={mockAuthors}
        onCategoryChange={mockOnCategoryChange}
        onAuthorChange={mockOnAuthorChange}
        onSortChange={mockOnSortChange}
      />
    );

    expect(screen.getByRole('option', { name: 'All Authors' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'John Doe' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Jane Smith' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Bob Johnson' })).toBeInTheDocument();
  });

  it('renders all sort options', () => {
    render(
      <FilterBar
        categories={mockCategories}
        authors={mockAuthors}
        onCategoryChange={mockOnCategoryChange}
        onAuthorChange={mockOnAuthorChange}
        onSortChange={mockOnSortChange}
      />
    );

    expect(screen.getByRole('option', { name: 'Default' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Newest First' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Oldest First' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Title A-Z' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Title Z-A' })).toBeInTheDocument();
  });

  it('displays selected category', () => {
    render(
      <FilterBar
        categories={mockCategories}
        authors={mockAuthors}
        selectedCategory={2}
        onCategoryChange={mockOnCategoryChange}
        onAuthorChange={mockOnAuthorChange}
        onSortChange={mockOnSortChange}
      />
    );

    const categorySelect = screen.getByLabelText('Category') as HTMLSelectElement;
    expect(categorySelect.value).toBe('2');
  });

  it('displays selected author', () => {
    render(
      <FilterBar
        categories={mockCategories}
        authors={mockAuthors}
        selectedAuthor={3}
        onCategoryChange={mockOnCategoryChange}
        onAuthorChange={mockOnAuthorChange}
        onSortChange={mockOnSortChange}
      />
    );

    const authorSelect = screen.getByLabelText('Author') as HTMLSelectElement;
    expect(authorSelect.value).toBe('3');
  });

  it('displays selected sort option', () => {
    render(
      <FilterBar
        categories={mockCategories}
        authors={mockAuthors}
        selectedSort="publication_date:DESC"
        onCategoryChange={mockOnCategoryChange}
        onAuthorChange={mockOnAuthorChange}
        onSortChange={mockOnSortChange}
      />
    );

    const sortSelect = screen.getByLabelText('Sort By') as HTMLSelectElement;
    expect(sortSelect.value).toBe('publication_date:DESC');
  });

  it('calls onCategoryChange when category is selected', async () => {
    const user = userEvent.setup();
    render(
      <FilterBar
        categories={mockCategories}
        authors={mockAuthors}
        onCategoryChange={mockOnCategoryChange}
        onAuthorChange={mockOnAuthorChange}
        onSortChange={mockOnSortChange}
      />
    );

    const categorySelect = screen.getByLabelText('Category');
    await user.selectOptions(categorySelect, '2');

    expect(mockOnCategoryChange).toHaveBeenCalledWith(2);
  });

  it('calls onCategoryChange with undefined when "All Categories" is selected', async () => {
    const user = userEvent.setup();
    render(
      <FilterBar
        categories={mockCategories}
        authors={mockAuthors}
        selectedCategory={2}
        onCategoryChange={mockOnCategoryChange}
        onAuthorChange={mockOnAuthorChange}
        onSortChange={mockOnSortChange}
      />
    );

    const categorySelect = screen.getByLabelText('Category');
    await user.selectOptions(categorySelect, '');

    expect(mockOnCategoryChange).toHaveBeenCalledWith(undefined);
  });

  it('calls onAuthorChange when author is selected', async () => {
    const user = userEvent.setup();
    render(
      <FilterBar
        categories={mockCategories}
        authors={mockAuthors}
        onCategoryChange={mockOnCategoryChange}
        onAuthorChange={mockOnAuthorChange}
        onSortChange={mockOnSortChange}
      />
    );

    const authorSelect = screen.getByLabelText('Author');
    await user.selectOptions(authorSelect, '3');

    expect(mockOnAuthorChange).toHaveBeenCalledWith(3);
  });

  it('calls onAuthorChange with undefined when "All Authors" is selected', async () => {
    const user = userEvent.setup();
    render(
      <FilterBar
        categories={mockCategories}
        authors={mockAuthors}
        selectedAuthor={1}
        onCategoryChange={mockOnCategoryChange}
        onAuthorChange={mockOnAuthorChange}
        onSortChange={mockOnSortChange}
      />
    );

    const authorSelect = screen.getByLabelText('Author');
    await user.selectOptions(authorSelect, '');

    expect(mockOnAuthorChange).toHaveBeenCalledWith(undefined);
  });

  it('calls onSortChange when sort option is selected', async () => {
    const user = userEvent.setup();
    render(
      <FilterBar
        categories={mockCategories}
        authors={mockAuthors}
        onCategoryChange={mockOnCategoryChange}
        onAuthorChange={mockOnAuthorChange}
        onSortChange={mockOnSortChange}
      />
    );

    const sortSelect = screen.getByLabelText('Sort By');
    await user.selectOptions(sortSelect, 'publication_date:ASC');

    expect(mockOnSortChange).toHaveBeenCalledWith('publication_date:ASC');
  });

  it('calls onSortChange with undefined when "Default" is selected', async () => {
    const user = userEvent.setup();
    render(
      <FilterBar
        categories={mockCategories}
        authors={mockAuthors}
        selectedSort="title:ASC"
        onCategoryChange={mockOnCategoryChange}
        onAuthorChange={mockOnAuthorChange}
        onSortChange={mockOnSortChange}
      />
    );

    const sortSelect = screen.getByLabelText('Sort By');
    await user.selectOptions(sortSelect, '');

    expect(mockOnSortChange).toHaveBeenCalledWith(undefined);
  });

  it('renders empty category list when no categories provided', () => {
    render(
      <FilterBar
        categories={[]}
        authors={mockAuthors}
        onCategoryChange={mockOnCategoryChange}
        onAuthorChange={mockOnAuthorChange}
        onSortChange={mockOnSortChange}
      />
    );

    const categoryOptions = screen.getAllByRole('option').filter((option) =>
      option.closest('select')?.id === 'category'
    );
    expect(categoryOptions).toHaveLength(1); // Only "All Categories"
  });

  it('renders empty author list when no authors provided', () => {
    render(
      <FilterBar
        categories={mockCategories}
        authors={[]}
        onCategoryChange={mockOnCategoryChange}
        onAuthorChange={mockOnAuthorChange}
        onSortChange={mockOnSortChange}
      />
    );

    const authorOptions = screen.getAllByRole('option').filter((option) =>
      option.closest('select')?.id === 'author'
    );
    expect(authorOptions).toHaveLength(1); // Only "All Authors"
  });
});
