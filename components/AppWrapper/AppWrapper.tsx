'use client';

import { ReactNode } from 'react';
import { ErrorBoundary, Maintenance } from '@/components';

interface AppWrapperProps {
  children: ReactNode;
}

export default function AppWrapper({ children }: AppWrapperProps) {
  // Check if maintenance mode is enabled
  const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';

  if (isMaintenanceMode) {
    return (
      <Maintenance
        estimatedTime={process.env.NEXT_PUBLIC_MAINTENANCE_ETA}
        message={process.env.NEXT_PUBLIC_MAINTENANCE_MESSAGE}
      />
    );
  }

  return <ErrorBoundary>{children}</ErrorBoundary>;
}
