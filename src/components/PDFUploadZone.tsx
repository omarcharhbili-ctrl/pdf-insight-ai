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
        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-card border border-border shadow-card"
      >
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
          <FileText className="w-4 h-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-foreground truncate">{uploadedFile.name}</p>
          <p className="text-[11px] text-muted-foreground">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
        </div>
        <button onClick={onRemoveFile} className="text-muted-foreground hover:text-destructive transition-colors p-1.5 rounded-lg hover:bg-destructive/10">
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center"
    >
      <label
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative w-full cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-250 p-8 flex flex-col items-center gap-3 ${
          isDragging
            ? "border-primary bg-primary/5 glow-sm"
            : "border-border hover:border-primary/40 hover:bg-secondary/40"
        }`}
      >
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileInput}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        <motion.div
          animate={isDragging ? { scale: 1.08, rotate: 2 } : { scale: 1, rotate: 0 }}
          className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"
        >
          <Upload className="w-5 h-5 text-primary" />
        </motion.div>
        <div className="text-center">
          <p className="text-[14px] font-semibold text-foreground">
            Drop your PDF here
          </p>
          <p className="text-[12px] text-muted-foreground mt-0.5">
            or <span className="text-primary font-semibold cursor-pointer hover:underline">browse files</span>
          </p>
        </div>
      </label>
    </motion.div>
  );
};

export default PDFUploadZone;
