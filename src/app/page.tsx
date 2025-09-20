
import ContentCrisis from "./components/ContentCrisis";
import Features from "./components/Features";
import HeroHeader from "./components/HeroHeader";
import Navigation from "./components/Navigation";
import WorkflowDiagram from "./components/WorkflowDiagram";

import WritingDemo from "./components/WritingDemo";

import KnowledgeTransform from "./components/KnowledgeTransform";



export default function Home() {
  return (
    <div className="font-sans min-h-screen flex flex-col bg-white dark:bg-gray-950">
      <Navigation />
      <HeroHeader />
      <WorkflowDiagram />
      <ContentCrisis />
      <Features />
      <KnowledgeTransform />
      <WritingDemo />
      <footer
        id="contact"
        className="scroll-mt-24 w-full py-8 px-4 bg-gray-100 dark:bg-gray-900 text-center text-gray-500 dark:text-gray-400 mt-auto"
      >
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </footer>
    </div>
  );
}
