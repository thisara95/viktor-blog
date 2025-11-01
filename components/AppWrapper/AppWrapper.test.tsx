import { render, screen } from '@testing-library/react';
import AppWrapper from './AppWrapper';

// Mock the ErrorBoundary and Maintenance components
jest.mock('@/components', () => ({
  ErrorBoundary: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="error-boundary">{children}</div>
  ),
  Maintenance: ({ estimatedTime, message }: { estimatedTime?: string; message?: string }) => (
    <div data-testid="maintenance">
      {message && <span>{message}</span>}
      {estimatedTime && <span>ETA: {estimatedTime}</span>}
    </div>
  ),
}));

describe('AppWrapper', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('renders children wrapped in ErrorBoundary when not in maintenance mode', () => {
    process.env.NEXT_PUBLIC_MAINTENANCE_MODE = 'false';

    render(
      <AppWrapper>
        <div>Test content</div>
      </AppWrapper>
    );

    expect(screen.getByTestId('error-boundary')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders Maintenance component when maintenance mode is enabled', () => {
    process.env.NEXT_PUBLIC_MAINTENANCE_MODE = 'true';

    render(
      <AppWrapper>
        <div>Test content</div>
      </AppWrapper>
    );

    expect(screen.getByTestId('maintenance')).toBeInTheDocument();
    expect(screen.queryByText('Test content')).not.toBeInTheDocument();
  });

  it('passes maintenance message to Maintenance component', () => {
    process.env.NEXT_PUBLIC_MAINTENANCE_MODE = 'true';
    process.env.NEXT_PUBLIC_MAINTENANCE_MESSAGE = 'Custom maintenance message';

    render(
      <AppWrapper>
        <div>Test content</div>
      </AppWrapper>
    );

    expect(screen.getByText('Custom maintenance message')).toBeInTheDocument();
  });

  it('passes estimated time to Maintenance component', () => {
    process.env.NEXT_PUBLIC_MAINTENANCE_MODE = 'true';
    process.env.NEXT_PUBLIC_MAINTENANCE_ETA = '2 hours';

    render(
      <AppWrapper>
        <div>Test content</div>
      </AppWrapper>
    );

    expect(screen.getByText('ETA: 2 hours')).toBeInTheDocument();
  });

  it('renders children when maintenance mode is not set', () => {
    delete process.env.NEXT_PUBLIC_MAINTENANCE_MODE;

    render(
      <AppWrapper>
        <div>Test content</div>
      </AppWrapper>
    );

    expect(screen.getByTestId('error-boundary')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });
});
