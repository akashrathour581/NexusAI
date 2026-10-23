import React, { useState } from 'react';
import { 
  Sparkles, 
  Plus, 
  BarChart2, 
  Search, 
  FolderKanban, 
  LineChart, 
  PenTool, 
  MoreHorizontal, 
  Paperclip, 
  Globe, 
  Mic, 
  Send, 
  FileSpreadsheet, 
  Database, 
  FileText, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  Lightbulb, 
  Boxes, 
  Layers, 
  Zap, 
  ChevronRight, 
  FileCheck2, 
  Presentation, 
  Image,
  Wrench,
  MessageSquare
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  Tooltip 
} from 'recharts';

const revenueTrendData = [
  { month: 'Jul', revenue: 15000 },
  { month: '', revenue: 22000 },
  { month: '', revenue: 20000 },
  { month: '', revenue: 25000 },
  { month: 'Aug', revenue: 32000 },
  { month: '', revenue: 29000 },
  { month: '', revenue: 35000 },
  { month: 'Sep', revenue: 42580 },
];

const topProducts = [
  { name: 'AI Workspace Pro', revenue: '$42,580', growth: '+28%', progress: 85, color: 'bg-blue-600', icon: Boxes, iconBg: 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400' },
  { name: 'Team Collaboration', revenue: '$28,430', growth: '+18%', progress: 60, color: 'bg-purple-600', icon: Layers, iconBg: 'bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400' },
  { name: 'Data Analytics Suite', revenue: '$24,120', growth: '+35%', progress: 50, color: 'bg-pink-500', icon: BarChart2, iconBg: 'bg-pink-50 text-pink-600 dark:bg-pink-950/60 dark:text-pink-400' },
  { name: 'Automation Toolkit', revenue: '$18,320', growth: '+12%', progress: 40, color: 'bg-amber-500', icon: Zap, iconBg: 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400' },
];

export const AIAssistantPage: React.FC = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; time: string }>>([]);

  const quickPills = [
    { label: 'Market Analysis', icon: BarChart2 },
    { label: 'Competitor Research', icon: Search },
    { label: 'Project Planning', icon: FolderKanban },
    { label: 'Data Insights', icon: LineChart },
    { label: 'Create Content', icon: PenTool },
  ];

  const handleSend = () => {
    if (!inputMessage.trim()) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userText = inputMessage;
    setInputMessage('');

    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: userText, time: timeStr },
    ]);

    // Simulated responsive AI feedback
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `I've analyzed your query regarding "${userText}". All connected workspace databases and analytics pipelines have been queried. Let me know if you would like me to generate an executive report or export these insights.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 800);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Main Chat Thread & Copilot Area */}
      <div className="flex-1 flex flex-col space-y-6">
        {/* Page Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              AI Assistant
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Your intelligent business copilot for research, analysis and automation.
            </p>
          </div>
        </div>

        {/* Quick Prompt Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shrink-0 shadow-md shadow-purple-600/20 active:scale-95 transition-all">
            <Plus className="w-3.5 h-3.5" />
            <span>New Chat</span>
          </button>

          {quickPills.map((pill) => {
            const Icon = pill.icon;
            return (
              <button
                key={pill.label}
                onClick={() => setInputMessage(`Analyze ${pill.label.toLowerCase()} for Q3 2026`)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-[#0f172a] hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-800 text-xs font-semibold shrink-0 transition-colors shadow-2xs"
              >
                <Icon className="w-3.5 h-3.5 text-slate-400" />
                <span>{pill.label}</span>
              </button>
            );
          })}

          <button className="p-2 rounded-xl bg-white dark:bg-[#0f172a] hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 border border-slate-200/80 dark:border-slate-800 shrink-0">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Conversation Thread */}
        <div className="space-y-6">
          {/* User Message Bubble */}
          <div className="flex items-start justify-end gap-3 max-w-3xl ml-auto">
            <div className="flex flex-col items-end">
              <div className="bg-[#eef2ff] dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/60 rounded-2xl rounded-tr-xs px-4 py-3 shadow-xs">
                <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-100">
                  Analyze our Q3 2026 sales data and give me key insights, trends and recommendations.
                </p>
              </div>
              <span className="text-[10px] text-slate-400 mt-1 mr-1">10:24 AM</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 ring-2 ring-blue-500/30">
              AR
            </div>
          </div>

          {/* AI Response Bubble matching screenshot */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#0a1120] text-blue-400 font-extrabold text-sm flex items-center justify-center shrink-0 ring-2 ring-blue-500/20 shadow-md">
              N
            </div>

            <div className="flex-1 bg-white dark:bg-[#0f172a] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-5">
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                Here's a comprehensive analysis of your Q3 2026 sales data. I've analyzed revenue, product performance, customer segments and regional trends to provide key insights and actionable recommendations.
              </p>

              {/* 4 Embedded Metric Cards inside the response */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-slate-50 dark:bg-slate-900/50 p-3.5 rounded-xl border border-slate-200/60 dark:border-slate-800/60 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block">Total Revenue</span>
                    <span className="text-base font-extrabold text-slate-900 dark:text-white">$128,420</span>
                    <span className="text-[10px] font-bold text-emerald-600 block">↑ +24% vs Q2 2026</span>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900/50 p-3.5 rounded-xl border border-slate-200/60 dark:border-slate-800/60 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block">Total Orders</span>
                    <span className="text-base font-extrabold text-slate-900 dark:text-white">1,842</span>
                    <span className="text-[10px] font-bold text-emerald-600 block">↑ +18% vs Q2 2026</span>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900/50 p-3.5 rounded-xl border border-slate-200/60 dark:border-slate-800/60 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block">New Customers</span>
                    <span className="text-base font-extrabold text-slate-900 dark:text-white">416</span>
                    <span className="text-[10px] font-bold text-emerald-600 block">↑ +32% vs Q2 2026</span>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900/50 p-3.5 rounded-xl border border-slate-200/60 dark:border-slate-800/60 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block">Avg. Order Value</span>
                    <span className="text-base font-extrabold text-slate-900 dark:text-white">$69.70</span>
                    <span className="text-[10px] font-bold text-emerald-600 block">↑ +12% vs Q2 2026</span>
                  </div>
                </div>
              </div>

              {/* Embedded Charts Row (Revenue Trend & Top Performing Products) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Revenue Trend Area Chart */}
                <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Revenue Trend</h4>
                    <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded-md">
                      ↗ +24% vs Q2
                    </span>
                  </div>
                  <div className="h-44 w-full">
                    <ResponsiveContainer width="100%" height={176}>
                      <AreaChart data={revenueTrendData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                        <defs>
                          <linearGradient id="aiTrendGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} tickFormatter={(v) => `$${v / 1000}K`} />
                        <Tooltip />
                        <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fill="url(#aiTrendGradient)" dot={{ r: 3, fill: '#6366f1' }} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Top Performing Products */}
                <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Top Performing Products</h4>
                    <span className="text-[11px] font-semibold text-slate-500 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded-md">Revenue ▾</span>
                  </div>

                  <div className="space-y-3">
                    {topProducts.map((prod) => {
                      const Icon = prod.icon;
                      return (
                        <div key={prod.name} className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-200">
                              <div className={`w-5 h-5 rounded-sm flex items-center justify-center ${prod.iconBg}`}>
                                <Icon className="w-3.5 h-3.5" />
                              </div>
                              <span>{prod.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900 dark:text-white">{prod.revenue}</span>
                              <span className="text-emerald-600 font-bold text-[10px]">{prod.growth}</span>
                            </div>
                          </div>
                          <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${prod.color}`} style={{ width: `${prod.progress}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Key Insights Callout Box */}
              <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40">
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-xs mb-2.5">
                  <Lightbulb className="w-4 h-4 fill-amber-400" />
                  <span>Key Insights</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                    <span><strong>Revenue Growth</strong>: Q3 2026 revenue increased by 24% compared to Q2, driven by strong demand for AI Workspace Pro.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                    <span><strong>Customer Acquisition</strong>: 416 new customers (32% growth), with highest growth in mid-market segment.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                    <span><strong>Top Performing Product</strong>: AI Workspace Pro contributed 33% of total revenue and showed consistent month-over-month growth.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                    <span><strong>Regional Performance</strong>: North America showed 28% growth, followed by Europe at 22%.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                    <span><strong>Recommendation</strong>: Focus on scaling AI Workspace Pro, increase marketing in European market, and introduce bundle offerings.</span>
                  </li>
                </ul>
              </div>

              {/* Data Sources Badges */}
              <div className="flex items-center gap-2 flex-wrap text-xs pt-1">
                <span className="font-bold text-slate-400 text-[11px]">Data Sources</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/40 text-[11px] font-medium">
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Q3_Sales_Data.xlsx</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/40 text-[11px] font-medium">
                  <Database className="w-3.5 h-3.5" />
                  <span>CRM Database</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/40 text-[11px] font-medium">
                  <BarChart2 className="w-3.5 h-3.5" />
                  <span>Analytics Platform</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/40 text-[11px] font-medium">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Product Performance Report</span>
                </span>
                <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 text-[11px] font-semibold">
                  +2 more
                </span>
              </div>

              {/* Follow-up Action Buttons */}
              <div className="flex items-center gap-2.5 flex-wrap pt-2 border-t border-slate-100 dark:border-slate-800">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-xs transition-all active:scale-95">
                  <FileCheck2 className="w-3.5 h-3.5" />
                  <span>Create detailed report</span>
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium transition-all">
                  <Presentation className="w-3.5 h-3.5 text-slate-400" />
                  <span>Generate presentation</span>
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium transition-all">
                  <Search className="w-3.5 h-3.5 text-slate-400" />
                  <span>Find competitors</span>
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium transition-all">
                  <Lightbulb className="w-3.5 h-3.5 text-slate-400" />
                  <span>Suggest strategies</span>
                </button>
                <button className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 hover:bg-slate-50">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Additional Dynamic Messages if sent */}
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end max-w-3xl ml-auto' : ''}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-[#0a1120] text-blue-400 font-extrabold text-sm flex items-center justify-center shrink-0 ring-2 ring-blue-500/20 shadow-md">
                  N
                </div>
              )}
              <div className={`p-4 rounded-2xl shadow-xs text-xs sm:text-sm ${
                msg.sender === 'user'
                  ? 'bg-[#eef2ff] dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/60 text-slate-800 dark:text-slate-100 rounded-tr-xs'
                  : 'bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 flex-1'
              }`}>
                <p>{msg.text}</p>
                <span className="text-[10px] text-slate-400 mt-1 block text-right">{msg.time}</span>
              </div>
              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 ring-2 ring-blue-500/30">
                  AR
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Chat Prompt Input */}
        <div className="sticky bottom-4 z-20 bg-white dark:bg-[#0f172a] rounded-2xl p-2.5 border border-slate-200/80 dark:border-slate-800/80 shadow-xl flex items-center gap-2">
          <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <Paperclip className="w-4 h-4" />
          </button>
          
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything... (e.g. analyze data, create a report, summarize documents)"
            className="flex-1 text-xs sm:text-sm bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden px-2"
          />

          <div className="flex items-center gap-1.5 shrink-0">
            <button className="p-2 text-slate-400 hover:text-blue-500 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <Globe className="w-4 h-4" />
            </button>
            <button className="p-2 text-slate-400 hover:text-blue-500 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <Mic className="w-4 h-4" />
            </button>
            <button
              onClick={handleSend}
              className="w-9 h-9 rounded-xl bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center shadow-md shadow-purple-600/30 active:scale-95 transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Right Sidebar: AI Tools & Recent Conversations */}
      <div className="w-full lg:w-80 shrink-0 space-y-6">
        {/* AI Tools Card */}
        <div className="bg-white dark:bg-[#0f172a] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>AI Tools</span>
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Use powerful AI tools to boost your productivity.
            </p>
          </div>

          <div className="space-y-2">
            {[
              { title: 'Research', desc: 'Get real-time information and market insights', icon: Search, bg: 'bg-purple-50 text-purple-600 dark:bg-purple-950/60' },
              { title: 'Document Analysis', desc: 'Analyze PDFs, reports, contracts and extract insights', icon: FileText, bg: 'bg-blue-50 text-blue-600 dark:bg-blue-950/60' },
              { title: 'Content Generation', desc: 'Create emails, proposals, blogs and marketing content', icon: PenTool, bg: 'bg-purple-50 text-purple-600 dark:bg-purple-950/60' },
              { title: 'Data Analysis', desc: 'Analyze your business data and generate insights', icon: BarChart2, bg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60' },
              { title: 'Image Generation', desc: 'Create visuals, diagrams and product images', icon: Image, bg: 'bg-amber-50 text-amber-600 dark:bg-amber-950/60' },
              { title: 'Custom Tools', desc: 'Build your own AI workflows', icon: Wrench, bg: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60' },
            ].map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.title}
                  className="p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 flex items-center justify-between group cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${tool.bg}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-purple-600 transition-colors">
                        {tool.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 truncate">
                        {tool.desc}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Conversations */}
        <div className="bg-white dark:bg-[#0f172a] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Recent Conversations
            </h3>
            <button className="text-[11px] font-semibold text-purple-600 hover:underline">
              View all
            </button>
          </div>

          <div className="space-y-1">
            {[
              { title: 'Q3 sales analysis', time: '10:24 AM', active: true },
              { title: 'Competitor comparison', time: 'Yesterday', active: false },
              { title: 'Marketing content ideas', time: 'Oct 28', active: false },
              { title: 'Project planning', time: 'Oct 26', active: false },
              { title: 'Summarize contract', time: 'Oct 25', active: false },
            ].map((conv) => (
              <div
                key={conv.title}
                className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-colors ${
                  conv.active
                    ? 'bg-purple-50 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 font-semibold'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium'
                }`}
              >
                <div className="flex items-center gap-2.5 text-xs truncate">
                  <MessageSquare className={`w-3.5 h-3.5 shrink-0 ${conv.active ? 'text-purple-600' : 'text-slate-400'}`} />
                  <span className="truncate">{conv.title}</span>
                </div>
                <span className="text-[10px] text-slate-400 shrink-0 ml-2">{conv.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
