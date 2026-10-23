import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { ChevronDown } from 'lucide-react';
import type { ActivityDataPoint } from '../../types/dashboard';

interface ProjectActivityChartProps {
  data: ActivityDataPoint[];
}

export const ProjectActivityChart: React.FC<ProjectActivityChartProps> = ({ data }) => {
  const [timeRange, setTimeRange] = useState('This Year');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 p-2.5 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 text-xs space-y-1">
          <p className="font-bold text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-700 pb-1 mb-1">{label} 2026</p>
          <div className="flex items-center justify-between gap-3 text-blue-600">
            <span>Completed:</span>
            <span className="font-semibold">{payload[0]?.value}</span>
          </div>
          <div className="flex items-center justify-between gap-3 text-purple-600">
            <span>In Progress:</span>
            <span className="font-semibold">{payload[1]?.value}</span>
          </div>
          <div className="flex items-center justify-between gap-3 text-amber-500">
            <span>Pending:</span>
            <span className="font-semibold">{payload[2]?.value}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-[#0f172a] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full">
      {/* Header with Title and Time Selector */}
      <div>
        <div className="flex items-center justify-between relative">
          <h3 className="font-bold text-base text-slate-900 dark:text-white tracking-tight">
            Project Activity
          </h3>

          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700/80 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <span>{timeRange}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-1 w-32 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-20">
                {['This Year', 'Quarterly', 'Monthly'].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setTimeRange(option);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60 font-medium"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Legend matching design */}
        <div className="flex items-center gap-4 mt-3 text-xs text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-1.5 font-medium">
            <span className="w-2.5 h-2.5 rounded-xs bg-blue-600 inline-block" />
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#a855f7] inline-block" />
            <span>In Progress</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#f59e0b] inline-block" />
            <span>Pending</span>
          </div>
        </div>
      </div>

      {/* Stacked Bar Chart */}
      <div className="w-full h-[220px] mt-4 -ml-2 min-h-[220px]">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} margin={{ top: 10, right: 10, left: -24, bottom: 0 }} barSize={12}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }} 
              dy={8}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }}
              domain={[0, 40]}
              ticks={[0, 10, 20, 30, 40]}
            />
            <Tooltip content={<CustomTooltip />} />
            {/* Stacked Bars */}
            <Bar dataKey="completed" stackId="a" fill="#2563eb" />
            <Bar dataKey="inProgress" stackId="a" fill="#a855f7" />
            <Bar dataKey="pending" stackId="a" fill="#f59e0b" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
