import React, { useState } from 'react';
import { 
  Calendar, 
  Download, 
  Coins, 
  Users, 
  Filter, 
  Sparkles, 
  ChevronDown, 
  ArrowUp,
  Search, 
  Share2, 
  MousePointer, 
  UserCheck,
  FileText,
  AlertTriangle
} from 'lucide-react';
import { 
  ComposedChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

const monthlyGrowthData = [
  { month: 'Jan', revenue: 16000, newCustomers: 300, projects: 12 },
  { month: 'Feb', revenue: 20000, newCustomers: 380, projects: 14 },
  { month: 'Mar', revenue: 22000, newCustomers: 410, projects: 15 },
  { month: 'Apr', revenue: 27000, newCustomers: 490, projects: 16 },
  { month: 'May', revenue: 25000, newCustomers: 450, projects: 14 },
  { month: 'Jun', revenue: 29000, newCustomers: 520, projects: 17 },
  { month: 'Jul', revenue: 33000, newCustomers: 580, projects: 19 },
  { month: 'Aug', revenue: 28420, newCustomers: 142, projects: 18, highlight: true },
  { month: 'Sep', revenue: 39000, newCustomers: 670, projects: 20 },
  { month: 'Oct', revenue: 42580, newCustomers: 720, projects: 22 },
  { month: 'Nov', revenue: 46000, newCustomers: 780, projects: 24 },
  { month: 'Dec', revenue: 51000, newCustomers: 850, projects: 26 },
];

const customerDistributionData = [
  { name: 'Technology', percentage: '32%', count: 412, value: 32, color: '#3b82f6' },
  { name: 'Healthcare', percentage: '18%', count: 231, value: 18, color: '#8b5cf6' },
  { name: 'Finance', percentage: '15%', count: 192, value: 15, color: '#10b981' },
  { name: 'E-commerce', percentage: '14%', count: 180, value: 14, color: '#f59e0b' },
  { name: 'Construction', percentage: '10%', count: 128, value: 10, color: '#ec4899' },
  { name: 'Education', percentage: '8%', count: 103, value: 8, color: '#eab308' },
  { name: 'Other', percentage: '3%', count: 38, value: 3, color: '#94a3b8' },
];

const channelsData = [
  {
    rank: 1,
    name: 'Google Ads',
    visitors: '24,580',
    customers: '412',
    conversion: '12.4%',
    revenue: '$42,180',
    isPositive: true,
    icon: Search,
    iconColor: 'text-amber-500 bg-amber-50 dark:bg-amber-950/60',
  },
  {
    rank: 2,
    name: 'Organic Search',
    visitors: '18,420',
    customers: '286',
    conversion: '11.2%',
    revenue: '$28,450',
    isPositive: true,
    icon: Search,
    iconColor: 'text-blue-500 bg-blue-50 dark:bg-blue-950/60',
  },
  {
    rank: 3,
    name: 'LinkedIn',
    visitors: '12,310',
    customers: '184',
    conversion: '10.8%',
    revenue: '$18,920',
    isPositive: true,
    icon: Share2,
    iconColor: 'text-blue-700 bg-blue-50 dark:bg-blue-950/60',
  },
  {
    rank: 4,
    name: 'Direct Traffic',
    visitors: '9,840',
    customers: '142',
    conversion: '8.6%',
    revenue: '$14,220',
    isPositive: false,
    icon: MousePointer,
    iconColor: 'text-purple-600 bg-purple-50 dark:bg-purple-950/60',
  },
  {
    rank: 5,
    name: 'Referral',
    visitors: '6,210',
    customers: '98',
    conversion: '7.9%',
    revenue: '$10,180',
    isPositive: true,
    icon: UserCheck,
    iconColor: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60',
  },
  {
    rank: 6,
    name: 'Twitter / X',
    visitors: '4,980',
    customers: '62',
    conversion: '6.1%',
    revenue: '$6,890',
    isPositive: false,
    icon: Share2,
    iconColor: 'text-slate-800 bg-slate-100 dark:bg-slate-800 dark:text-slate-300',
  },
];

export const AnalyticsPage: React.FC = () => {
  const [activeRange, setActiveRange] = useState('1 Year');

  const rangeTabs = ['7 Days', '30 Days', '3 Months', '6 Months', '1 Year', 'Custom'];

  const renderAugCallout = (props: any) => {
    const { cx, cy, payload } = props;
    if (payload.month === 'Aug') {
      return (
        <g key="aug-tooltip">
          <circle cx={cx} cy={cy} r={6} fill="#6366f1" stroke="#ffffff" strokeWidth={2.5} />
          <g transform={`translate(${cx - 55}, ${cy - 72})`}>
            <rect width={110} height={60} rx={8} fill="#ffffff" stroke="#e2e8f0" className="drop-shadow-lg dark:fill-slate-800 dark:stroke-slate-700" />
            <text x={55} y={16} textAnchor="middle" fill="#64748b" fontSize={10} fontWeight={600}>Aug 2024</text>
            <text x={10} y={30} fill="#6366f1" fontSize={9} fontWeight={600}>● Revenue: $28,420</text>
            <text x={10} y={42} fill="#3b82f6" fontSize={9} fontWeight={500}>● New Customers: 142</text>
            <text x={10} y={54} fill="#8b5cf6" fontSize={9} fontWeight={500}>● Projects: 18</text>
          </g>
        </g>
      );
    }
    return (
      <circle key={`dot-${payload.month}`} cx={cx} cy={cy} r={3} fill="#6366f1" stroke="#ffffff" strokeWidth={1.5} />
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Export Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Analytics & Reports
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-normal">
            Track your business performance and get AI-powered insights to make better decisions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-2xs hover:bg-slate-50 transition-all">
            <Calendar className="w-4 h-4 text-slate-500" />
            <span>Jan 1, 2024 – Dec 31, 2024</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/25 active:scale-95 transition-all">
            <Download className="w-4 h-4 stroke-[2.5]" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Time Range Filter Pills matching Screenshot 1 */}
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
        {rangeTabs.map((tab) => {
          const isActive = activeRange === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveRange(tab)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white dark:bg-[#0f172a] text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800 hover:bg-slate-50'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* 4 KPI Cards with Sparklines matching Screenshot 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Revenue */}
        <div className="bg-white dark:bg-[#0f172a] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
                <Coins className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Revenue</span>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">$124,820</h3>
              </div>
            </div>
            {/* Sparkline curve */}
            <svg className="w-16 h-8 text-emerald-500 fill-none stroke-current stroke-2" viewBox="0 0 60 30">
              <path d="M 0,25 Q 15,20 30,12 T 60,5" />
            </svg>
          </div>
          <div className="mt-3 flex items-center gap-1 text-xs font-bold text-emerald-600">
            <span>↑ 18.6%</span>
            <span className="text-slate-400 font-normal">from last period</span>
          </div>
        </div>

        {/* Total Customers */}
        <div className="bg-white dark:bg-[#0f172a] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Customers</span>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">1,284</h3>
              </div>
            </div>
            <svg className="w-16 h-8 text-blue-500 fill-none stroke-current stroke-2" viewBox="0 0 60 30">
              <path d="M 0,22 Q 20,18 40,8 T 60,4" />
            </svg>
          </div>
          <div className="mt-3 flex items-center gap-1 text-xs font-bold text-emerald-600">
            <span>↑ 12.2%</span>
            <span className="text-slate-400 font-normal">from last period</span>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="bg-white dark:bg-[#0f172a] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center">
                <Filter className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Conversion Rate</span>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">8.42%</h3>
              </div>
            </div>
            <svg className="w-16 h-8 text-purple-500 fill-none stroke-current stroke-2" viewBox="0 0 60 30">
              <path d="M 0,20 Q 15,25 30,15 T 60,8" />
            </svg>
          </div>
          <div className="mt-3 flex items-center gap-1 text-xs font-bold text-emerald-600">
            <span>↑ 2.1%</span>
            <span className="text-slate-400 font-normal">from last period</span>
          </div>
        </div>

        {/* AI Insights Generated */}
        <div className="bg-white dark:bg-[#0f172a] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-pink-50 dark:bg-pink-950/60 text-pink-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">AI Insights Generated</span>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">46</h3>
              </div>
            </div>
            <svg className="w-16 h-8 text-pink-500 fill-none stroke-current stroke-2" viewBox="0 0 60 30">
              <path d="M 0,26 Q 20,10 40,20 T 60,6" />
            </svg>
          </div>
          <div className="mt-3 flex items-center gap-1 text-xs font-bold text-emerald-600">
            <span>↑ 35.3%</span>
            <span className="text-slate-400 font-normal">from last period</span>
          </div>
        </div>
      </div>

      {/* Middle Section: Revenue Growth Chart + Customer Distribution Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Revenue Growth Composed Chart */}
        <div className="lg:col-span-8 bg-white dark:bg-[#0f172a] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white tracking-tight">Revenue Growth</h3>
              <p className="text-xs text-slate-400 mt-0.5">Monthly revenue, new customers and project value trend.</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
                <span className="flex items-center gap-1 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-600" /> Revenue
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> New Customers
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-300" /> Projects
                </span>
              </div>

              <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200">
                <span>Monthly</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>

          <div className="w-full h-[260px] mt-6 min-h-[260px] -ml-2">
            <ResponsiveContainer width="100%" height={260}>
              <ComposedChart data={monthlyGrowthData} margin={{ top: 25, right: 20, bottom: 0, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={(v) => `$${v / 1000}K`} domain={[0, 60000]} />
                <Tooltip />
                <Bar dataKey="newCustomers" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={10} />
                <Bar dataKey="projects" fill="#c084fc" radius={[4, 4, 0, 0]} barSize={10} />
                <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2.5} dot={renderAugCallout} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Customer Distribution Donut Chart */}
        <div className="lg:col-span-4 bg-white dark:bg-[#0f172a] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white tracking-tight">
              Customer Distribution
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Total 1,284 customers across different industries.</p>
          </div>

          <div className="flex items-center justify-between gap-4 my-auto pt-3">
            <div className="relative w-40 h-40 shrink-0">
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie
                    data={customerDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={72}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {customerDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-lg font-extrabold text-slate-900 dark:text-white">1,284</span>
                <span className="text-[10px] text-slate-400 font-medium">Total Customers</span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs flex-1">
              {customerDistributionData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-600 dark:text-slate-400 font-medium">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                    <span>{item.percentage}</span>
                    <span className="text-slate-400 font-normal">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Top Performing Channels + Recent Activity & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Top Performing Channels Table */}
        <div className="lg:col-span-8 bg-white dark:bg-[#0f172a] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white tracking-tight">Top Performing Channels</h3>
              <p className="text-xs text-slate-400 mt-0.5">Compare performance across different acquisition channels.</p>
            </div>
            <button className="text-xs font-semibold text-blue-600 hover:underline">View All →</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="pb-3 w-8">#</th>
                  <th className="pb-3">Channel</th>
                  <th className="pb-3">Visitors</th>
                  <th className="pb-3">Customers</th>
                  <th className="pb-3">Conversion Rate</th>
                  <th className="pb-3">Revenue</th>
                  <th className="pb-3">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/80 dark:divide-slate-800/60 font-medium text-slate-700 dark:text-slate-300">
                {channelsData.map((ch) => {
                  const Icon = ch.icon;
                  return (
                    <tr key={ch.name} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 text-slate-400 font-bold">{ch.rank}</td>
                      <td className="py-3 flex items-center gap-2.5 font-bold text-slate-900 dark:text-white">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${ch.iconColor}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span>{ch.name}</span>
                      </td>
                      <td className="py-3">{ch.visitors}</td>
                      <td className="py-3">{ch.customers}</td>
                      <td className="py-3">{ch.conversion}</td>
                      <td className="py-3 font-bold text-slate-900 dark:text-white">{ch.revenue}</td>
                      <td className="py-3">
                        {ch.isPositive ? (
                          <svg className="w-12 h-4 text-emerald-500 fill-none stroke-current stroke-2" viewBox="0 0 50 16">
                            <path d="M 0,14 Q 25,12 50,2" />
                          </svg>
                        ) : (
                          <svg className="w-12 h-4 text-rose-500 fill-none stroke-current stroke-2" viewBox="0 0 50 16">
                            <path d="M 0,2 Q 25,6 50,14" />
                          </svg>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity & Insights */}
        <div className="lg:col-span-4 bg-white dark:bg-[#0f172a] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-base text-slate-900 dark:text-white tracking-tight">
              Recent Activity & Insights
            </h3>
            <button className="text-xs font-semibold text-blue-600 hover:underline">
              View All →
            </button>
          </div>

          <div className="space-y-3">
            {[
              {
                title: 'Revenue increased by 18.6%',
                desc: 'Your revenue is up by 18.6% compared to last period.',
                time: '2 hours ago',
                icon: ArrowUp,
                color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60',
              },
              {
                title: 'AI identified a new growth opportunity',
                desc: 'Construction industry shows 40% higher conversion potential.',
                time: '5 hours ago',
                icon: Sparkles,
                color: 'bg-purple-50 text-purple-600 dark:bg-purple-950/60',
              },
              {
                title: 'New enterprise client onboarded',
                desc: 'TechBuild Inc. joined with an annual contract of $12,000.',
                time: '1 day ago',
                icon: Users,
                color: 'bg-blue-50 text-blue-600 dark:bg-blue-950/60',
              },
              {
                title: 'High engagement on recent content',
                desc: 'Your latest guide received 2.4x more views than average.',
                time: '1 day ago',
                icon: FileText,
                color: 'bg-amber-50 text-amber-600 dark:bg-amber-950/60',
              },
              {
                title: 'Conversion rate improved',
                desc: 'Your conversion rate increased from 6.3% to 8.4%.',
                time: '2 days ago',
                icon: AlertTriangle,
                color: 'bg-rose-50 text-rose-600 dark:bg-rose-950/60',
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-start justify-between gap-3 text-xs p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <div className="flex items-start gap-2.5">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${item.color}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white leading-snug">{item.title}</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0">{item.time}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
