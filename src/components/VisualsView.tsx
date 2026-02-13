import { motion } from "framer-motion";
import { GitBranch, Map, PieChart, Network } from "lucide-react";

const cards = [
  {
    icon: <GitBranch className="w-5 h-5" />,
    title: "Concept Roadmap",
    description: "A structured roadmap of the document's core ideas and how they connect.",
    status: "Ready",
  },
  {
    icon: <Network className="w-5 h-5" />,
    title: "Knowledge Graph",
    description: "Interactive node graph showing relationships between key entities.",
    status: "Ready",
  },
  {
    icon: <PieChart className="w-5 h-5" />,
    title: "Topic Distribution",
    description: "Breakdown of topics and themes covered throughout the document.",
    status: "Ready",
  },
  {
    icon: <Map className="w-5 h-5" />,
    title: "Flow Diagram",
    description: "Step-by-step process flow extracted from procedural sections.",
    status: "Ready",
  },
];

const VisualsView = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex-1 overflow-y-auto p-6"
  >
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-foreground">Generated Visuals</h3>
        <p className="text-sm text-muted-foreground mt-1">AI-generated diagrams and visualizations from your document</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="group p-5 rounded-2xl bg-secondary/50 border border-border hover:border-primary/20 hover:glow-sm transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                {card.icon}
              </div>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                {card.status}
              </span>
            </div>
            <h4 className="text-sm font-semibold text-foreground mb-1">{card.title}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">{card.description}</p>

            {/* Placeholder visual */}
            <div className="mt-4 h-32 rounded-xl bg-background/50 border border-border flex items-center justify-center">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                {card.icon}
                <span className="text-[11px]">Click to generate</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

export default VisualsView;
