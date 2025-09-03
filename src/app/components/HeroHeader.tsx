export default function HeroHeader() {
  return (
    <div className="w-full flex flex-col items-center justify-center py-16 px-4 relative overflow-hidden">
      <h1 className="text-5xl md:text-7xl font-extrabold text-center mb-6 bg-gradient-to-r from-blue-400 via-cyan-300 to-pink-400 bg-clip-text text-transparent drop-shadow-xl">
        Autonomous AI for
        <br />
        Technical Web3 Content
      </h1>
      <p className="text-lg md:text-2xl text-center text-gray-200 max-w-3xl mx-auto mt-2 drop-shadow">
        Harness agentic AI to automate expert-level writing and research with
        unprecedented accuracy in the decentralized web space.
      </p>
    </div>
  );
}
