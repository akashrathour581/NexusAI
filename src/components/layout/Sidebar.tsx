import React from 'react';
import { 
  LayoutDashboard, 
  Bot, 
  FolderKanban, 
  FileText, 
  BarChart3, 
  Users, 
  Cpu, 
  Boxes, 
  Settings, 
  Crown, 
  ArrowRight,
  X,
  Briefcase,
  Calendar,
  FileCheck2
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpenMobile: boolean;
  setIsOpenMobile: (isOpen: boolean) => void;
  onOpenUpgrade?: () => void;
}

const navItems = [
  { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
  { id: 'projects-tasks', name: 'Projects & Tasks', icon: FolderKanban },
  { id: 'ai-assistant', name: 'AI Assistant', icon: Bot },
  { id: 'documents', name: 'Documents', icon: FileText },
  { id: 'team', name: 'Team', icon: Users },
  { id: 'clients', name: 'Clients', icon: Briefcase },
  { id: 'analytics', name: 'Analytics', icon: BarChart3 },
  { id: 'automation', name: 'Automation', icon: Cpu },
  { id: 'integrations', name: 'Integrations', icon: Boxes },
  { id: 'calendar', name: 'Calendar', icon: Calendar },
  { id: 'reports', name: 'Reports', icon: FileCheck2 },
  { id: 'settings', name: 'Settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isOpenMobile,
  setIsOpenMobile,
  onOpenUpgrade,
}) => {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpenMobile(false)}
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0a1120] text-slate-300 flex flex-col 
        border-r border-[#19243b] transition-transform duration-300 ease-in-out
        lg:translate-x-0 ${isOpenMobile ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Brand / Logo */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-[#162035]/60">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[2px] shadow-lg shadow-blue-500/20">
              <div className="w-full h-full bg-[#0a1120] rounded-[10px] flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-blue-400 fill-current">
                  <path d="M12 2L2 7.5L12 13L22 7.5L12 2Z" fill="#38bdf8" />
                  <path d="M2 7.5L12 13V22L2 16.5V7.5Z" fill="#2563eb" />
                  <path d="M22 7.5L12 13V22L22 16.5V7.5Z" fill="#1d4ed8" />
                </svg>
              </div>
            </div>
            <div className="flex items-center">
              <span className="font-extrabold text-xl tracking-tight text-white font-sans">
                Nexus<span className="text-white">AI</span>
              </span>
            </div>
          </div>

          <button 
            onClick={() => setIsOpenMobile(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            // Support both 'projects' and 'projects-tasks'
            const isActive = activeTab === item.id || (item.id === 'projects-tasks' && activeTab === 'projects');
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpenMobile(false);
                }}
                className={`
                  w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-150
                  ${isActive 
                    ? 'bg-blue-600 text-white font-semibold shadow-lg shadow-blue-600/30' 
                    : 'text-slate-400 hover:text-white hover:bg-[#141e33]'}
                `}
              >
                <Icon className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 ${isActive ? 'scale-105 text-white' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Banner: Upgrade to Pro */}
        <div className="p-4 border-t border-[#162035]/60">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#151f38] to-[#0d1628] p-4 border border-[#223152]/60 shadow-xl">
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Crown className="w-4 h-4 fill-amber-400 text-amber-400" />
              </div>
            </div>

            <h4 className="text-white font-semibold text-sm">Upgrade to Pro</h4>
            <p className="text-slate-400 text-xs mt-1 leading-relaxed">
              Unlock advanced AI tools, higher limits and more team members.
            </p>

            <button 
              onClick={onOpenUpgrade}
              className="mt-3 w-full group py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/20 transition-all duration-150 active:scale-[0.98]"
            >
              <span>Upgrade Now</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
