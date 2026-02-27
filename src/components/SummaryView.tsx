import { motion } from "framer-motion";
import { Sparkles, Clock, BookOpen } from "lucide-react";

interface SummaryViewProps {
  fileName: string;
}

const SummaryView = ({ fileName }: SummaryViewProps) => {
  const summary = {
    title: fileName.replace(".pdf", ""),
    readTime: "8 min read",
    pages: 24,
    keyPoints: [
      "The document outlines a comprehensive framework for modern data architecture patterns.",
      "Key emphasis on event-driven systems and real-time processing pipelines.",
      "Includes case studies from three Fortune 500 implementations.",
      "Proposes a hybrid approach combining batch and stream processing.",
    ],
    tags: ["Architecture", "Data Engineering", "Real-time Systems"],
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="flex-1 overflow-y-auto p-6 max-w-3xl"
    >
      <div className="space-y-5">
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/10 text-primary text-[11px] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Generated Summary
          </div>
          <h2 className="text-xl font-heading font-bold text-foreground tracking-tight">{summary.title}</h2>
          <div className="flex items-center gap-4 text-[12px] text-muted-foreground">
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{summary.readTime}</span>
            <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" />{summary.pages} pages</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {summary.tags.map((tag) => (
            <span key={tag} className="inline-flex items-center px-2.5 py-1 rounded-lg bg-secondary text-[11px] font-semibold text-secondary-foreground">
              {tag}
            </span>
          ))}
        </div>

        {/* Key Points */}
        <div className="space-y-3">
          <h3 className="text-[12px] font-bold text-muted-foreground uppercase tracking-wide">Key Points</h3>
          <div className="space-y-2">
            {summary.keyPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-3 p-3.5 rounded-xl bg-card border border-border shadow-card"
              >
                <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary text-[11px] font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <p className="text-[13px] text-card-foreground leading-relaxed">{point}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Full Summary */}
        <div className="space-y-3">
          <h3 className="text-[12px] font-bold text-muted-foreground uppercase tracking-wide">Overview</h3>
          <div className="p-4 rounded-xl bg-card border border-border shadow-card">
            <p className="text-[13px] text-card-foreground leading-relaxed">
              This document presents a thorough analysis of modern data architecture paradigms, focusing on the transition
              from traditional batch-oriented systems to event-driven, real-time processing frameworks. The authors propose
              a hybrid "lambda-plus" architecture that maintains the reliability of batch processing while enabling
              sub-second latency for critical data pipelines. Through detailed case studies from financial services,
              e-commerce, and healthcare sectors, the paper demonstrates measurable improvements in data freshness,
              system resilience, and operational efficiency.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SummaryView;
