import Link from "next/link";
import { Sparkles, Calendar, Mail, CheckSquare, FolderOpen, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col justify-between">
      {/* Background ambient glow blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] rounded-full bg-secondary/10 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          <span className="font-outfit text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-primary bg-clip-text text-transparent">
            AgentOS
          </span>
        </div>
        <Link 
          href="/dashboard" 
          className="glass-panel px-5 py-2.5 rounded-xl font-medium text-sm text-slate-200 hover:text-white glass-panel-hover"
        >
          Open App
        </Link>
      </header>

      {/* Main Hero & Features */}
      <main className="flex-1 max-w-7xl mx-auto px-6 flex flex-col justify-center items-center py-16 relative z-10">
        <div className="text-center max-w-3xl mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-panel text-xs text-primary font-medium tracking-wide mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Empowering Productivity with Multi-Agent AI
          </div>
          <h1 className="font-outfit text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            The AI Operating System <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              For Your Workday
            </span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Consolidate your emails, calendar events, tasks, and documents. AgentOS coordinates specialized AI agents to filter, summarize, and prioritize your life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/dashboard"
              className="px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-2xl font-semibold flex items-center gap-2 shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-[1.02]"
            >
              Sign in with Google
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a 
              href="#features"
              className="px-8 py-4 glass-panel text-slate-300 hover:text-white rounded-2xl font-semibold glass-panel-hover"
            >
              Explore Features
            </a>
          </div>
        </div>

        {/* Features Grid */}
        <section id="features" className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          <div className="glass-panel p-6 rounded-3xl glass-panel-hover">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-5 glow-indigo">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-outfit text-lg font-bold text-white mb-2">Email Summarization</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Inbox agents read and summarize emails, extracting important sentiment, context, and core highlights automatically.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl glass-panel-hover">
            <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-5 glow-violet">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="font-outfit text-lg font-bold text-white mb-2">Calendar Conflicts</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Analyze schedules to double-check meeting availability, gaps, travel overlaps, and alert scheduling issues.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl glass-panel-hover">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-5">
              <CheckSquare className="w-6 h-6" />
            </div>
            <h3 className="font-outfit text-lg font-bold text-white mb-2">Task Prioritization</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Extract tasks from communications and sort them into Eisenhower quadrants for high, medium, and low urgency.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl glass-panel-hover">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-300 mb-5">
              <FolderOpen className="w-6 h-6" />
            </div>
            <h3 className="font-outfit text-lg font-bold text-white mb-2">RAG Knowledge Base</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Upload documents, PDF reference guides, and notes, searching them via vector embeddings during assistant chat.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-8 border-t border-white/5 text-center text-slate-500 text-xs relative z-10">
        &copy; {new Date().getFullYear()} AgentOS. Built by Google DeepMind Team. All rights reserved.
      </footer>
    </div>
  );
}
