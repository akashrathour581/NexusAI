import React from 'react';
import { 
  Plus, 
  FileText, 
  Users, 
  FileUp, 
  Check, 
  MoreVertical 
} from 'lucide-react';
import type { ActivityItem } from '../../types/dashboard';

interface RecentActivityListProps {
  activities: ActivityItem[];
}

export const RecentActivityList: React.FC<RecentActivityListProps> = ({ activities }) => {
  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'client':
        return {
          icon: Plus,
          bg: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400',
        };
      case 'project':
        return {
          icon: FileText,
          bg: 'bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400',
        };
      case 'team':
        return {
          icon: Users,
          bg: 'bg-purple-100 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400',
        };
      case 'document':
        return {
          icon: FileUp,
          bg: 'bg-amber-100 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400',
        };
      case 'task':
        return {
          icon: Check,
          bg: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400',
        };
    }
  };

  return (
    <div className="bg-white dark:bg-[#0f172a] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/60">
        <h3 className="font-bold text-base text-slate-900 dark:text-white tracking-tight">
          Recent Activity
        </h3>
        <button className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 hover:underline">
          View all
        </button>
      </div>

      {/* List items */}
      <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
        {activities.map((item) => {
          const config = getActivityIcon(item.type);
          const Icon = config.icon;

          return (
            <div 
              key={item.id} 
              className="py-3 flex items-center justify-between group hover:bg-slate-50/60 dark:hover:bg-slate-800/30 px-1 -mx-1 rounded-xl transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${config.bg} transition-transform group-hover:scale-105`}>
                  <Icon className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                    <span>{item.subtitle}</span>
                    <span>•</span>
                    <span>{item.timestamp}</span>
                  </p>
                </div>
              </div>

              <button 
                className="p-1 rounded-md text-slate-300 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                aria-label="Activity options"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
