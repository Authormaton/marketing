export default function ContentCrisis() {
  return (
    <section className="w-full py-16 px-4 bg-[#0a0a12] text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-purple-400">
          The Web3 Content Crisis
        </h2>
        <p className="text-xl text-center text-gray-300 max-w-4xl mx-auto mb-16">
          Today&apos;s technical content creation is broken. Critical blockchain
          knowledge remains trapped in silos, while quality expertise becomes
          increasingly scarce.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Fragmented Knowledge */}
          <div className="bg-[#121225] p-6 rounded-lg border border-[#252542] shadow-lg">
            <div className="bg-[#18162A] w-16 h-16 rounded-lg flex items-center justify-center mb-6">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Fragmented Knowledge</h3>
            <p className="text-gray-400">
              Critical Web3 information scattered across countless sources,
              making comprehensive research nearly impossible.
            </p>
          </div>

          {/* Expert Bottlenecks */}
          <div className="bg-[#121225] p-6 rounded-lg border border-[#252542] shadow-lg">
            <div className="bg-[#18162A] w-16 h-16 rounded-lg flex items-center justify-center mb-6">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Expert Bottlenecks</h3>
            <p className="text-gray-400">
              Limited subject matter experts create massive delays in producing
              high-quality technical content.
            </p>
          </div>

          {/* Quality Inconsistency */}
          <div className="bg-[#121225] p-6 rounded-lg border border-[#252542] shadow-lg">
            <div className="bg-[#18162A] w-16 h-16 rounded-lg flex items-center justify-center mb-6">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">
              Quality Inconsistency
            </h3>
            <p className="text-gray-400">
              Manual processes lead to varying content quality and accuracy,
              risking credibility in technical communities.
            </p>
          </div>

          {/* Time-Intensive Process */}
          <div className="bg-[#121225] p-6 rounded-lg border border-[#252542] shadow-lg">
            <div className="bg-[#18162A] w-16 h-16 rounded-lg flex items-center justify-center mb-6">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">
              Time-Intensive Process
            </h3>
            <p className="text-gray-400">
              Traditional content creation takes weeks or months, slowing down
              innovation and decision-making.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
