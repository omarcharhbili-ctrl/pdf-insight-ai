import { useState } from "react";
import { Plus, MessageSquare, Trash2, Zap } from "lucide-react";
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
    <aside className="w-[240px] h-screen flex flex-col border-r border-border bg-sidebar shrink-0">
      {/* Logo */}
      <div className="px-4 py-3.5 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-semibold tracking-tight text-foreground leading-none">DocuMind</span>
            <span className="text-[9px] text-muted-foreground font-medium tracking-wider uppercase mt-0.5">Intelligence</span>
          </div>
        </div>
      </div>

      {/* New Chat Button */}
      <div className="p-2.5">
        <button
          onClick={onNewSession}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/15 hover:border-primary/30 transition-all duration-200 text-[13px] font-medium text-primary"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Analysis</span>
        </button>
      </div>

      {/* Sessions List */}
      <div className="flex-1 overflow-y-auto px-2.5 pb-2.5">
        {sessions.length > 0 && (
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.1em] px-2.5 py-2 font-medium">
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
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[12px] transition-all duration-150 group mb-px ${
                activeSession === session.id
                  ? "bg-secondary text-foreground"
                  : "text-sidebar-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              <MessageSquare className="w-3 h-3 shrink-0 opacity-50" />
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
                  <Trash2 className="w-3 h-3" />
                </motion.span>
              )}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-border">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
          <p className="text-[10px] text-muted-foreground">Systems operational</p>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
