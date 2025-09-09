import React from "react";

const KnowledgeTransform = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto p-6 bg-black/90 rounded-lg shadow-lg overflow-hidden">
      <div className="flex items-center justify-between gap-8">
        {/* Fragmented Knowledge */}
        <div className="flex flex-col items-center gap-4">
          <div className="text-green-400 text-4xl">🧩</div>
          <p className="text-gray-400 text-lg font-medium">
            Fragmented Knowledge
          </p>
          <div className="flex gap-2">
            <div className="w-4 h-4 bg-red-500/80 rounded"></div>
            <div className="w-4 h-4 bg-red-500/80 rounded-lg"></div>
            <div className="w-4 h-4 bg-red-500/80 rounded-full"></div>
          </div>
        </div>

        {/* Arrow */}
        <div className="text-purple-500 text-4xl">→</div>

        {/* Unified Intelligence */}
        <div className="flex flex-col items-center gap-4">
          <div className="text-yellow-400 text-4xl">✨</div>
          <p className="text-purple-400 text-lg font-medium">
            Unified Intelligence
          </p>
          <div className="w-24 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeTransform;
