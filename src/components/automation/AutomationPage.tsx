import React, { useState } from 'react';
import { 
  Cpu, 
  Plus, 
  Search, 
  Play, 
  CheckCircle2, 
  Clock, 
  Zap, 
  Bot, 
  Mail, 
  Database, 
  FileText, 
  Sparkles,
  X
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface Workflow {
  id: string;
  name: string;
  description: string;
  trigger: string;
  action: string;
  status: 'Active' | 'Paused';
  runsCount: number;
  successRate: string;
  lastRun: string;
  icon: any;
  iconBg: string;
}

const initialWorkflows: Workflow[] = [
  {
    id: 'wf-1',
    name: 'Auto-Triage Customer Inquiries',
    description: 'Classify inbound support tickets with AI, assign priority tags, and route to specific team members.',
    trigger: 'New Zendesk ticket received',
    action: 'AI Categorization & Slack notification',
    status: 'Active',
    runsCount: 412,
    successRate: '99.8%',
    lastRun: '4 mins ago',
    icon: Mail,
    iconBg: 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400',
  },
  {
    id: 'wf-2',
    name: 'Daily Financial & Revenue Summary',
    description: 'Compile daily revenue figures, conversion rates, and orders into an executive briefing document.',
    trigger: 'Everyday at 08:00 AM UTC',
    action: 'Generate AI Report & Email Executive team',
    status: 'Active',
    runsCount: 31,
    successRate: '100%',
    lastRun: '4 hours ago',
    icon: Database,
    iconBg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400',
  },
  {
    id: 'wf-3',
    name: 'Sales Lead Enrichment & Scoring',
    description: 'Scan new prospect websites, extract company revenue and tech stack, and score lead viability.',
    trigger: 'New lead added to CRM',
    action: 'AI Deep Web Research & CRM update',
    status: 'Active',
    runsCount: 184,
    successRate: '99.1%',
    lastRun: '18 mins ago',
    icon: Sparkles,
    iconBg: 'bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400',
  },
  {
    id: 'wf-4',
    name: 'Document Data Extraction Pipeline',
    description: 'Parse uploaded invoices, contracts, and proposals, extracting dates, amounts, and signature status.',
    trigger: 'New PDF document upload',
    action: 'OCR Entity Extraction & Auto-tagging',
    status: 'Active',
    runsCount: 89,
    successRate: '98.7%',
    lastRun: '1 hour ago',
    icon: FileText,
    iconBg: 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400',
  },
  {
    id: 'wf-5',
    name: 'Weekly Sprint Retrospective Digest',
    description: 'Analyze commit velocity, closed tasks, and blockers across all active engineering projects.',
    trigger: 'Friday at 05:00 PM',
    action: 'AI Synthesis & Slack Team post',
    status: 'Paused',
    runsCount: 12,
    successRate: '100%',
    lastRun: '5 days ago',
    icon: Bot,
    iconBg: 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400',
  },
];

export const AutomationPage: React.FC = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>(initialWorkflows);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  // New Workflow Form
  const [newWfName, setNewWfName] = useState('');
  const [newWfDesc, setNewWfDesc] = useState('');
  const [newWfTrigger, setNewWfTrigger] = useState('Scheduled (Cron)');
  const [newWfAction, setNewWfAction] = useState('AI Text Generation & Slack Alert');

  const { success, info } = useToast();

  const handleToggleStatus = (id: string) => {
    setWorkflows((prev) =>
      prev.map((wf) => {
        if (wf.id === id) {
          const newStatus = wf.status === 'Active' ? 'Paused' : 'Active';
          if (newStatus === 'Active') {
            success('Automation Resumed', `"${wf.name}" is now running.`);
          } else {
            info('Automation Paused', `"${wf.name}" has been paused.`);
          }
          return { ...wf, status: newStatus };
        }
        return wf;
      })
    );
  };

  const handleRunNow = (name: string) => {
    info('Triggering Automation', `Running "${name}" immediately...`);
    setTimeout(() => {
      success('Execution Succeeded', `"${name}" completed in 1.4s with 0 errors.`);
    }, 1400);
  };

  const handleCreateWorkflow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWfName.trim()) return;

    const created: Workflow = {
      id: `wf-${Date.now()}`,
      name: newWfName,
      description: newWfDesc || 'Custom automated business routine powered by NexusAI intelligence.',
      trigger: newWfTrigger,
      action: newWfAction,
      status: 'Active',
      runsCount: 0,
      successRate: '100%',
      lastRun: 'Just now',
      icon: Cpu,
      iconBg: 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400',
    };

    setWorkflows([created, ...workflows]);
    success('Workflow Created', `"${newWfName}" is now active and monitoring triggers.`);
    setIsNewModalOpen(false);
    setNewWfName('');
    setNewWfDesc('');
  };

  const filteredWorkflows = workflows.filter(
    (w) =>
      w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            AI Automation Workflows
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-normal">
            Automate business processes, data extraction, and cross-platform handoffs with intelligent agents.
          </p>
        </div>

        <button
          onClick={() => setIsNewModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/25 active:scale-95 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>New Workflow</span>
        </button>
      </div>

      {/* 4 KPI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-[#0f172a] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Active Automations</span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">
              {workflows.filter((w) => w.status === 'Active').length}
            </h3>
            <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-600 mt-1">
              <span>↑ 24%</span>
              <span className="text-slate-400 font-normal">from last month</span>
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0f172a] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <Play className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Runs (Today)</span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">1,420</h3>
            <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-600 mt-1">
              <span>↑ 38%</span>
              <span className="text-slate-400 font-normal">from yesterday</span>
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0f172a] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Success Rate</span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">99.8%</h3>
            <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-600 mt-1">
              <span>↑ 0.4%</span>
              <span className="text-slate-400 font-normal">reliability</span>
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0f172a] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Hours Saved</span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">340 hrs</h3>
            <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-600 mt-1">
              <span>↑ 45%</span>
              <span className="text-slate-400 font-normal">automation ROI</span>
            </span>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex items-center justify-between gap-3 bg-white dark:bg-[#0f172a] p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-2xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search automation workflows, triggers or actions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden"
          />
        </div>

        <span className="text-xs font-semibold text-slate-400">
          Showing {filteredWorkflows.length} workflows
        </span>
      </div>

      {/* Workflows List */}
      <div className="space-y-4">
        {filteredWorkflows.map((wf) => {
          const Icon = wf.icon;
          const isActive = wf.status === 'Active';

          return (
            <div
              key={wf.id}
              className="bg-white dark:bg-[#0f172a] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-5"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${wf.iconBg}`}>
                  <Icon className="w-6 h-6" />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2.5">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">{wf.name}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive 
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300' 
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                    }`}>
                      ● {wf.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
                    {wf.description}
                  </p>

                  <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
                    <span className="flex items-center gap-1 font-medium">
                      <strong className="text-slate-600 dark:text-slate-300">Trigger:</strong> {wf.trigger}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-medium">
                      <strong className="text-slate-600 dark:text-slate-300">Action:</strong> {wf.action}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons & Status Toggle */}
              <div className="flex items-center gap-3 shrink-0 self-end md:self-auto border-t md:border-t-0 pt-3 md:pt-0 w-full md:w-auto justify-between md:justify-end">
                <div className="text-right text-xs pr-2 hidden sm:block">
                  <p className="font-bold text-slate-900 dark:text-white">{wf.runsCount} runs</p>
                  <p className="text-[10px] text-slate-400">Last: {wf.lastRun}</p>
                </div>

                <button
                  onClick={() => handleRunNow(wf.name)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1.5 active:scale-95 transition-all"
                >
                  <Play className="w-3.5 h-3.5 text-blue-600" />
                  <span>Run Now</span>
                </button>

                <button
                  onClick={() => handleToggleStatus(wf.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm'
                  }`}
                >
                  {isActive ? 'Pause' : 'Activate'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* New Workflow Modal */}
      {isNewModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setIsNewModalOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/60 text-blue-600 flex items-center justify-center">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">Create Automation Workflow</h3>
                  <p className="text-xs text-slate-400">Deploy an intelligent autonomous routine</p>
                </div>
              </div>
              <button onClick={() => setIsNewModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateWorkflow} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                  Workflow Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Inbound Invoice Processor"
                  value={newWfName}
                  onChange={(e) => setNewWfName(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe the objective of this automation..."
                  value={newWfDesc}
                  onChange={(e) => setNewWfDesc(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                    Trigger Event
                  </label>
                  <select
                    value={newWfTrigger}
                    onChange={(e) => setNewWfTrigger(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="New document upload">New Document Upload</option>
                    <option value="New CRM lead created">New CRM Lead Created</option>
                    <option value="Scheduled (Cron)">Scheduled Daily</option>
                    <option value="Webhook HTTP request">Webhook / API Call</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                    Target Action
                  </label>
                  <select
                    value={newWfAction}
                    onChange={(e) => setNewWfAction(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="AI Categorization & Slack notification">AI Classification & Slack</option>
                    <option value="AI Extraction to Database">AI Extraction to DB</option>
                    <option value="Generate AI Report & Email Executive">Generate & Email Report</option>
                    <option value="Auto-reply via AI Copilot">Auto-reply via Copilot</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md active:scale-95 transition-all"
                >
                  Deploy Workflow
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
