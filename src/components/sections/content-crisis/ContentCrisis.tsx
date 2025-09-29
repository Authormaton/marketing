import { CrisisCardsGrid } from "./CrisisCards";
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
        <CrisisCardsGrid />
      </div>
    </section>
  );
}
