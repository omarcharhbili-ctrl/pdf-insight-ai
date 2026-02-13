import { useState, useRef, useEffect } from "react";
import AppSidebar from "@/components/AppSidebar";
import EmptyState from "@/components/EmptyState";
import PDFUploadZone from "@/components/PDFUploadZone";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import ViewTabs, { ViewTab } from "@/components/ViewTabs";
import SummaryView from "@/components/SummaryView";
import VisualsView from "@/components/VisualsView";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Session {
  id: string;
  name: string;
  date: string;
  file: File | null;
  messages: Message[];
}

const INITIAL_RESPONSE = `I've analyzed your document. Here's what I found:

**Key Topics Identified:**
- Modern data architecture patterns
- Event-driven systems and real-time processing
- Hybrid batch/stream processing frameworks

Feel free to ask me anything about the content — I can explain concepts, find specific sections, or provide deeper analysis on any topic covered in the document.`;

const Index = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ViewTab>("chat");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeSession = sessions.find((s) => s.id === activeSessionId) || null;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeSession?.messages]);

  const createSession = (file: File, tab?: ViewTab) => {
    const newSession: Session = {
      id: crypto.randomUUID(),
      name: file.name.replace(".pdf", ""),
      date: new Date().toLocaleDateString(),
      file,
      messages: [{ role: "assistant", content: INITIAL_RESPONSE }],
    };
    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
    setActiveTab(tab || "chat");
  };

  const handleNewSession = () => {
    setActiveSessionId(null);
  };

  const handleDeleteSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    if (activeSessionId === id) setActiveSessionId(null);
  };

  const handleSend = (message: string) => {
    if (!activeSession) return;
    const updated = sessions.map((s) => {
      if (s.id !== activeSessionId) return s;
      return {
        ...s,
        messages: [
          ...s.messages,
          { role: "user" as const, content: message },
          {
            role: "assistant" as const,
            content: `That's a great question about your document. Based on my analysis of **${s.name}**, I can provide some insights on that topic.\n\nThe document discusses this in detail across several sections. Would you like me to dive deeper into any specific aspect?`,
          },
        ],
      };
    });
    setSessions(updated);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar
        sessions={sessions.map((s) => ({ id: s.id, name: s.name, date: s.date }))}
        activeSession={activeSessionId}
        onSelectSession={setActiveSessionId}
        onNewSession={handleNewSession}
        onDeleteSession={handleDeleteSession}
      />

      <main className="flex-1 flex flex-col min-w-0">
        {!activeSession ? (
          <EmptyState onFileSelect={createSession} />
        ) : (
          <>
            {/* Top Bar */}
            <header className="flex items-center justify-between px-6 py-3 border-b border-border shrink-0">
              <div className="flex items-center gap-3">
                <PDFUploadZone
                  onFileSelect={(file) => {
                    setSessions((prev) =>
                      prev.map((s) => (s.id === activeSessionId ? { ...s, file, name: file.name.replace(".pdf", "") } : s))
                    );
                  }}
                  uploadedFile={activeSession.file}
                  onRemoveFile={handleNewSession}
                />
              </div>
              <ViewTabs active={activeTab} onChange={setActiveTab} />
            </header>

            {/* Content */}
            {activeTab === "chat" && (
              <div className="flex-1 flex flex-col min-h-0">
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                  {activeSession.messages.map((msg, i) => (
                    <ChatMessage key={i} role={msg.role} content={msg.content} />
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                <div className="px-6 pb-4 pt-2 shrink-0">
                  <ChatInput onSend={handleSend} />
                </div>
              </div>
            )}

            {activeTab === "summary" && <SummaryView fileName={activeSession.name} />}
            {activeTab === "visuals" && <VisualsView />}
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
