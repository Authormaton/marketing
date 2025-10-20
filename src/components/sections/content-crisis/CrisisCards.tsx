import type { ReactNode } from "react";
import { FragmentedKnowledgeIcon, ExpertBottlenecksIcon, QualityInconsistencyIcon, TimeIntensiveProcessIcon } from "./CrisisIcons";

interface CrisisCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function CrisisCard({ icon, title, description }: CrisisCardProps) {
  return (
    <div className="min-w-[280px] bg-[#121225] p-6 rounded-lg border border-[#252542] shadow-lg flex-grow">
      <div className="bg-[#18162A] w-16 h-16 rounded-lg flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

export function CrisisCardsGrid() {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      <CrisisCard
        icon={<FragmentedKnowledgeIcon className="w-8 h-8 text-red-500" />}
        title="Fragmented Knowledge"
        description="Critical Web3 information scattered across countless sources, making comprehensive research nearly impossible."
      />
      <CrisisCard
        icon={<ExpertBottlenecksIcon className="w-8 h-8 text-red-500" />}
        title="Expert Bottlenecks"
        description="Limited subject matter experts create massive delays in producing high-quality technical content."
      />
      <CrisisCard
        icon={<QualityInconsistencyIcon className="w-8 h-8 text-red-500" />}
        title="Quality Inconsistency"
        description="Manual processes lead to varying content quality and accuracy, risking credibility in technical communities."
      />
      <CrisisCard
        icon={<TimeIntensiveProcessIcon className="w-8 h-8 text-red-500" />}
        title="Time-Intensive Process"
        description="Traditional content creation takes weeks or months, slowing down innovation and decision-making."
      />
    </div>
  );
}
