"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AnalyticsEvent } from '../../lib/mockAnalyticsData';

interface PageViewChartProps {
  data: AnalyticsEvent[];
}

const PageViewChart: React.FC<PageViewChartProps> = ({ data }) => {
  const pageViewCounts = data.reduce((acc, event) => {
    acc[event.name] = (acc[event.name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(pageViewCounts).map(([name, count]) => ({
    name,
    views: count,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="views" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PageViewChart;
