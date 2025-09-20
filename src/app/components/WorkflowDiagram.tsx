import { FileSearch, BarChart3, PenTool, BookOpen } from "lucide-react";

const steps = [
  {
    key: "research",
    label: "Research Agent",
    icon: <FileSearch size={28} className="text-white" />,
    textClass: "text-white",
    bgClass: "bg-black/70",
  },
  {
    key: "analysis",
    label: "Analysis Agent",
    icon: <BarChart3 size={28} className="text-cyan-300" />,
    textClass: "text-cyan-300",
    bgClass: "bg-black/70",
  },
  {
    key: "writing",
    label: "Writing Agent",
    icon: <PenTool size={28} className="text-pink-400" />,
    textClass: "text-pink-400",
    bgClass: "bg-black/70",
  },
  {
    key: "content",
    label: "Expert Content",
    icon: <BookOpen size={28} className="text-purple-300" />,
    textClass: "text-purple-300",
    bgClass: "bg-black/70",
  },
];

const arrows = ["text-purple-400", "text-cyan-300", "text-pink-400"];

export default function WorkflowDiagram() {
  return (
    <div className="w-full flex flex-col items-center py-4 px-4">
      <div className="flex flex-col items-center justify-center gap-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-inner">
        <div className="text-3xl py-2 font-bold">
          Multi Agent Workflow
        </div>
        <div className="flex flex-row items-center justify-center gap-8">
          {steps.map((step, idx) => (
            <div key={step.key} className="flex flex-row items-center gap-6">
              <div
                className={`flex flex-col items-center justify-center gap-2 ${step.bgClass} rounded-xl p-4 min-w-[110px]`}
              >
                <div className="flex items-center justify-center w-12 h-12">
                  {step.icon}
                </div>
                <span
                  className={`text-sm font-medium text-center ${step.textClass}`}
                >
                  {step.label}
                </span>
              </div>
              {idx < arrows.length && (
                <span className={`text-3xl ${arrows[idx]}`}>→</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
