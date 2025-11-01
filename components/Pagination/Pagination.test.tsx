import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from './Pagination';

describe('Pagination', () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  it('does not render when totalPages is 1 or less', () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} onPageChange={mockOnPageChange} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders Previous and Next buttons', () => {
    render(<Pagination currentPage={2} totalPages={5} onPageChange={mockOnPageChange} />);
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('disables Previous button on first page', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />);
    const previousButton = screen.getByText('Previous');
    expect(previousButton).toBeDisabled();
  });

  it('disables Next button on last page', () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={mockOnPageChange} />);
    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });

  it('calls onPageChange when Previous button is clicked', async () => {
    const user = userEvent.setup();
    render(<Pagination currentPage={3} totalPages={5} onPageChange={mockOnPageChange} />);

    const previousButton = screen.getByText('Previous');
    await user.click(previousButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange when Next button is clicked', async () => {
    const user = userEvent.setup();
    render(<Pagination currentPage={3} totalPages={5} onPageChange={mockOnPageChange} />);

    const nextButton = screen.getByText('Next');
    await user.click(nextButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });

  it('renders all page numbers when totalPages is 5 or less', () => {
    render(<Pagination currentPage={2} totalPages={4} onPageChange={mockOnPageChange} />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('shows ellipsis when there are many pages', () => {
    render(<Pagination currentPage={5} totalPages={10} onPageChange={mockOnPageChange} />);

    const ellipsisButtons = screen.getAllByText('...');
    expect(ellipsisButtons.length).toBeGreaterThan(0);
  });

  it('highlights current page', () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={mockOnPageChange} />);

    const currentPageButton = screen.getByText('3');
    expect(currentPageButton).toHaveClass('bg-blue-600', 'text-white');
  });

  it('calls onPageChange with correct page number when page button is clicked', async () => {
    const user = userEvent.setup();
    render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />);

    const page3Button = screen.getByText('3');
    await user.click(page3Button);

    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it('does not call onPageChange when ellipsis is clicked', async () => {
    const user = userEvent.setup();
    render(<Pagination currentPage={5} totalPages={10} onPageChange={mockOnPageChange} />);

    const ellipsisButton = screen.getAllByText('...')[0];
    await user.click(ellipsisButton);

    expect(mockOnPageChange).not.toHaveBeenCalled();
  });

  it('shows correct pagination structure when on early pages', () => {
    render(<Pagination currentPage={2} totalPages={10} onPageChange={mockOnPageChange} />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('...')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('shows correct pagination structure when on middle pages', () => {
    render(<Pagination currentPage={5} totalPages={10} onPageChange={mockOnPageChange} />);

    expect(screen.getByText('1')).toBeInTheDocument();
    const ellipsisButtons = screen.getAllByText('...');
    expect(ellipsisButtons).toHaveLength(2);
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('shows correct pagination structure when on late pages', () => {
    render(<Pagination currentPage={9} totalPages={10} onPageChange={mockOnPageChange} />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('...')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('9')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });
});
