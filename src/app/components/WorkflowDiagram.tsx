import Image from "next/image";

export default function WorkflowDiagram() {
  return (
    <div className="w-full flex flex-col items-center py-1 px-2">
      <div
        className="flex flex-row items-center justify-center gap-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl relative overflow-hidden"
        style={{ minHeight: 250 }}
      >
        {/* Research Agent */}
        <div className="flex flex-col items-center">
          <div className="bg-black/60 rounded-xl p-4 flex flex-col items-center shadow-lg">
            <span className="text-4xl mb-2" role="img" aria-label="brain">
              <Image
                src="/file.svg"
                alt="Research Agent"
                width={40}
                height={40}
                className="mb-2"
                style={{
                  filter:
                    "invert(60%) sepia(80%) saturate(500%) hue-rotate(230deg)",
                }}
              />
            </span>
            <span className="text-sm font-semibold text-white">
              Research Agent
            </span>
          </div>
        </div>
        {/* Arrow */}
        <span className="text-3xl text-purple-400">→</span>
        {/* Analysis Agent */}
        <div className="flex flex-col items-center">
          <div className="bg-black/60 rounded-xl p-4 flex flex-col items-center shadow-lg relative z-10">
            <span className="text-4xl mb-2" role="img" aria-label="analysis">
              <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
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
            <span className="text-sm font-semibold text-cyan-300">
              Analysis Agent
            </span>
          </div>
        </div>

        {/* Arrow */}
        <span className="text-3xl text-cyan-300">→</span>
        {/* Writing Agent */}
        <div className="flex flex-col items-center">
          <div className="bg-black/60 rounded-xl p-4 flex flex-col items-center shadow-lg">
            <span className="text-4xl mb-2" role="img" aria-label="writing">
              <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
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
            <span className="text-sm font-semibold text-pink-400">
              Writing Agent
            </span>
          </div>
        </div>
        {/* Arrow */}
        <span className="text-3xl text-pink-400">→</span>
        {/* Expert Content */}
        <div className="flex flex-col items-center">
          <div className="bg-black/30 rounded-full p-4 flex flex-col items-center shadow-lg">
            <span className="text-4xl mb-2" role="img" aria-label="content">
              <Image
                src="/file.svg"
                alt="Expert Content"
                width={40}
                height={40}
                className="mb-2"
                style={{ filter: "invert(80%)" }}
              />
            </span>
            <span className="text-sm font-semibold text-purple-300">
              Expert Content
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
