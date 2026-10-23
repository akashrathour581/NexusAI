import React, { useState } from 'react';
import { 
  FolderKanban, 
  CheckCircle2, 
  Users, 
  BarChart3, 
  Plus, 
  Search, 
  Filter, 
  ChevronDown, 
  MoreVertical, 
  Calendar as CalendarIcon, 
  Check, 
  CheckSquare, 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  Paperclip,
  Smartphone,
  Bot,
  Megaphone,
  User
} from 'lucide-react';

interface ProjectDetail {
  id: string;
  title: string;
  status: 'In Progress' | 'Completed' | 'On Hold';
  description: string;
  progress: number;
  tasksCount: number;
  membersCount: number;
  filesCount: number;
  avatars: string[];
  dueDate: string;
  deadlineText: string;
  isUrgent?: boolean;
  categoryIcon: 'crm' | 'ai-doc' | 'sales' | 'portal' | 'mobile' | 'marketing';
}

const detailedProjectsData: ProjectDetail[] = [
  {
    id: 'proj-nexus-crm',
    title: 'Nexus CRM',
    status: 'In Progress',
    description: 'AI-powered CRM for sales, client management and workflow automation.',
    progress: 75,
    tasksCount: 24,
    membersCount: 8,
    filesCount: 5,
    avatars: ['AR', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&fit=crop&q=80', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&fit=crop&q=80'],
    dueDate: 'Dec 15, 2026',
    deadlineText: '12 days left',
    isUrgent: true,
    categoryIcon: 'crm',
  },
  {
    id: 'proj-ai-doc',
    title: 'AI Document Intelligence',
    status: 'In Progress',
    description: 'Extract, analyze and summarize business documents using AI (PDF, DOCX, etc).',
    progress: 60,
    tasksCount: 18,
    membersCount: 6,
    filesCount: 12,
    avatars: ['PG', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&fit=crop&q=80', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&fit=crop&q=80'],
    dueDate: 'Dec 28, 2026',
    deadlineText: '25 days left',
    isUrgent: true,
    categoryIcon: 'ai-doc',
  },
  {
    id: 'proj-sales-intel',
    title: 'Sales Intelligence',
    status: 'Completed',
    description: 'AI-driven sales insights, lead scoring and market analysis platform.',
    progress: 100,
    tasksCount: 32,
    membersCount: 6,
    filesCount: 18,
    avatars: ['SM', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&fit=crop&q=80', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&fit=crop&q=80'],
    dueDate: 'Oct 20, 2026',
    deadlineText: 'Completed',
    categoryIcon: 'sales',
  },
  {
    id: 'proj-customer-portal',
    title: 'Customer Portal',
    status: 'In Progress',
    description: 'Client portal for support, billing, project tracking and communication.',
    progress: 45,
    tasksCount: 16,
    membersCount: 5,
    filesCount: 8,
    avatars: ['https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50&fit=crop&q=80', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=50&fit=crop&q=80', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=50&fit=crop&q=80'],
    dueDate: 'Jan 10, 2027',
    deadlineText: '38 days left',
    categoryIcon: 'portal',
  },
  {
    id: 'proj-mobile-app',
    title: 'Mobile App',
    status: 'On Hold',
    description: 'React Native mobile application for iOS and Android platforms.',
    progress: 30,
    tasksCount: 12,
    membersCount: 4,
    filesCount: 6,
    avatars: ['RM', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&fit=crop&q=80', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&fit=crop&q=80'],
    dueDate: 'Jan 25, 2027',
    deadlineText: 'On hold',
    categoryIcon: 'mobile',
  },
  {
    id: 'proj-marketing-auto',
    title: 'Marketing Automation',
    status: 'In Progress',
    description: 'Automate email campaigns, social media and lead nurturing with AI.',
    progress: 65,
    tasksCount: 20,
    membersCount: 5,
    filesCount: 10,
    avatars: ['SN', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&fit=crop&q=80', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&fit=crop&q=80'],
    dueDate: 'Jan 5, 2027',
    deadlineText: '33 days left',
    categoryIcon: 'marketing',
  },
];

interface ProjectsTasksPageProps {
  onOpenNewProjectModal: () => void;
}

