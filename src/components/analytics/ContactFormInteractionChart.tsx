"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AnalyticsEvent } from '../../lib/mockAnalyticsData';

interface ContactFormInteractionChartProps {
  data: AnalyticsEvent[];
}

const ContactFormInteractionChart: React.FC<ContactFormInteractionChartProps> = ({ data }) => {
  const interactionCounts = data.reduce((acc, event) => {
    acc[event.name] = (acc[event.name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(interactionCounts).map(([name, count]) => ({
    name,
    count,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#ffc658" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ContactFormInteractionChart;
