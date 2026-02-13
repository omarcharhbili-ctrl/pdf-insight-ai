import { useState, useCallback } from "react";
import { Upload, FileText, X } from "lucide-react";
import { motion } from "framer-motion";

interface PDFUploadZoneProps {
  onFileSelect: (file: File) => void;
  uploadedFile: File | null;
  onRemoveFile: () => void;
}

const PDFUploadZone = ({ onFileSelect, uploadedFile, onRemoveFile }: PDFUploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(e.type === "dragenter" || e.type === "dragover");
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file?.type === "application/pdf") onFileSelect(file);
  }, [onFileSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  }, [onFileSelect]);

  if (uploadedFile) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary/60 border border-border"
      >
        <div className="w-9 h-9 rounded-lg bg-primary/8 flex items-center justify-center">
          <FileText className="w-4 h-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">{uploadedFile.name}</p>
          <p className="text-[11px] text-muted-foreground mono">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
        </div>
        <button onClick={onRemoveFile} className="text-muted-foreground hover:text-destructive transition-colors p-1 rounded-md hover:bg-destructive/10">
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center"
    >
      <label
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative w-full cursor-pointer rounded-xl border border-dashed transition-all duration-200 p-8 flex flex-col items-center gap-3 ${
          isDragging
            ? "border-primary/50 bg-primary/5 glow-sm"
            : "border-border hover:border-muted-foreground/30 hover:bg-secondary/20"
        }`}
      >
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileInput}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        <motion.div
          animate={isDragging ? { scale: 1.05 } : { scale: 1 }}
          className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center"
        >
          <Upload className="w-5 h-5 text-muted-foreground" />
        </motion.div>
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">
            Drop your PDF here
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            or <span className="text-primary font-medium">browse files</span>
          </p>
        </div>
      </label>
    </motion.div>
  );
};

export default PDFUploadZone;
