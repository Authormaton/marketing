'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { errorLogger, Breadcrumb } from '@/lib/errorLogging'; // Assuming '@/lib/errorLogging' resolves correctly

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  retryKey: number;
  retryCount: number;
  retryDelay: number;
  breadcrumbs: Breadcrumb[];
  showDetails: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
    retryKey: 0,
    retryCount: 0,
    retryDelay: 1000, // Initial retry delay of 1 second
    breadcrumbs: [],
    showDetails: false,
  };

  private readonly MAX_RETRIES = 5; // Maximum number of exponential backoff retries
  private readonly MAX_BREADCRUMBS_DISPLAY = 5; // Max breadcrumbs to show in fallback UI

  public static getDerivedStateFromError(_: Error): Partial<State> {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error caught by ErrorBoundary:", error, errorInfo);
    // Capture the breadcrumbs from the errorLogger to display them in the UI
    const currentBreadcrumbs = errorLogger.getBreadcrumbs();
    this.setState({ error, errorInfo, breadcrumbs: currentBreadcrumbs });

    // Automatically report error to the logging service
    errorLogger.captureError(error, {
      context: {
        componentStack: errorInfo.componentStack,
        currentPath: window.location.pathname,
      },
      breadcrumbs: currentBreadcrumbs,
      level: 'error',
    });
  }

  private getErrorMessage = (error: Error | null): string => {
    if (!error) {
      return "An unexpected error occurred.";
    }
    if (error.name === 'NetworkError' || (error instanceof TypeError && error.message === 'Failed to fetch')) {
      return "It seems you're offline or there's a network issue. Please check your internet connection.";
    }
    if (error.name === 'QuotaExceededError') {
      return "Local storage limit reached. Please clear your browser's data for this site.";
    }
    // Generic fallback message
    return "Something went wrong. We've been notified and are working on a fix.";
  };

  private handleRetry = () => {
    this.setState((prevState) => {
      const nextRetryCount = prevState.retryCount + 1;
      const nextRetryDelay = Math.min(
        prevState.retryDelay * 2,
        30000 // Cap the exponential backoff at 30 seconds
      );

      if (nextRetryCount > this.MAX_RETRIES) {
        // After max retries, force a page reload
        errorLogger.addBreadcrumb({
          message: 'Max retries reached, forcing page reload.',
          level: 'warning',
        });
        setTimeout(() => window.location.reload(), 1000);
        return { ...prevState, hasError: true }; // Keep error state visible until reload
      }

      return {
        hasError: false,
        error: null,
        errorInfo: null,
        retryKey: prevState.retryKey + 1,
        retryCount: nextRetryCount,
        retryDelay: nextRetryDelay,
        showDetails: false, // Hide details on retry
      };
    });
  };

  private handleReportIssue = () => {
    const { error, errorInfo, breadcrumbs } = this.state;
    // Potentially gather more user context here, e.g., from a form
    const userMessage = prompt("Please describe what you were doing when the error occurred (optional):");

    errorLogger.captureError(error || new Error("Unknown error reported by user"), {
      context: {
        componentStack: errorInfo?.componentStack,
        userDescription: userMessage,
        currentPath: window.location.pathname,
      },
      breadcrumbs: breadcrumbs,
      level: 'error',
      tags: {
        reportedByUser: 'true',
      },
      user: errorLogger.getCurrentUserContext(), // Get current user context from logger
    });

    alert("Thank you for reporting the issue! We will look into it.");
    this.setState({ showDetails: false }); // Optionally hide details after reporting
  };

  public render() {
    if (this.state.hasError) {
      const { error, errorInfo, retryCount, breadcrumbs, showDetails } = this.state;
      const errorMessage = this.getErrorMessage(error);

      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
          <h1 className="text-4xl font-bold mb-4 text-red-600 dark:text-red-400">Application Error</h1>
          <p className="text-lg text-center mb-6">{errorMessage}</p>

          {retryCount < this.MAX_RETRIES && (
            <button
              onClick={this.handleRetry}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out mb-4"
            >
              Try Again ({this.MAX_RETRIES - retryCount} attempts left)
            </button>
          )}

          <button
            onClick={this.handleReportIssue}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out mb-4"
          >
            Report Issue
          </button>

          <button
            onClick={() => this.setState(prevState => ({ showDetails: !prevState.showDetails }))}
            className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-600 text-sm mb-4"
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </button>

          {showDetails && (
            <div className="bg-gray-200 dark:bg-gray-800 p-6 rounded-lg shadow-inner w-full max-w-2xl text-left">
              <h2 className="text-xl font-semibold mb-2">Error Details</h2>
              {error && (
                <div className="mb-4">
                  <h3 className="text-lg font-medium">Message:</h3>
                  <p className="font-mono text-sm break-words">{error.message}</p>
                  {error.stack && (
                    <>
                      <h3 className="text-lg font-medium mt-2">Stack Trace:</h3>
                      <pre className="font-mono text-xs whitespace-pre-wrap break-all bg-gray-300 dark:bg-gray-700 p-2 rounded max-h-40 overflow-auto">{error.stack}</pre>
                    </>
                  )}
                </div>
              )}
              {errorInfo?.componentStack && (
                <div className="mb-4">
                  <h3 className="text-lg font-medium">Component Stack:</h3>
                  <pre className="font-mono text-xs whitespace-pre-wrap break-all bg-gray-300 dark:bg-gray-700 p-2 rounded max-h-40 overflow-auto">{errorInfo.componentStack}</pre>
                </div>
              )}
              {breadcrumbs.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium">Recent Actions (Breadcrumbs):</h3>
                  <ul className="list-disc list-inside text-sm bg-gray-300 dark:bg-gray-700 p-2 rounded max-h-40 overflow-auto">
                    {breadcrumbs.slice(-this.MAX_BREADCRUMBS_DISPLAY).map((b, index) => (
                      <li key={index} className="break-words">
                        <strong>{b.level || 'info'}:</strong> {b.message} (Category: {b.category || 'N/A'})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {retryCount >= this.MAX_RETRIES && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-6">
              If the problem persists, please contact support with the details above.
            </p>
          )}
        </div>
      );
    }

    return <div key={this.state.retryKey}>{this.props.children}</div>;
  }
}

export default ErrorBoundary;

