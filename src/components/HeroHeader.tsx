import WorkflowDiagram from "./WorkflowDiagram";

export default function HeroHeader() {
  return (
    <div className="w-full flex flex-col items-center justify-center py-10 px-4 relative overflow-hidden">
      {/* Background image */}
      <img
        src="/bg.png"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 pointer-events-none select-none"
        aria-hidden="true"
      />
      <h2 className="relative z-10 text-5xl md:text-7xl font-extrabold text-center mb-6 bg-gradient-to-r from-blue-400 via-cyan-300 to-pink-400 bg-clip-text text-transparent drop-shadow-xl">
        Autonomous AI for
        <br />
        Technical Web3 Content
      </h2>
      <p className="relative z-10 text-lg md:text-2xl text-center text-gray-200 max-w-3xl mx-auto mt-2 drop-shadow">
        Harness agentic AI to automate expert-level writing and research with
        unprecedented accuracy in the decentralized web space.
      </p>
      <WorkflowDiagram/>
    </div>
  );
}
