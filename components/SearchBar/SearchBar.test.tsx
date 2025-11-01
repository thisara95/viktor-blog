import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  it('renders search input and button', () => {
    render(<SearchBar onSearch={mockOnSearch} />);

    expect(screen.getByPlaceholderText('Search blog posts...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('displays initial value when provided', () => {
    render(<SearchBar initialValue="test query" onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search blog posts...') as HTMLInputElement;
    expect(input.value).toBe('test query');
  });

  it('updates input value when user types', async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search blog posts...') as HTMLInputElement;
    await user.type(input, 'new search');

    expect(input.value).toBe('new search');
  });

  it('calls onSearch when form is submitted', async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search blog posts...');
    await user.type(input, 'test search');

    const searchButton = screen.getByRole('button', { name: 'Search' });
    await user.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith('test search');
  });

  it('calls onSearch when Enter key is pressed', async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search blog posts...');
    await user.type(input, 'test search{Enter}');

    expect(mockOnSearch).toHaveBeenCalledWith('test search');
  });

  it('shows Clear button when input has value', async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search blog posts...');
    await user.type(input, 'test');

    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument();
  });

  it('hides Clear button when input is empty', () => {
    render(<SearchBar onSearch={mockOnSearch} />);

    expect(screen.queryByRole('button', { name: 'Clear' })).not.toBeInTheDocument();
  });

  it('clears input and calls onSearch with empty string when Clear is clicked', async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search blog posts...') as HTMLInputElement;
    await user.type(input, 'test');

    const clearButton = screen.getByRole('button', { name: 'Clear' });
    await user.click(clearButton);

    expect(input.value).toBe('');
    expect(mockOnSearch).toHaveBeenCalledWith('');
  });

  it('updates input value when initialValue prop changes', () => {
    const { rerender } = render(<SearchBar initialValue="first" onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search blog posts...') as HTMLInputElement;
    expect(input.value).toBe('first');

    rerender(<SearchBar initialValue="second" onSearch={mockOnSearch} />);
    expect(input.value).toBe('second');
  });

  it('does not call onSearch when Clear button is clicked via form submission', async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search blog posts...');
    await user.type(input, 'test');

    // Clear the mock to check only the clear button click
    mockOnSearch.mockClear();

    const clearButton = screen.getByRole('button', { name: 'Clear' });
    await user.click(clearButton);

    // onSearch should be called once with empty string
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith('');
  });
});
