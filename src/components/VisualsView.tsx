import { motion } from "framer-motion";
import { GitBranch, Map, PieChart, Network } from "lucide-react";

const cards = [
  {
    icon: <GitBranch className="w-3.5 h-3.5" />,
    title: "Concept Roadmap",
    description: "Structured roadmap of core ideas and their connections.",
    status: "Ready",
  },
  {
    icon: <Network className="w-3.5 h-3.5" />,
    title: "Knowledge Graph",
    description: "Node graph showing relationships between key entities.",
    status: "Ready",
  },
  {
    icon: <PieChart className="w-3.5 h-3.5" />,
    title: "Topic Distribution",
    description: "Breakdown of topics and themes across the document.",
    status: "Ready",
  },
  {
    icon: <Map className="w-3.5 h-3.5" />,
    title: "Flow Diagram",
    description: "Process flow extracted from procedural sections.",
    status: "Ready",
  },
];

const VisualsView = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex-1 overflow-y-auto p-5 max-w-4xl"
  >
    <div className="space-y-3">
      <div>
        <h3 className="text-[13px] font-semibold text-foreground">Generated Visuals</h3>
        <p className="text-[11px] text-muted-foreground mt-0.5">AI-generated diagrams and visualizations from your document</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="group p-3.5 rounded-xl bg-secondary/40 border border-border hover:border-primary/15 transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="w-7 h-7 rounded-md bg-primary/8 text-primary flex items-center justify-center group-hover:bg-primary/12 transition-colors">
                {card.icon}
              </div>
              <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-secondary border border-border text-muted-foreground mono">
                {card.status}
              </span>
            </div>
            <h4 className="text-[13px] font-medium text-foreground mb-0.5">{card.title}</h4>
            <p className="text-[11px] text-muted-foreground leading-relaxed">{card.description}</p>

            {/* Placeholder */}
            <div className="mt-2.5 h-24 rounded-lg bg-background/60 border border-border flex items-center justify-center">
              <span className="text-[10px] text-muted-foreground">Click to generate</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

export default VisualsView;