export const ProjectsTasksPage: React.FC<ProjectsTasksPageProps> = ({ onOpenNewProjectModal }) => {
  const [filterTab, setFilterTab] = useState<'All' | 'In Progress' | 'Completed' | 'On Hold'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [tasksTab, setTasksTab] = useState<'today' | 'week' | 'overdue'>('today');

  const [personalTasks, setPersonalTasks] = useState([
    { id: 'pt-1', title: 'Review CRM wireframes', project: 'Nexus CRM', time: '10:00 AM', done: false },
    { id: 'pt-2', title: 'Update API documentation', project: 'AI Document Intelligence', time: '12:00 PM', done: false },
    { id: 'pt-3', title: 'Prepare client presentation', project: 'Customer Portal', time: '03:00 PM', done: false },
  ]);

  const filteredProjects = detailedProjectsData.filter((p) => {
    const matchesFilter = filterTab === 'All' || p.status === filterTab;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getCategoryConfig = (cat: ProjectDetail['categoryIcon']) => {
    switch (cat) {
      case 'crm':
        return { icon: BarChart3, bg: 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400', bar: 'bg-blue-600' };
      case 'ai-doc':
        return { icon: FileText, bg: 'bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400', bar: 'bg-purple-600' };
      case 'sales':
        return { icon: BarChart3, bg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400', bar: 'bg-emerald-600' };
      case 'portal':
        return { icon: User, bg: 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400', bar: 'bg-amber-500' };
      case 'mobile':
        return { icon: Smartphone, bg: 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400', bar: 'bg-rose-500' };
      case 'marketing':
        return { icon: Megaphone, bg: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-950/60 dark:text-cyan-400', bar: 'bg-cyan-500' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Projects & Tasks
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-normal">
            Manage your projects, tasks and team collaboration. Turn ideas into real business results with AI.
          </p>
        </div>

        <button
          onClick={onOpenNewProjectModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/25 active:scale-95 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>New Project</span>
        </button>
      </div>

      {/* 4 Metric KPI Cards matching Screenshot 3 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-[#0f172a] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <FolderKanban className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Projects</span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">6</h3>
            <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-600 mt-1">
              <span>↑ 50%</span>
              <span className="text-slate-400 font-normal">from last month</span>
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0f172a] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Active Projects</span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">4</h3>
            <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-600 mt-1">
              <span>↑ 33%</span>
              <span className="text-slate-400 font-normal">from last month</span>
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0f172a] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Team Members</span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">12</h3>
            <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-600 mt-1">
              <span>↑ 20%</span>
              <span className="text-slate-400 font-normal">from last month</span>
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0f172a] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Tasks Completed</span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">86</h3>
            <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-600 mt-1">
              <span>↑ 45%</span>
              <span className="text-slate-400 font-normal">from last month</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Split: Projects View (Left) & Right Sidebar (Calendar + Deadlines + My Tasks) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Filter Tabs + Project Cards Grid */}
        <div className="lg:col-span-8 space-y-4">
          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white dark:bg-[#0f172a] p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-2xs">
            {/* Status Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 md:pb-0">
              <button
                onClick={() => setFilterTab('All')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  filterTab === 'All'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>All Projects</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${filterTab === 'All' ? 'bg-blue-700 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>
                  6
                </span>
              </button>

              <button
                onClick={() => setFilterTab('In Progress')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  filterTab === 'In Progress'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>In Progress</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${filterTab === 'In Progress' ? 'bg-blue-700 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>
                  4
                </span>
              </button>

              <button
                onClick={() => setFilterTab('Completed')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  filterTab === 'Completed'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>Completed</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${filterTab === 'Completed' ? 'bg-blue-700 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>
                  1
                </span>
              </button>

              <button
                onClick={() => setFilterTab('On Hold')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  filterTab === 'On Hold'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>On Hold</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${filterTab === 'On Hold' ? 'bg-blue-700 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>
                  1
                </span>
              </button>
            </div>

            {/* Search and Sort controls */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1 md:w-44">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden"
                />
              </div>

              <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <span>Filter</span>
              </button>

              <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50">
                <span>Newest First</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Grid of 6 Project Cards (2 columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProjects.map((p) => {
              const config = getCategoryConfig(p.categoryIcon);
              const Icon = config.icon;

              return (
                <div
                  key={p.id}
                  className="bg-white dark:bg-[#0f172a] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
                >
                  <div>
                    {/* Card Top: Icon, Title, Status, Menu */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${config.bg}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                              {p.title}
                            </h3>
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                              p.status === 'In Progress' 
                                ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60'
                                : p.status === 'Completed'
                                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60'
                                : 'bg-amber-50 text-amber-600 dark:bg-amber-950/60'
                            }`}>
                              {p.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button className="text-slate-300 hover:text-slate-600 dark:text-slate-600 p-1">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2.5 leading-relaxed">
                      {p.description}
                    </p>

                    {/* Progress Bar & Percentage */}
                    <div className="mt-4">
                      <div className="flex items-center justify-end mb-1.5">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                          {p.progress}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${config.bar}`} style={{ width: `${p.progress}%` }} />
                      </div>
                    </div>

                    {/* 3 Stats: Tasks, Members, Files */}
                    <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <CheckSquare className="w-3.5 h-3.5 text-slate-400" />
                        <span><strong>{p.tasksCount}</strong> Tasks</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        <span><strong>{p.membersCount}</strong> Members</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Paperclip className="w-3.5 h-3.5 text-slate-400" />
                        <span><strong>{p.filesCount}</strong> Files</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer: Member avatars & Due date status */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="flex -space-x-1.5 overflow-hidden">
                        {p.avatars.map((av, idx) => 
                          av.startsWith('http') ? (
                            <img
                              key={idx}
                              src={av}
                              alt="Avatar"
                              className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover"
                            />
                          ) : (
                            <div
                              key={idx}
                              className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-600 text-white font-bold text-[10px] ring-2 ring-white dark:ring-slate-900"
                            >
                              {av}
                            </div>
                          )
                        )}
                        <div className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-[10px] ring-2 ring-white dark:ring-slate-900">
                          +3
                        </div>
                      </div>
                    </div>

                    {/* Due Date & Badge */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
                        <CalendarIcon className="w-3 h-3 text-slate-400" />
                        <span>{p.dueDate}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        p.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60'
                          : p.status === 'On Hold'
                          ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/60'
                          : 'bg-rose-50 text-rose-600 dark:bg-rose-950/60'
                      }`}>
                        {p.deadlineText}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Mini Calendar, Upcoming Deadlines, My Tasks */}
        <div className="lg:col-span-4 space-y-5">
          {/* Calendar Widget */}
          <div className="bg-white dark:bg-[#0f172a] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Calendar</h3>
              <button className="text-xs font-semibold text-blue-600 hover:underline">View all</button>
            </div>

            {/* Month Switcher */}
            <div className="flex items-center justify-between py-1">
              <button className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-bold text-xs text-slate-800 dark:text-slate-200">December 2026</span>
              <button className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Calendar Table Grid */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                <span key={d} className="text-[11px] font-bold text-slate-400 py-1">
                  {d}
                </span>
              ))}

              {/* Prev month days */}
              <span className="text-slate-300 dark:text-slate-600 py-1.5">29</span>
              <span className="text-slate-300 dark:text-slate-600 py-1.5">30</span>
              {/* Dec days */}
              <span className="text-slate-700 dark:text-slate-300 py-1.5">1</span>
              <span className="text-slate-700 dark:text-slate-300 py-1.5">2</span>
              <span className="text-slate-700 dark:text-slate-300 py-1.5 relative">
                3
                <span className="w-1 h-1 rounded-full bg-purple-500 absolute bottom-0.5 left-1/2 -translate-x-1/2" />
              </span>
              <span className="text-slate-700 dark:text-slate-300 py-1.5">4</span>
              <span className="text-slate-700 dark:text-slate-300 py-1.5">5</span>

              <span className="text-slate-700 dark:text-slate-300 py-1.5">6</span>
              <span className="text-slate-700 dark:text-slate-300 py-1.5">7</span>
              <span className="text-slate-700 dark:text-slate-300 py-1.5">8</span>
              <span className="text-slate-700 dark:text-slate-300 py-1.5">9</span>
              <span className="text-slate-700 dark:text-slate-300 py-1.5 relative">
                10
                <span className="w-1 h-1 rounded-full bg-blue-500 absolute bottom-0.5 left-1/2 -translate-x-1/2" />
              </span>
              <span className="text-slate-700 dark:text-slate-300 py-1.5">11</span>
              <span className="text-slate-700 dark:text-slate-300 py-1.5">12</span>

              <span className="text-slate-700 dark:text-slate-300 py-1.5">13</span>
              <span className="text-slate-700 dark:text-slate-300 py-1.5">14</span>
              <span className="py-1 flex items-center justify-center">
                <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shadow-md">
                  15
                </span>
              </span>
              <span className="text-slate-700 dark:text-slate-300 py-1.5">16</span>
              <span className="text-slate-700 dark:text-slate-300 py-1.5">17</span>
              <span className="text-slate-700 dark:text-slate-300 py-1.5 relative">
                18
                <span className="w-1 h-1 rounded-full bg-rose-500 absolute bottom-0.5 left-1/2 -translate-x-1/2" />
              </span>
              <span className="text-slate-700 dark:text-slate-300 py-1.5">19</span>

              <span className="text-slate-700 dark:text-slate-300 py-1.5">20</span>
              <span className="text-slate-700 dark:text-slate-300 py-1.5">21</span>
              <span className="text-slate-700 dark:text-slate-300 py-1.5">22</span>
              <span className="text-slate-700 dark:text-slate-300 py-1.5">23</span>
              <span className="text-slate-700 dark:text-slate-300 py-1.5">24</span>
              <span className="text-slate-700 dark:text-slate-300 py-1.5">25</span>
              <span className="text-slate-700 dark:text-slate-300 py-1.5">26</span>

              <span className="text-slate-700 dark:text-slate-300 py-1.5">27</span>
              <span className="text-slate-700 dark:text-slate-300 py-1.5 relative">
                28
                <span className="w-1 h-1 rounded-full bg-emerald-500 absolute bottom-0.5 left-1/2 -translate-x-1/2" />
              </span>
              <span className="text-slate-700 dark:text-slate-300 py-1.5">29</span>
              <span className="text-slate-700 dark:text-slate-300 py-1.5">30</span>
              <span className="text-slate-700 dark:text-slate-300 py-1.5">31</span>
              <span className="text-slate-300 dark:text-slate-600 py-1.5">1</span>
              <span className="text-slate-300 dark:text-slate-600 py-1.5">2</span>
            </div>
          </div>

          {/* Upcoming Deadlines Widget */}
          <div className="bg-white dark:bg-[#0f172a] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Upcoming Deadlines</h3>
              <button className="text-xs font-semibold text-blue-600 hover:underline">View all</button>
            </div>

            <div className="space-y-2.5">
              {[
                { title: 'Nexus CRM – Phase 2', date: 'Dec 15, 2026', badge: '12 days left', color: 'bg-rose-50 text-rose-600', icon: BarChart3 },
                { title: 'AI Model Training', date: 'Dec 20, 2026', badge: '17 days left', color: 'bg-rose-50 text-rose-600', icon: Bot },
                { title: 'Client Portal – Beta', date: 'Jan 10, 2027', badge: '38 days left', color: 'bg-amber-50 text-amber-600', icon: User },
                { title: 'Mobile App – MVP', date: 'Jan 25, 2027', badge: 'On hold', color: 'bg-amber-50 text-amber-600', icon: Smartphone },
                { title: 'Marketing Campaign', date: 'Feb 5, 2027', badge: '58 days left', color: 'bg-rose-50 text-rose-600', icon: Megaphone },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center shrink-0">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{item.title}</h4>
                        <p className="text-[11px] text-slate-400">{item.date}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold shrink-0 ${item.color}`}>
                      {item.badge}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* My Tasks Checklist Widget */}
          <div className="bg-white dark:bg-[#0f172a] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">My Tasks</h3>
              <button className="text-xs font-semibold text-blue-600 hover:underline">View all</button>
            </div>

            {/* Task Tabs */}
            <div className="flex items-center gap-1.5 text-xs">
              <button
                onClick={() => setTasksTab('today')}
                className={`px-2.5 py-1 rounded-lg font-bold ${tasksTab === 'today' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-100'}`}
              >
                Today (3)
              </button>
              <button
                onClick={() => setTasksTab('week')}
                className={`px-2.5 py-1 rounded-lg font-bold ${tasksTab === 'week' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-100'}`}
              >
                This Week (7)
              </button>
              <button
                onClick={() => setTasksTab('overdue')}
                className={`px-2.5 py-1 rounded-lg font-bold ${tasksTab === 'overdue' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-100'}`}
              >
                Overdue (2)
              </button>
            </div>

            {/* Checklist */}
            <div className="space-y-2 pt-1">
              {personalTasks.map((t) => (
                <div
                  key={t.id}
                  onClick={() => {
                    setPersonalTasks((prev) =>
                      prev.map((item) => (item.id === t.id ? { ...item, done: !item.done } : item))
                    );
                  }}
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <button
                      className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-all ${
                        t.done ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 dark:border-slate-600'
                      }`}
                    >
                      {t.done && <Check className="w-3 h-3 stroke-[3]" />}
                    </button>
                    <div>
                      <h4 className={`text-xs font-bold leading-tight ${t.done ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200'}`}>
                        {t.title}
                      </h4>
                      <span className="text-[10px] text-amber-600 font-semibold">{t.project}</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-slate-400">{t.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
