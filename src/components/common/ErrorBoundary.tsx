'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  retryKey: number;
  retryCount: number;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
    retryKey: 0,
    retryCount: 0,
  };

  private readonly RETRY_THRESHOLD = 3;

  public static getDerivedStateFromError(_: Error): Partial<State> {
    // Update state so the next render shows the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ error, errorInfo });
    // Here you would typically log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }

  private handleRetry = () => {
    if (this.state.retryCount >= this.RETRY_THRESHOLD) {
      this.setState((prevState) => ({
        hasError: false,
        error: null,
        errorInfo: null,
        retryKey: prevState.retryKey + 1,
        retryCount: prevState.retryCount + 1,
      }));
      setTimeout(() => window.location.reload(), 3000);
      return;
    }

    this.setState((prevState) => ({
      hasError: false,
      error: null,
      errorInfo: null,
      retryKey: prevState.retryKey + 1,
      retryCount: prevState.retryCount + 1,
    }));
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
          <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong.</h1>
          {this.state.retryCount >= this.RETRY_THRESHOLD ? (
            <>
              <p className="text-lg text-center mb-6">
                Persistent error detected. The page will reload automatically.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                If the problem persists, please contact support.
              </p>
            </>
          ) : (
            <p className="text-lg text-center mb-6">
              We apologize for the inconvenience. Please try again.
            </p>
          )}
          <button
            onClick={this.handleRetry}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            Retry
          </button>
        </div>
      );
    }

    return <div key={this.state.retryKey}>{this.props.children}</div>;
  }
}

export default ErrorBoundary;
