import Image from "next/image";

export default function WorkflowDiagram() {
  return (
    <div className="w-full flex flex-col items-center py-8 px-2">
      <h2 className="text-3xl font-bold mb-8 text-center text-white drop-shadow-lg">
        Multi-Agent AI Workflow
      </h2>
      <div
        className="flex flex-row items-center justify-center gap-8 bg-gradient-to-r from-[#2a1a47] to-[#0a0a23] rounded-2xl p-8 shadow-xl relative overflow-hidden"
        style={{ minHeight: 320 }}
      >
        {/* Research Agent */}
        <div className="flex flex-col items-center">
          <div className="bg-black/60 rounded-xl p-6 flex flex-col items-center shadow-lg">
            <span className="text-5xl mb-2" role="img" aria-label="brain">
              <Image
                src="/file.svg"
                alt="Research Agent"
                width={56}
                height={56}
                className="mb-2"
                style={{
                  filter:
                    "invert(60%) sepia(80%) saturate(500%) hue-rotate(230deg)",
                }}
              />
            </span>
            <span className="text-lg font-semibold text-white">
              Research Agent
            </span>
          </div>
        </div>
        {/* Arrow */}
        <span className="text-4xl text-purple-400">→</span>
        {/* Analysis Agent */}
        <div className="flex flex-col items-center">
          <div className="bg-black/60 rounded-xl p-6 flex flex-col items-center shadow-lg">
            <span className="text-5xl mb-2" role="img" aria-label="analysis">
              <svg width="56" height="56" fill="none" viewBox="0 0 24 24">
                <rect
                  width="24"
                  height="24"
                  rx="12"
                  fill="#0ff"
                  fillOpacity="0.1"
                />
                <path
                  d="M12 6v6m0 0l-3 3m3-3l3 3"
                  stroke="#0ff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="text-lg font-semibold text-cyan-300">
              Analysis Agent
            </span>
          </div>
        </div>
        {/* Arrow */}
        <span className="text-4xl text-cyan-300">→</span>
        {/* Writing Agent */}
        <div className="flex flex-col items-center">
          <div className="bg-black/60 rounded-xl p-6 flex flex-col items-center shadow-lg">
            <span className="text-5xl mb-2" role="img" aria-label="writing">
              <svg width="56" height="56" fill="none" viewBox="0 0 24 24">
                <rect
                  width="24"
                  height="24"
                  rx="12"
                  fill="#f0f"
                  fillOpacity="0.1"
                />
                <path
                  d="M8 16l8-8M8 8h8v8"
                  stroke="#f0f"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="text-lg font-semibold text-pink-400">
              Writing Agent
            </span>
          </div>
        </div>
        {/* Arrow */}
        <span className="text-4xl text-pink-400">→</span>
        {/* Expert Content */}
        <div className="flex flex-col items-center">
          <div className="bg-black/30 rounded-full p-6 flex flex-col items-center shadow-lg">
            <span className="text-5xl mb-2" role="img" aria-label="content">
              <Image
                src="/file.svg"
                alt="Expert Content"
                width={56}
                height={56}
                className="mb-2"
                style={{ filter: "invert(80%)" }}
              />
            </span>
            <span className="text-lg font-semibold text-purple-300">
              Expert Content
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
