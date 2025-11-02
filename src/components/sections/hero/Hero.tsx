'use client'
import dynamic from 'next/dynamic';

const WorkflowDiagram = dynamic(() => import('./WorkflowDiagram'), {
  ssr: false,
  loading: () => <div className="text-white">Loading workflow diagram...</div>,
});

export default function Hero() {
  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-center pt-20 pb-5 px-4 relative overflow-hidden">
      <img
        src="/bg.png"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none select-none"
        aria-hidden="true"
      />
      <h1 className="relative z-10 text-5xl md:text-7xl font-extrabold text-center sm:text-left mb-6 bg-gradient-to-r from-blue-400 via-cyan-300 to-pink-400 bg-clip-text text-transparent drop-shadow-xl">
        Autonomous AI for
        <br />
        Technical Web3 Content
      </h1>
      <p className="relative z-10 text-lg md:text-2xl text-center sm:text-left text-gray-200 max-w-3xl mx-auto mt-2 drop-shadow">
        Harness agentic AI to automate expert-level writing and research with
        unprecedented accuracy in the decentralized web space.
      </p>
      <WorkflowDiagram/>
    </div>
  );
}
