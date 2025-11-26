"use client";

import React, { useState, useEffect } from 'react';
import AnalyticsDashboard from '../../components/analytics/AnalyticsDashboard';

const AnalyticsPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Placeholder for authentication

  useEffect(() => {
    // In a real application, you would check for a valid session or token here.
    // For now, we'll simulate authentication.
    const checkAuth = () => {
      // Example: Check if a token exists in localStorage
      const token = localStorage.getItem('authToken');
      setIsAuthenticated(!!token); // Set to true if token exists
    };
    checkAuth();
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-xl text-gray-700 dark:text-gray-300">Please log in to view analytics.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Website Analytics</h1>
      <AnalyticsDashboard />
    </div>
  );
};

export default AnalyticsPage;
