import type { Meta, StoryObj } from '@storybook/react';
import ErrorBoundary from './ErrorBoundary';
import { useState } from 'react';

const meta = {
  title: 'Components/ErrorBoundary',
  component: ErrorBoundary,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ErrorBoundary>;

export default meta;
type Story = StoryObj<typeof meta>;

// Component that throws an error on demand
const ErrorThrower = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('This is a test error from Storybook!');
  }
  return <div className="p-8 text-center">Everything is working fine!</div>;
};

// Interactive component for testing
const InteractiveErrorTest = () => {
  const [shouldError, setShouldError] = useState(false);

  return (
    <ErrorBoundary>
      {shouldError ? (
        <ErrorThrower shouldThrow={true} />
      ) : (
        <div className="p-8 text-center">
          <p className="mb-4">Click the button below to trigger an error</p>
          <button
            onClick={() => setShouldError(true)}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Trigger Error
          </button>
        </div>
      )}
    </ErrorBoundary>
  );
};

export const WithError: Story = {
  args: {
    children: <ErrorThrower shouldThrow={true} />,
  },
};

export const NoError: Story = {
  args: {
    children: (
      <div className="p-8 text-center bg-green-50">
        <h2 className="text-2xl font-bold text-green-900 mb-2">No Error!</h2>
        <p className="text-green-700">Everything is working perfectly.</p>
      </div>
    ),
  },
};

export const Interactive: Story = {
  render: () => <InteractiveErrorTest />,
  args: {
    children: <div />,
  },
};

export const CustomFallback: Story = {
  args: {
    children: <ErrorThrower shouldThrow={true} />,
    fallback: (
      <div className="min-h-screen bg-purple-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-xl">
          <h1 className="text-3xl font-bold text-purple-900 mb-4">
            Custom Error Fallback
          </h1>
          <p className="text-purple-700">
            This is a custom fallback UI for errors.
          </p>
        </div>
      </div>
    ),
  },
};
