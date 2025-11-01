'use client';

import { useState } from 'react';

export default function ErrorTrigger() {
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    // This will trigger the ErrorBoundary
    throw new Error('This is a test error to demonstrate the ErrorBoundary!');
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setShouldError(true)}
        className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition-colors font-medium"
      >
        Trigger Error (Test)
      </button>
    </div>
  );
}
