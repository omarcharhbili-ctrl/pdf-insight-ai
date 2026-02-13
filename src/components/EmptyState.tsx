import { useRef } from "react";
import { motion } from "framer-motion";
import { Zap, FileSearch, MessageSquareText, BarChart3 } from "lucide-react";
import PDFUploadZone from "./PDFUploadZone";
import type { ViewTab } from "./ViewTabs";

interface EmptyStateProps {
  onFileSelect: (file: File, tab?: ViewTab) => void;
}

const features: { icon: React.ReactNode; title: string; desc: string; tab: ViewTab }[] = [
  { icon: <FileSearch className="w-5 h-5" />, title: "Smart Summaries", desc: "Instant key-point extraction", tab: "summary" },
  { icon: <MessageSquareText className="w-5 h-5" />, title: "Document Chat", desc: "Ask anything about your PDF", tab: "chat" },
  { icon: <BarChart3 className="w-5 h-5" />, title: "Visual Insights", desc: "Auto-generated diagrams", tab: "visuals" },
];

const EmptyState = ({ onFileSelect }: EmptyStateProps) => {
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleFeatureClick = (index: number) => {
    fileInputRefs.current[index]?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, tab: ViewTab) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file, tab);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-lg w-full space-y-8"
      >
        {/* Hero */}
        <div className="text-center space-y-3">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.3 }}
            className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto glow-sm"
          >
            <Zap className="w-7 h-7 text-primary" />
          </motion.div>
          <h1 className="text-3xl font-bold tracking-tight text-gradient">DocuMind</h1>
          <p className="text-muted-foreground text-sm max-w-sm mx-auto">
            Upload a PDF to unlock AI-powered summaries, conversations, and visual insights.
          </p>
        </div>

        {/* Upload */}
        <PDFUploadZone onFileSelect={(file) => onFileSelect(file)} uploadedFile={null} onRemoveFile={() => {}} />

        {/* Features */}
        <div className="grid grid-cols-3 gap-3">
          {features.map((f, i) => (
            <motion.button
              key={f.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              onClick={() => handleFeatureClick(i)}
              className="text-center p-4 rounded-xl bg-secondary/30 border border-border hover:border-primary/30 hover:bg-secondary/50 hover:glow-sm transition-all duration-200 cursor-pointer"
            >
              <input
                ref={(el) => { fileInputRefs.current[i] = el; }}
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => handleFileChange(e, f.tab)}
              />
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-2">
                {f.icon}
              </div>
              <p className="text-xs font-semibold text-foreground">{f.title}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{f.desc}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default EmptyState;
