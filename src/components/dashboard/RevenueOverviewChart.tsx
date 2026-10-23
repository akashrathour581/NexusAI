import React, { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { ChevronDown, ArrowUp } from 'lucide-react';
import type { RevenueDataPoint } from '../../types/dashboard';

interface RevenueOverviewChartProps {
  data: RevenueDataPoint[];
}

export const RevenueOverviewChart: React.FC<RevenueOverviewChartProps> = ({ data }) => {
  const [timeRange, setTimeRange] = useState('This Year');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Custom customized dot that highlights the Aug point like in the screenshot
  const renderCustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    if (payload && payload.month === 'Aug') {
      return (
        <g key="aug-highlight">
          {/* Outer glow ring */}
          <circle cx={cx} cy={cy} r={7} fill="#2563eb" fillOpacity={0.2} />
          {/* Inner solid dot */}
          <circle cx={cx} cy={cy} r={4.5} fill="#2563eb" stroke="#ffffff" strokeWidth={2.5} />
          {/* Callout tooltip badge matching the screenshot */}
          <g transform={`translate(${cx - 45}, ${cy - 56})`}>
            <rect 
              width={90} 
              height={44} 
              rx={10} 
              fill="#ffffff" 
              stroke="#e2e8f0" 
              strokeWidth={1}
              className="drop-shadow-md dark:fill-slate-800 dark:stroke-slate-700" 
            />
            <text x={45} y={16} textAnchor="middle" fill="#64748b" fontSize={10} fontWeight={500}>
              Aug 2026
            </text>
            <text x={45} y={32} textAnchor="middle" fill="#0f172a" fontSize={12} fontWeight={700} className="dark:fill-white">
              $22,480
            </text>
          </g>
        </g>
      );
    }
    return (
      <circle 
        key={`dot-${payload?.month || Math.random()}`} 
        cx={cx} 
        cy={cy} 
        r={3.5} 
        fill="#2563eb" 
        stroke="#ffffff" 
        strokeWidth={1.5} 
      />
    );
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 p-2.5 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 text-xs">
          <p className="text-slate-500 dark:text-slate-400 font-medium">{label} 2026</p>
          <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
            ${payload[0].value.toLocaleString()}
          </p>
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
            Revenue Overview
          </h3>

          {/* Dropdown Selector */}
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
                {['This Year', 'Last 6 Months', 'All Time'].map((option) => (
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

        {/* Main Stat & Growth */}
        <div className="mt-2 flex items-baseline gap-3">
          <span className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            $12,450
          </span>
          <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
            <ArrowUp className="w-3.5 h-3.5" />
            <span>23%</span>
          </span>
        </div>
      </div>

      {/* Area Line Chart */}
      <div className="w-full h-[220px] mt-4 -ml-2 min-h-[220px]">
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={data} margin={{ top: 28, right: 10, left: -18, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.22} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
              </linearGradient>
            </defs>
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
              tickFormatter={(v) => `$${v / 1000}K`}
              domain={[0, 30000]}
              ticks={[0, 10000, 20000, 30000]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#2563eb"
              strokeWidth={2.5}
              fill="url(#revenueGradient)"
              dot={renderCustomDot}
              activeDot={{ r: 6, fill: '#2563eb', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
