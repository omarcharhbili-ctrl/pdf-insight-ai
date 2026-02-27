import { useState } from "react";
import { Plus, MessageSquare, Trash2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatSession {
  id: string;
  name: string;
  date: string;
}

interface AppSidebarProps {
  sessions: ChatSession[];
  activeSession: string | null;
  onSelectSession: (id: string) => void;
  onNewSession: () => void;
  onDeleteSession: (id: string) => void;
}

const AppSidebar = ({ sessions, activeSession, onSelectSession, onNewSession, onDeleteSession }: AppSidebarProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <aside className="w-[260px] h-screen flex flex-col border-r border-border bg-sidebar shrink-0">
      {/* Logo */}
      <div className="px-5 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-card">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-[15px] font-heading font-bold tracking-tight text-foreground leading-none">DocuMind</span>
            <span className="text-[10px] text-muted-foreground font-medium mt-0.5">Document Intelligence</span>
          </div>
        </div>
      </div>

      {/* New Chat Button */}
      <div className="p-3">
        <button
          onClick={onNewSession}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-all duration-200 text-[13px] font-semibold shadow-card"
        >
          <Plus className="w-4 h-4" />
          <span>New Analysis</span>
        </button>
      </div>

      {/* Sessions List */}
      <div className="flex-1 overflow-y-auto px-3 pb-3">
        {sessions.length > 0 && (
          <p className="text-[11px] text-muted-foreground uppercase tracking-wide px-2 py-2 font-semibold">
            Recent
          </p>
        )}
        <AnimatePresence>
          {sessions.map((session) => (
            <motion.button
              key={session.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              onClick={() => onSelectSession(session.id)}
              onMouseEnter={() => setHoveredId(session.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-all duration-150 group mb-0.5 ${
                activeSession === session.id
                  ? "bg-secondary text-foreground font-medium shadow-card"
                  : "text-sidebar-foreground hover:text-foreground hover:bg-secondary/60"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 shrink-0 opacity-50" />
              <span className="truncate flex-1 text-left">{session.name}</span>
              {hoveredId === session.id && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteSession(session.id);
                  }}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </motion.span>
              )}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary/70" />
          <p className="text-[11px] text-muted-foreground font-medium">All systems online</p>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
