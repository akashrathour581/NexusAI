import { useState, useEffect } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { MetricsGrid } from './components/dashboard/MetricsGrid';
import { RevenueOverviewChart } from './components/dashboard/RevenueOverviewChart';
import { ProjectActivityChart } from './components/dashboard/ProjectActivityChart';
import { RecentActivityList } from './components/dashboard/RecentActivityList';
import { ActiveProjectsGrid } from './components/dashboard/ActiveProjectsGrid';
import { UpcomingTasksList } from './components/dashboard/UpcomingTasksList';
import { NewProjectModal } from './components/dashboard/NewProjectModal';
import { SearchCommandPalette } from './components/dashboard/SearchCommandPalette';
import { AIAssistantPage } from './components/ai-assistant/AIAssistantPage';
import { AnalyticsPage } from './components/analytics/AnalyticsPage';
import { ProjectsTasksPage } from './components/projects/ProjectsTasksPage';
import { DocumentsPage } from './components/documents/DocumentsPage';
import { TeamPage } from './components/team/TeamPage';
import { ClientsPage } from './components/clients/ClientsPage';
import { AutomationPage } from './components/automation/AutomationPage';
import { IntegrationsPage } from './components/integrations/IntegrationsPage';
import { CalendarPage } from './components/calendar/CalendarPage';
import { SettingsPage } from './components/settings/SettingsPage';
import { UpgradeProModal } from './components/common/UpgradeProModal';
import { 
  currentUser, 
  metricCards as initialMetricCards, 
  revenueData, 
  projectActivityData, 
  recentActivities, 
  activeProjects as initialProjects, 
  initialTasks 
} from './data/mockData';
import type { ProjectCardData, TaskItemData } from './types/dashboard';
import { Calendar, Plus, ChevronDown, Sparkles } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState('Oct 1, 2026 - Oct 31, 2026');
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);

  const [projects, setProjects] = useState<ProjectCardData[]>(initialProjects);
  const [tasks, setTasks] = useState<TaskItemData[]>(initialTasks);
  const [metrics, setMetrics] = useState(initialMetricCards);

  // Sync dark mode class with root html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Global Ctrl+K shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleAddProject = (newProject: ProjectCardData) => {
    setProjects((prev) => [newProject, ...prev]);
    // update metric count
    setMetrics((prev) =>
      prev.map((m) =>
        m.id === 'projects'
          ? { ...m, value: String(parseInt(m.value) + 1) }
          : m
      )
    );
  };

  const renderCurrentView = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            {/* Page Title & Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                  <span>Welcome back, {currentUser.name.split(' ')[0]}.</span>
                  <span className="inline-block">👋</span>
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-normal">
                  Here's what's happening with your business today.
                </p>
              </div>

              {/* Right Top Actions: Date Range Picker & New Project Button */}
              <div className="flex items-center gap-3 self-start sm:self-auto">
                {/* Date Range Selector Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
                    className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                  >
                    <Calendar className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    <span>{dateRange}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {isDateDropdownOpen && (
                    <div className="absolute right-0 mt-1.5 w-60 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-1.5 z-20 animate-in fade-in">
                      {[
                        'Oct 1, 2026 - Oct 31, 2026',
                        'Sep 1, 2026 - Sep 30, 2026',
                        'Last 30 Days',
                        'Last 90 Days',
                        'Year to Date (2026)',
                      ].map((range) => (
                        <button
                          key={range}
                          onClick={() => {
                            setDateRange(range);
                            setIsDateDropdownOpen(false);
                          }}
                          className="w-full text-left px-3.5 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium"
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* + New Project Button */}
                <button
                  onClick={() => setIsNewProjectModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/25 active:scale-95 transition-all"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>New Project</span>
                </button>
              </div>
            </div>

            {/* 4 KPI Metrics Grid */}
            <MetricsGrid metrics={metrics} />

            {/* Middle Section: Revenue Overview + Project Activity + Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              <div className="lg:col-span-5">
                <RevenueOverviewChart data={revenueData} />
              </div>
              <div className="lg:col-span-4">
                <ProjectActivityChart data={projectActivityData} />
              </div>
              <div className="lg:col-span-3">
                <RecentActivityList activities={recentActivities} />
              </div>
            </div>

            {/* Bottom Section: Active Projects + Upcoming Tasks */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              <div className="lg:col-span-8">
                <ActiveProjectsGrid projects={projects} />
              </div>
              <div className="lg:col-span-4">
                <UpcomingTasksList tasks={tasks} onToggleTask={handleToggleTask} />
              </div>
            </div>
          </>
        );

      case 'ai-assistant':
        return <AIAssistantPage />;

      case 'analytics':
      case 'reports':
        return <AnalyticsPage />;

      case 'projects-tasks':
      case 'projects':
        return <ProjectsTasksPage onOpenNewProjectModal={() => setIsNewProjectModalOpen(true)} />;

      case 'documents':
        return <DocumentsPage />;

      case 'team':
        return <TeamPage />;

      case 'clients':
        return <ClientsPage />;

      case 'automation':
        return <AutomationPage />;

      case 'integrations':
        return <IntegrationsPage />;

      case 'calendar':
        return <CalendarPage />;

      case 'settings':
        return <SettingsPage onOpenUpgradeModal={() => setIsUpgradeModalOpen(true)} />;

      default:
        return (
          <div className="bg-white dark:bg-[#0f172a] rounded-2xl p-10 border border-slate-200 dark:border-slate-800 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 mx-auto flex items-center justify-center">
              <Sparkles className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white capitalize">
              {activeTab.replace('-', ' ')}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Welcome to the {activeTab.replace('-', ' ')} module. Explore any of the sections using the left navigation sidebar.
            </p>
            <button
              onClick={() => setActiveTab('dashboard')}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 shadow-md transition-all"
            >
              Return to Main Dashboard
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#080d1a] text-slate-800 dark:text-slate-100 flex transition-colors">
      {/* Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpenMobile={isOpenMobile}
        setIsOpenMobile={setIsOpenMobile}
        onOpenUpgrade={() => setIsUpgradeModalOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Top Header */}
        <Header
          user={currentUser}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onOpenSearch={() => setIsSearchOpen(true)}
          onToggleMobileSidebar={() => setIsOpenMobile(true)}
          onNavigate={(tab) => setActiveTab(tab)}
          onOpenUpgrade={() => setIsUpgradeModalOpen(true)}
        />

        {/* Dashboard Main Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] w-full mx-auto">
          {renderCurrentView()}
        </main>
      </div>

      {/* Modals & Command Palette */}
      <NewProjectModal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        onAddProject={handleAddProject}
      />

      <SearchCommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        projects={projects}
        tasks={tasks}
      />

      <UpgradeProModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
      />
    </div>
  );
}

export default App;

