import React, { useState } from 'react';
import { 
  Boxes, 
  Search, 
  CheckCircle2, 
  ExternalLink, 
  Settings2, 
  Zap, 
  ShieldCheck, 
  Activity, 
  Key, 
  Plus, 
  X, 
  Copy, 
  Check, 
  Cpu
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface Integration {
  id: string;
  name: string;
  category: 'Communication' | 'Development' | 'Payments' | 'Productivity' | 'CRM' | 'AI & ML';
  description: string;
  connected: boolean;
  status: 'Operational' | 'Syncing' | 'Requires Attention';
  lastSync: string;
  apiCallsCount: string;
  iconBg: string;
  iconColor: string;
  badgeText: string;
}

const initialIntegrations: Integration[] = [
  {
    id: 'slack',
    name: 'Slack',
    category: 'Communication',
    description: 'Send automated AI insights, project milestone alerts, and workflow notices directly into team channels.',
    connected: true,
    status: 'Operational',
    lastSync: '2 mins ago',
    apiCallsCount: '18.4k',
    iconBg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
    iconColor: 'text-emerald-500',
    badgeText: 'SL',
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'Development',
    description: 'Track repository pull requests, commit activity, CI/CD deployment pipelines, and link code to project tasks.',
    connected: true,
    status: 'Operational',
    lastSync: '12 mins ago',
    apiCallsCount: '42.1k',
    iconBg: 'bg-slate-800/10 dark:bg-slate-700/30',
    iconColor: 'text-slate-800 dark:text-slate-200',
    badgeText: 'GH',
  },
  {
    id: 'stripe',
    name: 'Stripe',
    category: 'Payments',
    description: 'Real-time billing synchronization, subscription churn analytics, automated invoicing, and transaction auditing.',
    connected: true,
    status: 'Operational',
    lastSync: '5 mins ago',
    apiCallsCount: '64.9k',
    iconBg: 'bg-indigo-500/10 dark:bg-indigo-500/20',
    iconColor: 'text-indigo-500',
    badgeText: 'ST',
  },
  {
    id: 'google-workspace',
    name: 'Google Workspace',
    category: 'Productivity',
    description: 'Sync company calendar milestones, Google Drive documentation, team Gmail digests, and meet schedules.',
    connected: true,
    status: 'Operational',
    lastSync: '1 hr ago',
    apiCallsCount: '15.2k',
    iconBg: 'bg-blue-500/10 dark:bg-blue-500/20',
    iconColor: 'text-blue-500',
    badgeText: 'GW',
  },
  {
    id: 'jira',
    name: 'Jira Software',
    category: 'Development',
    description: 'Bi-directional sprint synchronizer, issue backlog sync, and automated epic velocity calculation with NexusAI.',
    connected: false,
    status: 'Requires Attention',
    lastSync: 'Never',
    apiCallsCount: '0',
    iconBg: 'bg-blue-600/10 dark:bg-blue-600/20',
    iconColor: 'text-blue-600',
    badgeText: 'JR',
  },
  {
    id: 'hubspot',
    name: 'HubSpot CRM',
    category: 'CRM',
    description: 'Sync qualified inbound leads, pipeline deal stages, client contact logs, and revenue attribution metrics.',
    connected: true,
    status: 'Syncing',
    lastSync: 'Just now',
    apiCallsCount: '29.3k',
    iconBg: 'bg-amber-500/10 dark:bg-amber-500/20',
    iconColor: 'text-amber-500',
    badgeText: 'HS',
  },
  {
    id: 'notion',
    name: 'Notion',
    category: 'Productivity',
    description: 'Embed executive briefs, sync internal wikis, and publish auto-generated AI research directly to Notion workspaces.',
    connected: false,
    status: 'Requires Attention',
    lastSync: 'Never',
    apiCallsCount: '0',
    iconBg: 'bg-slate-500/10 dark:bg-slate-500/20',
    iconColor: 'text-slate-600 dark:text-slate-300',
    badgeText: 'NT',
  },
  {
    id: 'openai',
    name: 'OpenAI API',
    category: 'AI & ML',
    description: 'Connect enterprise custom fine-tuned GPT models, embeddings endpoints, and vector search clusters.',
    connected: true,
    status: 'Operational',
    lastSync: '1 min ago',
    apiCallsCount: '112.5k',
    iconBg: 'bg-teal-500/10 dark:bg-teal-500/20',
    iconColor: 'text-teal-500',
    badgeText: 'AI',
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    category: 'CRM',
    description: 'Enterprise multi-org client synchronizer, opportunity stage telemetry, and AI win-loss forecasting.',
    connected: false,
    status: 'Requires Attention',
    lastSync: 'Never',
    apiCallsCount: '0',
    iconBg: 'bg-sky-500/10 dark:bg-sky-500/20',
    iconColor: 'text-sky-500',
    badgeText: 'SF',
  },
];

export const IntegrationsPage: React.FC = () => {
  const { success, info } = useToast();
  const [integrations, setIntegrations] = useState<Integration[]>(initialIntegrations);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('sk_live_enterprise_94f8a3e79b2c');
  const [copiedKey, setCopiedKey] = useState(false);
  const [syncFrequency, setSyncFrequency] = useState('Real-time (Webhooks)');

  const categories = ['All', 'Communication', 'Development', 'Payments', 'Productivity', 'CRM', 'AI & ML'];

  // Toggle connection state
  const handleToggleConnection = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIntegrations((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextState = !item.connected;
          if (nextState) {
            success(`Connected to ${item.name}`, 'Syncing schema and background events now.');
          } else {
            info(`Disconnected ${item.name}`, 'API sync paused.');
          }
          return {
            ...item,
            connected: nextState,
            status: nextState ? 'Operational' : 'Requires Attention',
            lastSync: nextState ? 'Just now' : 'Never',
          };
        }
        return item;
      })
    );
  };

  const handleOpenConfig = (item: Integration) => {
    setSelectedIntegration(item);
    setApiKeyInput(`sk_${item.id}_live_${Math.random().toString(36).substring(2, 10)}`);
    setIsConfigModalOpen(true);
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIntegration) return;

    setIntegrations((prev) =>
      prev.map((item) =>
        item.id === selectedIntegration.id
          ? { ...item, connected: true, status: 'Operational', lastSync: 'Just now' }
          : item
      )
    );

    success(`${selectedIntegration.name} Configuration Saved`, 'Credentials and sync frequency updated successfully.');
    setIsConfigModalOpen(false);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const filteredIntegrations = integrations.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = activeCategory === 'All' || item.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  const connectedCount = integrations.filter((i) => i.connected).length;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <span>Integrations & APIs</span>
            <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
              {connectedCount} Connected
            </span>
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Connect your cloud ecosystem, manage webhooks, and trigger synchronized AI actions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              const testItem = integrations.find(i => !i.connected) || integrations[0];
              handleOpenConfig(testItem);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-500/20 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Custom Integration</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#0f172a] p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Active Connectors</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Boxes className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">{connectedCount}</span>
            <span className="text-xs text-slate-400">of {integrations.length} available</span>
          </div>
          <div className="mt-2 text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>All healthy & responding</span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0f172a] p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Sync Uptime</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">99.98%</span>
            <span className="text-xs text-emerald-500 font-semibold">+0.04%</span>
          </div>
          <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Past 30 days telemetry
          </div>
        </div>

        <div className="bg-white dark:bg-[#0f172a] p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">API Calls (Today)</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">281,410</span>
            <span className="text-xs text-blue-500 font-semibold">+18.2%</span>
          </div>
          <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Average response 48ms
          </div>
        </div>

        <div className="bg-white dark:bg-[#0f172a] p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Webhook Triggers</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">1.48M</span>
            <span className="text-xs text-slate-400">this billing cycle</span>
          </div>
          <div className="mt-2 text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>0 failed deliveries</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white dark:bg-[#0f172a] p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search integrations by name or function..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all
                ${activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'}
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredIntegrations.map((item) => (
          <div
            key={item.id}
            className={`
              bg-white dark:bg-[#0f172a] rounded-2xl p-5 border transition-all duration-200 hover:shadow-lg flex flex-col justify-between
              ${item.connected 
                ? 'border-slate-200/80 dark:border-slate-800' 
                : 'border-dashed border-slate-300 dark:border-slate-800 opacity-90'}
            `}
          >
            <div>
              {/* Card Header: Icon + Toggle */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl ${item.iconBg} ${item.iconColor} flex items-center justify-center font-black text-sm tracking-tighter shadow-xs`}>
                    {item.badgeText}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span>{item.name}</span>
                      {item.connected && (
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      )}
                    </h3>
                    <span className="text-[11px] font-medium text-slate-400">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Switch toggle */}
                <button
                  type="button"
                  onClick={(e) => handleToggleConnection(item.id, e)}
                  aria-label={`Toggle ${item.name} connection`}
                  className={`
                    relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden
                    ${item.connected ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'}
                  `}
                >
                  <span
                    className={`
                      pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out
                      ${item.connected ? 'translate-x-5' : 'translate-x-0'}
                    `}
                  />
                </button>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-3.5 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Bottom Meta & Actions */}
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  {item.connected ? 'Last Synced' : 'Status'}
                </span>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-0.5">
                  {item.connected ? item.lastSync : 'Disconnected'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {item.connected ? (
                  <button
                    onClick={() => handleOpenConfig(item)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    <Settings2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>Config</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleToggleConnection(item.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                  >
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span>Connect</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Developer API Keys Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 border border-indigo-900/50 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold">NexusAI Enterprise API & Webhooks</h3>
          </div>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            Need custom endpoints? Generate scoped bearer tokens to ingest proprietary database records or push real-time AI summaries directly to your private VPC.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={() => info('API Docs', 'Navigating to API Reference Documentation (v2.4).')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Read Docs</span>
          </button>
          <button 
            onClick={() => {
              const dummyKey = `nx_live_${Math.random().toString(36).substring(2, 16)}`;
              handleCopy(dummyKey);
              success('New Secret Key Generated', `Copied token: ${dummyKey.substring(0, 10)}... to clipboard.`);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold shadow-lg shadow-blue-500/25 active:scale-95 transition-all"
          >
            <Cpu className="w-4 h-4" />
            <span>Generate New Key</span>
          </button>
        </div>
      </div>

      {/* Integration Configuration Modal */}
      {isConfigModalOpen && selectedIntegration && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="config-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsConfigModalOpen(false)}
        >
          <div 
            className="bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-lg w-full p-6 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${selectedIntegration.iconBg} ${selectedIntegration.iconColor} flex items-center justify-center font-bold text-sm`}>
                  {selectedIntegration.badgeText}
                </div>
                <div>
                  <h3 id="config-modal-title" className="text-base font-bold text-slate-900 dark:text-white">
                    Configure {selectedIntegration.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Manage webhook sync and secret credentials
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsConfigModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveConfig} className="space-y-4 mt-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Integration API Key / Secret Token
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={apiKeyInput}
                    onChange={(e) => setApiKeyInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs font-mono bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white pr-20"
                  />
                  <button
                    type="button"
                    onClick={() => handleCopy(apiKeyInput)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-2.5 py-1 text-[11px] font-semibold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 flex items-center gap-1"
                  >
                    {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Sync Cadence
                </label>
                <select
                  value={syncFrequency}
                  onChange={(e) => setSyncFrequency(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                >
                  <option>Real-time (Webhooks)</option>
                  <option>Every 5 Minutes</option>
                  <option>Hourly Batch</option>
                  <option>Daily Digest (Midnight UTC)</option>
                </select>
              </div>

              <div className="space-y-2 pt-2">
                <span className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Permissions & Scopes
                </span>
                <label className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-300 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4" />
                  <span>Allow NexusAI to dispatch webhook events</span>
                </label>
                <label className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-300 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4" />
                  <span>Allow automated AI assistant actions</span>
                </label>
                <label className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-300 cursor-pointer">
                  <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4" />
                  <span>Enable debug audit logs for 14 days</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => {
                    handleToggleConnection(selectedIntegration.id);
                    setIsConfigModalOpen(false);
                  }}
                  className="text-xs font-semibold text-rose-600 hover:text-rose-700 dark:hover:text-rose-400"
                >
                  {selectedIntegration.connected ? 'Disconnect App' : 'Keep Inactive'}
                </button>
                <div className="flex gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsConfigModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-500/20 active:scale-95 transition-all"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
