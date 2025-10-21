import React from "react";

/**
 * KnowledgeTransform Component
 *
 * This component displays a visual representation of transforming fragmented knowledge into unified intelligence.
 * It does not take any input props and does not return any specific output.
 */
interface KnowledgeTransformProps {}

const KnowledgeTransform: React.FC<KnowledgeTransformProps> = () => {
  return (
    <section className="relative w-full max-w-5xl mx-auto p-8 bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-purple-700/30">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-purple-300 mb-8 tracking-tight drop-shadow-lg">
        Transforming Knowledge into Intelligence
      </h2>
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Fragmented Knowledge */}
        <div className="flex flex-col items-center gap-6 flex-1 bg-black/60 p-6 rounded-xl shadow-md border border-red-500/20">
          <div className="text-green-400 text-5xl mb-2">🧩</div>
          <h3 className="text-red-400 text-xl font-semibold mb-1">Fragmented Knowledge</h3>
          <p className="text-gray-300 text-base text-center max-w-xs">
            Information is scattered, disconnected, and hard to synthesize. Teams struggle to find answers and connect the dots.
          </p>
          <div className="flex gap-3 mt-4">
            <div className="w-6 h-6 bg-red-500/80 rounded shadow-lg"></div>
            <div className="w-6 h-6 bg-red-500/80 rounded-lg shadow-lg"></div>
            <div className="w-6 h-6 bg-red-500/80 rounded-full shadow-lg"></div>
          </div>
        </div>

        {/* Arrow/Transition */}
        <div className="flex flex-col items-center mx-4">
          <div className="text-purple-400 text-5xl md:text-6xl font-bold animate-pulse mb-2">→</div>
          <span className="text-purple-300 text-sm font-medium">AI-powered transformation</span>
        </div>

        {/* Unified Intelligence */}
        <div className="flex flex-col items-center gap-6 flex-1 bg-black/60 p-6 rounded-xl shadow-md border border-blue-500/20">
          <div className="text-yellow-300 text-5xl mb-2 animate-spin-slow">✨</div>
          <h3 className="text-blue-400 text-xl font-semibold mb-1">Unified Intelligence</h3>
          <p className="text-gray-200 text-base text-center max-w-xs">
            Knowledge is connected, contextual, and actionable. Teams gain clarity, make smarter decisions, and innovate faster.
          </p>
          <div className="w-32 h-10 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 rounded-full shadow-lg border border-purple-400/40 mt-4 flex items-center justify-center">
            <span className="text-white font-bold text-lg tracking-wide">Synergy</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KnowledgeTransform;
