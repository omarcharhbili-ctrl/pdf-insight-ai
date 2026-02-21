import { useRef } from "react";
import { motion } from "framer-motion";
import { Zap, FileSearch, MessageSquareText, BarChart3, ArrowRight } from "lucide-react";
import PDFUploadZone from "./PDFUploadZone";
import type { ViewTab } from "./ViewTabs";

interface EmptyStateProps {
  onFileSelect: (file: File, tab?: ViewTab) => void;
}

const features: { icon: React.ReactNode; title: string; desc: string; tab: ViewTab }[] = [
  { icon: <FileSearch className="w-4 h-4" />, title: "Smart Summaries", desc: "Instant key-point extraction from any document", tab: "summary" },
  { icon: <MessageSquareText className="w-4 h-4" />, title: "Document Chat", desc: "Natural language Q&A over your PDF content", tab: "chat" },
  { icon: <BarChart3 className="w-4 h-4" />, title: "Visual Insights", desc: "Auto-generated diagrams and knowledge graphs", tab: "visuals" },
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
    <div className="flex-1 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="max-w-lg w-full space-y-6"
      >
        {/* Hero */}
        <div className="text-center space-y-3">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring", bounce: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/8 border border-primary/15 text-primary text-[11px] font-medium"
          >
            <Zap className="w-3 h-3" />
            <span>AI-Powered Document Intelligence</span>
          </motion.div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Understand any document<br />
            <span className="text-gradient">in seconds</span>
          </h1>
          <p className="text-muted-foreground text-[13px] max-w-sm mx-auto leading-relaxed">
            Upload a PDF to unlock AI-powered summaries, chat, and visual insights.
          </p>
        </div>

        {/* Upload */}
        <PDFUploadZone onFileSelect={(file) => onFileSelect(file)} uploadedFile={null} onRemoveFile={() => {}} />

        {/* Features */}
        <div className="space-y-1.5">
          {features.map((f, i) => (
            <motion.button
              key={f.title}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08, ease: "easeOut" }}
              onClick={() => handleFeatureClick(i)}
              className="w-full flex items-center gap-3 p-3 rounded-xl bg-secondary/30 border border-border hover:border-primary/20 hover:bg-secondary/50 transition-all duration-200 cursor-pointer group text-left"
            >
              <input
                ref={(el) => { fileInputRefs.current[i] = el; }}
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => handleFileChange(e, f.tab)}
              />
              <div className="w-8 h-8 rounded-lg bg-primary/8 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary/12 transition-colors">
                {f.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-foreground">{f.title}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{f.desc}</p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default EmptyState;
