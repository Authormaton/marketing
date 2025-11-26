"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AnalyticsEvent } from '../../lib/mockAnalyticsData';

interface WritingDemoNavigationChartProps {
  data: AnalyticsEvent[];
}

const WritingDemoNavigationChart: React.FC<WritingDemoNavigationChartProps> = ({ data }) => {
  // Aggregate navigation events by slide and direction
  const navigationCounts = data.reduce((acc, event) => {
    const slideName = event.name;
    const direction = event.payload?.direction || 'unknown';
    if (!acc[slideName]) {
      acc[slideName] = { next: 0, prev: 0 };
    }
    acc[slideName][direction] = (acc[slideName][direction] || 0) + 1;
    return acc;
  }, {} as Record<string, { next: number; prev: number }>);

  const chartData = Object.entries(navigationCounts)
    .map(([slide, counts]) => ({
      slide,
      next: counts.next,
      prev: counts.prev,
    }))
    .sort((a, b) => parseInt(a.slide.split('_')[1]) - parseInt(b.slide.split('_')[1])); // Sort by slide number

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="slide" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="next" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="prev" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default WritingDemoNavigationChart;
