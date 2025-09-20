'use client';

import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; reset: () => void }>;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const Fallback = this.props.fallback || DefaultErrorFallback;
      return (
        <Fallback
          error={this.state.error}
          reset={() => this.setState({ hasError: false, error: undefined })}
        />
      );
    }

    return this.props.children;
  }
}

function DefaultErrorFallback({
  error,
  reset,
}: {
  error?: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="mb-4 text-6xl">⚠️</div>
      <h2 className="mb-2 text-xl font-semibold">Something went wrong</h2>
      <p className="text-muted-foreground mb-4 text-sm">
        {error?.message || 'An unexpected error occurred'}
      </p>
      <button
        onClick={reset}
        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Try again
      </button>
      {process.env.NODE_ENV === 'development' && error && (
        <details className="mt-4 max-w-lg">
          <summary className="cursor-pointer text-sm text-gray-600">
            Error details (dev only)
          </summary>
          <pre className="mt-2 overflow-auto rounded bg-gray-100 p-2 text-xs">
            {error.stack}
          </pre>
        </details>
      )}
    </div>
  );
}

export default ErrorBoundary;
