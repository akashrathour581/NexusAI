import React from 'react';
import { Check } from 'lucide-react';
import type { TaskItemData, TaskPriority } from '../../types/dashboard';

interface UpcomingTasksListProps {
  tasks: TaskItemData[];
  onToggleTask: (id: string) => void;
}

export const UpcomingTasksList: React.FC<UpcomingTasksListProps> = ({ tasks, onToggleTask }) => {
  const getPriorityBadge = (priority: TaskPriority) => {
    switch (priority) {
      case 'High':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-tight bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-200/60 dark:border-rose-900/40">
            <span className="text-[9px]">❖</span>
            <span>High</span>
          </span>
        );
      case 'Medium':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-tight bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200/60 dark:border-amber-900/40">
            <span className="text-[9px]">❖</span>
            <span>Medium</span>
          </span>
        );
      case 'Low':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-tight bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200/60 dark:border-blue-900/40">
            <span className="text-[9px]">❖</span>
            <span>Low</span>
          </span>
        );
    }
  };

  return (
    <div className="bg-white dark:bg-[#0f172a] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/60">
        <h3 className="font-bold text-base text-slate-900 dark:text-white tracking-tight">
          Upcoming Tasks
        </h3>
        <button className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 hover:underline">
          View all
        </button>
      </div>

      {/* Task Checklist items */}
      <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="py-3.5 flex items-center justify-between gap-3 group hover:bg-slate-50/60 dark:hover:bg-slate-800/30 px-1 -mx-1 rounded-xl transition-colors cursor-pointer"
            onClick={() => onToggleTask(task.id)}
          >
            {/* Left: Checkbox & Title/Client */}
            <div className="flex items-start gap-3 min-w-0">
              <button
                type="button"
                className={`mt-0.5 w-4 h-4 rounded-[4px] border flex items-center justify-center transition-all shrink-0 ${
                  task.completed
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 group-hover:border-blue-500'
                }`}
                aria-label={task.completed ? 'Mark task incomplete' : 'Mark task complete'}
              >
                {task.completed && <Check className="w-3 h-3 stroke-[3]" />}
              </button>

              <div className="min-w-0">
                <h4 className={`text-xs font-bold leading-snug transition-colors ${
                  task.completed 
                    ? 'line-through text-slate-400 dark:text-slate-500' 
                    : 'text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                }`}>
                  {task.title}
                </h4>
                <p className="text-[11px] text-slate-400 dark:text-slate-400 mt-0.5 truncate">
                  {task.client}
                </p>
              </div>
            </div>

            {/* Right: Due Date & Priority Tag */}
            <div className="flex items-center gap-3 shrink-0 ml-2">
              <span className="text-[11px] font-medium text-slate-400 dark:text-slate-400">
                {task.dueDate}
              </span>
              <div>
                {getPriorityBadge(task.priority)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
