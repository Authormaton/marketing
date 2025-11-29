"use client";

import React from "react";
import { CopyButton } from "./ui/CopyButton";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface CodeExampleProps {
  title: string;
  code: string;
  language: string;
}

const CodeExample = ({ title, code, language }: CodeExampleProps) => (
  <Card className="w-full max-w-2xl mx-auto my-4">
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle>{title}</CardTitle>
      <CopyButton textToCopy={code} />
    </CardHeader>
    <CardContent>
      <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </CardContent>
  </Card>
);

export const TechnicalDocumentation = () => {
  const apiExample1 = `
import { AuthormatonClient } from '@authormaton/sdk';

const client = new AuthormatonClient({
  apiKey: 'YOUR_API_KEY',
});

async function generateContent() {
  const response = await client.generate({
    prompt: 'Write a blog post about the benefits of AI in content creation.',
    length: 500,
    style: 'engaging',
  });
  console.log(response.content);
}

generateContent();
`;

  const apiExample2 = `
fetch('/api/authormaton/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY',
  },
  body: JSON.stringify({
    prompt: 'Create a catchy headline for a new marketing campaign.',
    type: 'headline',
  }),
})
.then(response => response.json())
.then(data => console.log(data.text))
.catch(error => console.error('Error:', error));
`;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Technical Documentation</h1>
      <p className="text-center text-gray-600 mb-12">Explore our API with these copyable code examples.</p>

      <CodeExample
        title="Node.js SDK Example"
        code={apiExample1}
        language="javascript"
      />

      <CodeExample
        title="Fetch API Example"
        code={apiExample2}
        language="javascript"
      />

      {/* Add more technical documentation content here */}
    </div>
  );
};
