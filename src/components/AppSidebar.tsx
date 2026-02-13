import { useState } from "react";
import { FileText, Plus, MessageSquare, Trash2 } from "lucide-react";
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
    <aside className="w-72 h-screen flex flex-col border-r border-border bg-sidebar shrink-0">
      {/* Logo */}
      <div className="p-5 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center glow-sm">
            <FileText className="w-4 h-4 text-primary" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-foreground">DocuMind</span>
        </div>
      </div>

      {/* New Chat Button */}
      <div className="p-3">
        <button
          onClick={onNewSession}
          className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-lg border border-border hover:border-primary/30 hover:glow-sm transition-all duration-200 text-sm text-muted-foreground hover:text-foreground"
        >
          <Plus className="w-4 h-4" />
          <span>New Analysis</span>
        </button>
      </div>

      {/* Sessions List */}
      <div className="flex-1 overflow-y-auto px-3 pb-3">
        <p className="text-xs text-muted-foreground uppercase tracking-wider px-3 py-2 font-medium">Recent</p>
        <AnimatePresence>
          {sessions.map((session) => (
            <motion.button
              key={session.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              onClick={() => onSelectSession(session.id)}
              onMouseEnter={() => setHoveredId(session.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 group mb-0.5 ${
                activeSession === session.id
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate flex-1 text-left">{session.name}</span>
              {hoveredId === session.id && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteSession(session.id);
                  }}
                  className="text-muted-foreground hover:text-destructive"
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
        <p className="text-xs text-muted-foreground">DocuMind v1.0</p>
      </div>
    </aside>
  );
};

export default AppSidebar;
