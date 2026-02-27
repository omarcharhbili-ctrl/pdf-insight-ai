import { useRef } from "react";
import { motion } from "framer-motion";
import { FileSearch, MessageSquareText, BarChart3, ArrowRight, Upload } from "lucide-react";
import PDFUploadZone from "./PDFUploadZone";
import type { ViewTab } from "./ViewTabs";

interface EmptyStateProps {
  onFileSelect: (file: File, tab?: ViewTab) => void;
}

const features: { icon: React.ReactNode; title: string; desc: string; tab: ViewTab }[] = [
  { icon: <FileSearch className="w-5 h-5" />, title: "Smart Summaries", desc: "Extract key points and insights instantly", tab: "summary" },
  { icon: <MessageSquareText className="w-5 h-5" />, title: "Document Chat", desc: "Ask questions in natural language", tab: "chat" },
  { icon: <BarChart3 className="w-5 h-5" />, title: "Visual Insights", desc: "Auto-generated diagrams & graphs", tab: "visuals" },
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
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="max-w-xl w-full space-y-8"
      >
        {/* Hero */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring", bounce: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[12px] font-semibold"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload to get started</span>
          </motion.div>
          <h1 className="text-4xl font-heading font-bold tracking-tight text-foreground leading-[1.15]">
            Understand any document<br />
            <span className="text-gradient">in seconds</span>
          </h1>
          <p className="text-muted-foreground text-[15px] max-w-md mx-auto leading-relaxed">
            Drop a PDF and let AI extract summaries, answer questions, and generate visual insights — all automatically.
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
              transition={{ delay: 0.35 + i * 0.1, ease: "easeOut" }}
              onClick={() => handleFeatureClick(i)}
              className="flex flex-col items-center gap-2.5 p-4 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-card-hover transition-all duration-250 cursor-pointer group text-center shadow-card"
            >
              <input
                ref={(el) => { fileInputRefs.current[i] = el; }}
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => handleFileChange(e, f.tab)}
              />
              <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                {f.icon}
              </div>
              <div>
                <p className="text-[13px] font-semibold text-foreground">{f.title}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{f.desc}</p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-200" />
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default EmptyState;
