import React from 'react';
import { Briefcase, Users, DollarSign, Clock, ArrowRight } from 'lucide-react';
import type { MetricCardData } from '../../types/dashboard';

interface MetricsGridProps {
  metrics: MetricCardData[];
}

export const MetricsGrid: React.FC<MetricsGridProps> = ({ metrics }) => {
  const getIconConfig = (type: MetricCardData['iconType']) => {
    switch (type) {
      case 'briefcase':
        return {
          icon: Briefcase,
          bg: 'bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/40 text-blue-600 dark:text-blue-400',
          arrowBg: 'text-blue-500 bg-blue-50/80 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60',
        };
      case 'users':
        return {
          icon: Users,
          bg: 'bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-900/40 text-emerald-600 dark:text-emerald-400',
          arrowBg: 'text-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60',
        };
      case 'dollar':
        return {
          icon: DollarSign,
          bg: 'bg-purple-50 dark:bg-purple-950/50 border border-purple-100 dark:border-purple-900/40 text-purple-600 dark:text-purple-400',
          arrowBg: 'text-purple-500 bg-purple-50/80 dark:bg-purple-950/60 hover:bg-purple-100 dark:hover:bg-purple-900/60',
        };
      case 'clock':
        return {
          icon: Clock,
          bg: 'bg-sky-50 dark:bg-sky-950/50 border border-sky-100 dark:border-sky-900/40 text-sky-600 dark:text-sky-400',
          arrowBg: 'text-sky-500 bg-sky-50/80 dark:bg-sky-950/60 hover:bg-sky-100 dark:hover:bg-sky-900/60',
        };
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {metrics.map((metric) => {
        const config = getIconConfig(metric.iconType);
        const Icon = config.icon;

        return (
          <div
            key={metric.id}
            className="group relative bg-white dark:bg-[#0f172a] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
          >
            {/* Top row: Icon and Top-Right Action Arrow */}
            <div className="flex items-start justify-between">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${config.bg} transition-transform group-hover:scale-105 duration-200`}>
                <Icon className="w-6 h-6 stroke-[2.2]" />
              </div>

              <button 
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${config.arrowBg}`}
                aria-label={`View ${metric.title}`}
              >
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Middle: Title & Stat value */}
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {metric.title}
              </p>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1 tracking-tight font-sans">
                {metric.value}
              </h3>
            </div>

            {/* Bottom: Trend percentage pill and description */}
            <div className="mt-4 flex items-center gap-1.5 text-xs">
              <span className="inline-flex items-center gap-0.5 font-bold text-emerald-600 dark:text-emerald-400">
                <span>↑</span>
                <span>{metric.trend}</span>
              </span>
              <span className="text-slate-500 dark:text-slate-400 font-normal">
                {metric.trendSubtext}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
