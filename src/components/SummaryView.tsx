import { motion } from "framer-motion";
import { Sparkles, Clock, BookOpen, Tag } from "lucide-react";

interface SummaryViewProps {
  fileName: string;
}

const SummaryView = ({ fileName }: SummaryViewProps) => {
  // Mock summary data
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
      transition={{ duration: 0.3 }}
      className="flex-1 overflow-y-auto p-6 space-y-6"
    >
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-primary text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          AI-Generated Summary
        </div>
        <h2 className="text-2xl font-semibold text-foreground tracking-tight">{summary.title}</h2>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{summary.readTime}</span>
          <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" />{summary.pages} pages</span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {summary.tags.map((tag) => (
          <span key={tag} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
            <Tag className="w-3 h-3" />
            {tag}
          </span>
        ))}
      </div>

      {/* Key Points */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Key Points</h3>
        <div className="space-y-2">
          {summary.keyPoints.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-3 p-3 rounded-xl bg-secondary/50 border border-border"
            >
              <span className="w-6 h-6 rounded-md bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              <p className="text-sm text-secondary-foreground leading-relaxed">{point}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full Summary */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Overview</h3>
        <div className="p-4 rounded-xl bg-secondary/50 border border-border">
          <p className="text-sm text-secondary-foreground leading-relaxed">
            This document presents a thorough analysis of modern data architecture paradigms, focusing on the transition
            from traditional batch-oriented systems to event-driven, real-time processing frameworks. The authors propose
            a hybrid "lambda-plus" architecture that maintains the reliability of batch processing while enabling
            sub-second latency for critical data pipelines. Through detailed case studies from financial services,
            e-commerce, and healthcare sectors, the paper demonstrates measurable improvements in data freshness,
            system resilience, and operational efficiency. The framework includes practical guidelines for technology
            selection, team structure, and migration strategies.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SummaryView;
