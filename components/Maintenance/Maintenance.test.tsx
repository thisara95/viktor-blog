import { render, screen } from '@testing-library/react';
import Maintenance from './Maintenance';

describe('Maintenance', () => {
  it('renders maintenance title', () => {
    render(<Maintenance />);
    expect(screen.getByText('Under Maintenance')).toBeInTheDocument();
  });

  it('renders default message when no custom message provided', () => {
    render(<Maintenance />);
    expect(
      screen.getByText(/We're currently performing scheduled maintenance/)
    ).toBeInTheDocument();
  });

  it('renders custom message when provided', () => {
    const customMessage = 'We are upgrading our systems. Please check back soon.';
    render(<Maintenance message={customMessage} />);
    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  it('displays estimated time when provided', () => {
    render(<Maintenance estimatedTime="2 hours" />);
    expect(screen.getByText('Estimated time: 2 hours')).toBeInTheDocument();
  });

  it('does not display estimated time section when not provided', () => {
    render(<Maintenance />);
    expect(screen.queryByText(/Estimated time:/)).not.toBeInTheDocument();
  });

  it('renders info cards', () => {
    render(<Maintenance />);
    expect(screen.getByText("What's happening?")).toBeInTheDocument();
    expect(screen.getByText('When will it be back?')).toBeInTheDocument();
    expect(screen.getByText('Need help?')).toBeInTheDocument();
  });

  it('shows default time in info card when no estimatedTime provided', () => {
    render(<Maintenance />);
    expect(screen.getByText('Soon')).toBeInTheDocument();
  });

  it('shows estimated time in info card when provided', () => {
    render(<Maintenance estimatedTime="30 minutes" />);
    const infoCells = screen.getAllByText('30 minutes');
    expect(infoCells.length).toBeGreaterThan(0);
  });

  it('renders system upgrades info', () => {
    render(<Maintenance />);
    expect(screen.getByText('System upgrades and improvements')).toBeInTheDocument();
  });

  it('renders thank you message', () => {
    render(<Maintenance />);
    expect(screen.getByText('Thank you for your patience!')).toBeInTheDocument();
  });

  it('renders check back shortly message', () => {
    render(<Maintenance />);
    expect(screen.getByText('Check back shortly')).toBeInTheDocument();
  });

  it('renders maintenance icon', () => {
    const { container } = render(<Maintenance />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders clock icon when estimatedTime is provided', () => {
    const { container } = render(<Maintenance estimatedTime="1 hour" />);
    const svgs = container.querySelectorAll('svg');
    // Should have at least 2 SVGs (main icon + clock icon)
    expect(svgs.length).toBeGreaterThanOrEqual(2);
  });
});
