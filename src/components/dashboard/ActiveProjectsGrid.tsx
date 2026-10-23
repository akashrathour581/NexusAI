import React from 'react';
import { 
  Globe, 
  Smartphone, 
  Bot, 
  Box, 
  BarChart2, 
  ShoppingCart, 
  MoreVertical 
} from 'lucide-react';
import type { ProjectCardData } from '../../types/dashboard';

interface ActiveProjectsGridProps {
  projects: ProjectCardData[];
}

export const ActiveProjectsGrid: React.FC<ActiveProjectsGridProps> = ({ projects }) => {
  const getCategoryConfig = (icon: ProjectCardData['categoryIcon']) => {
    switch (icon) {
      case 'globe':
        return {
          icon: Globe,
          bg: 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400',
          progressColor: 'bg-blue-500',
        };
      case 'mobile':
        return {
          icon: Smartphone,
          bg: 'bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400',
          progressColor: 'bg-purple-500',
        };
      case 'bot':
        return {
          icon: Bot,
          bg: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-950/60 dark:text-cyan-400',
          progressColor: 'bg-cyan-500',
        };
      case 'crm':
        return {
          icon: Box,
          bg: 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400',
          progressColor: 'bg-amber-500',
        };
      case 'analytics':
        return {
          icon: BarChart2,
          bg: 'bg-sky-50 text-sky-600 dark:bg-sky-950/60 dark:text-sky-400',
          progressColor: 'bg-sky-500',
        };
      case 'ecommerce':
        return {
          icon: ShoppingCart,
          bg: 'bg-violet-50 text-violet-600 dark:bg-violet-950/60 dark:text-violet-400',
          progressColor: 'bg-violet-500',
        };
    }
  };

  const getStatusBadge = (status: ProjectCardData['status']) => {
    switch (status) {
      case 'In Progress':
        return 'bg-blue-50 text-blue-600 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/40';
      case 'On Track':
        return 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/40';
      case 'Planning':
        return 'bg-purple-50 text-purple-600 dark:bg-purple-950/80 dark:text-purple-300 border border-purple-200/50 dark:border-purple-800/40';
      case 'Completed':
        return 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <div className="bg-white dark:bg-[#0f172a] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800/60">
        <h3 className="font-bold text-base text-slate-900 dark:text-white tracking-tight">
          Active Projects
        </h3>
        <button className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 hover:underline">
          View all
        </button>
      </div>

      {/* Grid of 6 project cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {projects.map((project) => {
          const config = getCategoryConfig(project.categoryIcon);
          const Icon = config.icon;

          return (
            <div
              key={project.id}
              className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/40 dark:bg-slate-900/30 hover:bg-white dark:hover:bg-slate-900 transition-all duration-150 flex flex-col justify-between group shadow-xs hover:shadow-md"
            >
              {/* Card top */}
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${config.bg}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 dark:text-slate-400 font-medium mt-0.5">
                        {project.client}
                      </p>
                    </div>
                  </div>

                  <button className="text-slate-300 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-300 p-1">
                    <MoreVertical className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Progress bar and percentage */}
                <div className="mt-4">
                  <div className="flex items-center justify-end mb-1.5">
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                      {project.progress}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${config.progressColor} transition-all duration-500`}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Card bottom: Members avatars & status badge */}
              <div className="mt-4 pt-3 border-t border-slate-100/80 dark:border-slate-800/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1.5 overflow-hidden">
                    {project.memberAvatars.map((avatar, idx) => (
                      <img
                        key={idx}
                        src={avatar}
                        alt="Member"
                        className="inline-block h-5 w-5 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover"
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    {project.membersCount} members
                  </span>
                </div>

                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold tracking-tight ${getStatusBadge(project.status)}`}>
                  {project.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
