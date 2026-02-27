import { motion } from "framer-motion";
import { MessageSquare, FileText, BarChart3 } from "lucide-react";

export type ViewTab = "chat" | "summary" | "visuals";

interface ViewTabsProps {
  active: ViewTab;
  onChange: (tab: ViewTab) => void;
}

const tabs: { id: ViewTab; label: string; icon: React.ReactNode }[] = [
  { id: "chat", label: "Chat", icon: <MessageSquare className="w-4 h-4" /> },
  { id: "summary", label: "Summary", icon: <FileText className="w-4 h-4" /> },
  { id: "visuals", label: "Visuals", icon: <BarChart3 className="w-4 h-4" /> },
];

const ViewTabs = ({ active, onChange }: ViewTabsProps) => (
  <div className="flex gap-1 p-1 rounded-xl bg-secondary/60 border border-border">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => onChange(tab.id)}
        className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium transition-colors duration-150 ${
          active === tab.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {active === tab.id && (
          <motion.div
            layoutId="activeTab"
            className="absolute inset-0 bg-card rounded-lg shadow-card border border-border"
            transition={{ type: "spring", bounce: 0.12, duration: 0.35 }}
          />
        )}
        <span className="relative z-10 flex items-center gap-2">
          {tab.icon}
          {tab.label}
        </span>
      </button>
    ))}
  </div>
);

export default ViewTabs;
