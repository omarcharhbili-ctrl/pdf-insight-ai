import { motion } from "framer-motion";
import { GitBranch, Map, PieChart, Network } from "lucide-react";

const cards = [
  {
    icon: <GitBranch className="w-4 h-4" />,
    title: "Concept Roadmap",
    description: "Structured roadmap of core ideas and their connections.",
    status: "Ready",
  },
  {
    icon: <Network className="w-4 h-4" />,
    title: "Knowledge Graph",
    description: "Node graph showing relationships between key entities.",
    status: "Ready",
  },
  {
    icon: <PieChart className="w-4 h-4" />,
    title: "Topic Distribution",
    description: "Breakdown of topics and themes across the document.",
    status: "Ready",
  },
  {
    icon: <Map className="w-4 h-4" />,
    title: "Flow Diagram",
    description: "Process flow extracted from procedural sections.",
    status: "Ready",
  },
];

const VisualsView = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex-1 overflow-y-auto p-6 max-w-4xl"
  >
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-foreground">Generated Visuals</h3>
        <p className="text-xs text-muted-foreground mt-1">AI-generated diagrams and visualizations from your document</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="group p-4 rounded-xl bg-secondary/40 border border-border hover:border-primary/15 transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-primary/8 text-primary flex items-center justify-center group-hover:bg-primary/12 transition-colors">
                {card.icon}
              </div>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-secondary border border-border text-muted-foreground mono">
                {card.status}
              </span>
            </div>
            <h4 className="text-sm font-medium text-foreground mb-1">{card.title}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">{card.description}</p>

            {/* Placeholder */}
            <div className="mt-3 h-28 rounded-lg bg-background/60 border border-border flex items-center justify-center">
              <span className="text-[11px] text-muted-foreground">Click to generate</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

export default VisualsView;
