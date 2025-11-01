'use client'
import React, { useState, useEffect } from 'react';

const WritingDemo = ({ loading = false }: { loading?: boolean }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      robotEmoji: "🤖",
      documentEmoji: "📝",
      text: "Technical whitepaper generated with blockchain-specific expertise"
    },
    {
      robotEmoji: "🤖",
      documentEmoji: "📊",
      text: "Market analysis report with data-driven insights"
    },
    {
      robotEmoji: "🤖",
      documentEmoji: "📱",
      text: "Product documentation with technical accuracy"
    },
    {
      robotEmoji: "🤖",
      documentEmoji: "📈",
      text: "Research paper with comprehensive citations"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-medium text-purple-400 text-center mb-8">
        Human-Quality Writing Demo
      </h2>
      <div className="relative bg-black/40 rounded-3xl p-8 overflow-hidden shadow-[0_0_30px_rgba(139,92,246,0.1)]">
        {loading ? (
          <div className="animate-pulse" aria-busy="true" role="progressbar">
            {/* Skeleton for Robot Avatar */}
            <div className="w-full h-24 bg-gray-700 rounded-xl mb-8"></div>

            {/* Skeleton for Writing Demo Text */}
            <div className="flex items-center gap-3 text-lg">
              <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
              <div className="w-4 h-1 bg-gray-700 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            </div>

            {/* Skeleton for Slide Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              <div className="w-2 h-2 rounded-full bg-gray-700"></div>
              <div className="w-2 h-2 rounded-full bg-gray-700"></div>
              <div className="w-2 h-2 rounded-full bg-gray-700"></div>
              <div className="w-2 h-2 rounded-full bg-gray-700"></div>
            </div>
          </div>
        ) : (
          <>
            {/* Robot Avatar */}
            <div className="w-full h-24 bg-black/60 rounded-xl mb-8 flex items-center justify-center">
              <div className="text-4xl">{slides[currentSlide].robotEmoji}</div>
            </div>

            {/* Writing Demo */}
            <div className="flex items-center gap-3 text-lg">
              <div className="text-2xl">{slides[currentSlide].robotEmoji}</div>
              <div className="text-gray-400">→</div>
              <div className="text-2xl">{slides[currentSlide].documentEmoji}</div>
              <div className="text-gray-300 font-mono">{slides[currentSlide].text}</div>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {slides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  role="tab"
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === currentSlide ? 'true' : 'false'}
                  onClick={() => setCurrentSlide(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setCurrentSlide(index);
                    }
                  }}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${index === currentSlide ? 'bg-purple-500' : 'bg-gray-700'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WritingDemo;