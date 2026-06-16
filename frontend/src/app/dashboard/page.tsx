"use client";

import { useState } from "react";
import { 
  Sparkles, 
  Calendar, 
  Mail, 
  CheckSquare, 
  FolderOpen, 
  MessageSquare, 
  BarChart3, 
  RefreshCw,
  LogOut,
  Bell,
  Search,
  User,
  AlertTriangle
} from "lucide-react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [syncStatus, setSyncStatus] = useState("Idle"); // Idle, Syncing, Completed
  
  const handleSync = () => {
    setSyncStatus("Syncing");
    setTimeout(() => {
      setSyncStatus("Completed");
      setTimeout(() => setSyncStatus("Idle"), 3000);
    }, 4000);
  };

  const navItems = [
    { id: "dashboard", label: "Daily Briefing", icon: Sparkles },
    { id: "inbox", label: "Gmail Summary", icon: Mail },
    { id: "calendar", label: "Calendar Conflicts", icon: Calendar },
    { id: "tasks", label: "Prioritized Tasks", icon: CheckSquare },
    { id: "chat", label: "AI Copilot Chat", icon: MessageSquare },
    { id: "knowledge", label: "RAG Knowledge Base", icon: FolderOpen },
    { id: "analytics", label: "Productivity", icon: BarChart3 },
  ];

  return (
    <div className="flex h-screen bg-[#070A13] overflow-hidden text-slate-100 font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-white/5 bg-[#0B0F19] flex flex-col justify-between p-4 z-20">
        <div className="flex flex-col gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2 px-2 py-1">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="font-outfit text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-primary bg-clip-text text-transparent">
              AgentOS
            </span>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? "bg-primary text-white shadow-lg shadow-primary/15" 
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User / Logout */}
        <div className="flex flex-col gap-3 border-t border-white/5 pt-4">
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center border border-white/10">
              <User className="w-4 h-4 text-slate-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-white">AgentOS User</span>
              <span className="text-[10px] text-slate-500">user@example.com</span>
            </div>
          </div>
          <a 
            href="/"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-500 hover:text-accent-danger hover:bg-accent-danger/5 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </a>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        
        {/* Glow behind main content */}
        <div className="absolute top-[10%] right-[15%] w-[450px] h-[450px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

        {/* Top Header */}
        <header className="h-16 border-b border-white/5 bg-[#0B0F19]/50 backdrop-blur-md px-8 flex items-center justify-between z-10">
          <div className="flex items-center gap-3 w-72">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search mail, tasks, documents..."
                className="w-full bg-white/[0.02] border border-white/5 focus:border-primary/30 rounded-xl py-2 pl-9 pr-4 text-xs text-slate-300 placeholder-slate-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Sync Trigger Button */}
            <button
              onClick={handleSync}
              disabled={syncStatus === "Syncing"}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border border-white/5 transition-all ${
                syncStatus === "Syncing" 
                  ? "bg-primary/10 text-primary cursor-not-allowed" 
                  : "bg-white/[0.03] text-slate-200 hover:bg-white/[0.07] hover:text-white"
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${syncStatus === "Syncing" ? "animate-spin" : ""}`} />
              {syncStatus === "Syncing" ? "Running Multi-Agent Sync..." : "Sync Now"}
            </button>

            {/* Notification bell stub */}
            <button className="w-9 h-9 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] flex items-center justify-center text-slate-400 hover:text-slate-200">
              <Bell className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Dashboard Content Container */}
        <main className="flex-1 overflow-y-auto p-8 z-10">
          {/* Main heading */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-outfit text-2xl font-bold text-white mb-1">
                {navItems.find(item => item.id === activeTab)?.label}
              </h2>
              <p className="text-slate-500 text-xs">
                Welcome to AgentOS Workspace. You are in planning phase skeleton mode.
              </p>
            </div>
            
            {syncStatus === "Completed" && (
              <div className="px-4 py-2 bg-accent/10 border border-accent/20 text-accent rounded-xl text-xs font-medium animate-fade-in">
                Multi-agent sync completed! Data updated.
              </div>
            )}
          </div>

          {/* Conditionally display tab contents */}
          {activeTab === "dashboard" ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column: Briefing & Multi-Agent status */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                
                {/* Daily Briefing Card */}
                <div className="glass-panel p-6 rounded-3xl glow-indigo relative overflow-hidden">
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                      <span className="font-outfit font-bold text-white">Daily Digest Briefing</span>
                    </div>
                    <span className="text-[10px] text-slate-500 bg-white/[0.03] px-2.5 py-1 rounded-full border border-white/5">
                      Updated Today, 8:30 AM
                    </span>
                  </div>
                  <article className="prose prose-invert text-xs text-slate-400 leading-relaxed space-y-4">
                    <h3 className="text-white text-sm font-semibold">Good Morning, AgentOS User!</h3>
                    <p>
                      Today is <strong>Tuesday, June 16, 2026</strong>. Here is what you need to focus on today based on your unified digital inputs.
                    </p>
                    <div className="bg-white/[0.01] border border-white/5 p-4 rounded-2xl flex flex-col gap-2">
                      <h4 className="text-white text-xs font-bold flex items-center gap-1.5 text-accent-warning">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        Important Inbox Flag
                      </h4>
                      <p className="text-[11px]">
                        We detected an email from <em>investors@venture.com</em> regarding the seed funding round term sheet. Your coordinator agent notes this needs immediate feedback today.
                      </p>
                    </div>
                    <p>
                      You have <strong>3 calendar meetings</strong> scheduled, including a sync with the development team at 2:00 PM. No scheduling conflicts were detected by the CalendarAgent.
                    </p>
                    <p>
                      The TaskAgent has generated <strong>4 actionable tasks</strong> from your email inbox stubs and sorted them in your Eisenhower matrix dashboard.
                    </p>
                  </article>
                </div>

                {/* Multi Agent Execution Logs visualizer mockup */}
                <div className="glass-panel p-6 rounded-3xl">
                  <h3 className="font-outfit font-bold text-white text-sm mb-4">Multi-Agent Engine Pipeline</h3>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between text-[11px] border-b border-white/5 pb-2">
                      <span className="text-slate-400">Agent Name</span>
                      <span className="text-slate-400">Status</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <div className="w-2 h-2 rounded-full bg-accent" />
                        <span className="font-medium text-white">CoordinatorAgent</span>
                      </div>
                      <span className="text-slate-500">Idle (Awaiting sync)</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <div className="w-2 h-2 rounded-full bg-accent" />
                        <span className="font-medium text-white">EmailAgent</span>
                      </div>
                      <span className="text-slate-500">Idle (Awaiting sync)</span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <div className="w-2 h-2 rounded-full bg-accent" />
                        <span className="font-medium text-white">CalendarAgent</span>
                      </div>
                      <span className="text-slate-500">Idle (Awaiting sync)</span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <div className="w-2 h-2 rounded-full bg-accent" />
                        <span className="font-medium text-white">TaskAgent</span>
                      </div>
                      <span className="text-slate-500">Idle (Awaiting sync)</span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <div className="w-2 h-2 rounded-full bg-accent" />
                        <span className="font-medium text-white">BriefingAgent</span>
                      </div>
                      <span className="text-slate-500">Idle (Awaiting sync)</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Mini Stats and Quick Add */}
              <div className="flex flex-col gap-6">
                
                {/* Metric Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass-panel p-4 rounded-2xl flex flex-col gap-2">
                    <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Emails Synced</span>
                    <span className="text-2xl font-outfit font-extrabold text-white">124</span>
                  </div>
                  <div className="glass-panel p-4 rounded-2xl flex flex-col gap-2">
                    <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Pending Tasks</span>
                    <span className="text-2xl font-outfit font-extrabold text-primary">8</span>
                  </div>
                  <div className="glass-panel p-4 rounded-2xl flex flex-col gap-2">
                    <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Meetings Today</span>
                    <span className="text-2xl font-outfit font-extrabold text-secondary">3</span>
                  </div>
                  <div className="glass-panel p-4 rounded-2xl flex flex-col gap-2">
                    <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Knowledge Files</span>
                    <span className="text-2xl font-outfit font-extrabold text-accent">5</span>
                  </div>
                </div>

                {/* Calendar Preview Card */}
                <div className="glass-panel p-6 rounded-3xl">
                  <h3 className="font-outfit font-bold text-white text-sm mb-4">Today's Calendar</h3>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/[0.02] transition">
                      <div className="text-xs text-primary font-semibold w-12 pt-0.5">10:00 AM</div>
                      <div className="flex-1">
                        <h4 className="text-xs font-semibold text-white">Design System Alignment</h4>
                        <p className="text-[10px] text-slate-500">Google Meet (1h)</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/[0.02] transition">
                      <div className="text-xs text-secondary font-semibold w-12 pt-0.5">2:00 PM</div>
                      <div className="flex-1">
                        <h4 className="text-xs font-semibold text-white">Daily dev standup</h4>
                        <p className="text-[10px] text-slate-500">Conference Room B (30m)</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/[0.02] transition">
                      <div className="text-xs text-slate-400 w-12 pt-0.5">4:30 PM</div>
                      <div className="flex-1">
                        <h4 className="text-xs font-semibold text-white">Weekly Review & Checkin</h4>
                        <p className="text-[10px] text-slate-500">Google Meet (45m)</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          ) : (
            /* General Skeleton placeholder for other tabs */
            <div className="glass-panel p-8 rounded-3xl flex flex-col items-center justify-center text-center py-20 min-h-[400px]">
              <Sparkles className="w-12 h-12 text-slate-600 animate-pulse mb-4" />
              <h3 className="font-outfit font-bold text-white text-lg mb-1">
                {navItems.find(item => item.id === activeTab)?.label} Stub Screen
              </h3>
              <p className="text-slate-500 text-xs max-w-sm mb-6">
                This feature matches Phase 2 - 5 of the roadmap. The backend APIs are declared as router skeletons, ready for integration.
              </p>
              <button 
                onClick={() => setActiveTab("dashboard")}
                className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-xl transition"
              >
                Return to Daily Briefing
              </button>
            </div>
          )}
        </main>
      </div>

    </div>
  );
}
