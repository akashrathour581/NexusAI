import React, { useState } from 'react';
import { 
  User, 
  Building2, 
  Sparkles, 
  ShieldCheck, 
  CreditCard, 
  Key, 
  Check, 
  Save, 
  Copy, 
  Download, 
  ExternalLink,
  Crown
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { currentUser } from '../../data/mockData';

interface SettingsPageProps {
  onOpenUpgradeModal?: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ onOpenUpgradeModal }) => {
  const { success, info } = useToast();
  const [activeTab, setActiveTab] = useState<'profile' | 'workspace' | 'ai' | 'security' | 'billing' | 'api'>('profile');

  // Form states
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [role, setRole] = useState(currentUser.role);
  const [timezone, setTimezone] = useState('America/Los_Angeles (PST)');
  
  // AI states
  const [aiModel, setAiModel] = useState('gpt-4o');
  const [dataSharing, setDataSharing] = useState(false);
  const [autoSummary, setAutoSummary] = useState(true);
  const [latencyOptimization, setLatencyOptimization] = useState(true);

  // Security states
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  // API states
  const [copiedKey, setCopiedKey] = useState(false);
  const apiKey = 'nx_live_948f2038bcae918237e10823';

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    success('Profile Updated', 'Your personal account preferences have been saved.');
  };

  const handleSaveAI = (e: React.FormEvent) => {
    e.preventDefault();
    success('AI Settings Saved', `Default engine set to ${aiModel.toUpperCase()}.`);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const tabs = [
    { id: 'profile', name: 'Profile & Account', icon: User },
    { id: 'workspace', name: 'Organization', icon: Building2 },
    { id: 'ai', name: 'AI Models & Prompts', icon: Sparkles },
    { id: 'security', name: 'Security & 2FA', icon: ShieldCheck },
    { id: 'billing', name: 'Billing & Plan', icon: CreditCard },
    { id: 'api', name: 'API Keys', icon: Key },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <span>Workspace Settings</span>
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage your personal profile, organization preferences, billing, and AI parameters.
          </p>
        </div>

        {onOpenUpgradeModal && (
          <button
            onClick={onOpenUpgradeModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold shadow-md shadow-amber-500/20 active:scale-95 transition-all self-start sm:self-auto"
          >
            <Crown className="w-4 h-4 fill-white" />
            <span>Manage Subscription</span>
          </button>
        )}
      </div>

      {/* Main Settings Layout: Left Nav Pills + Right Tab Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Settings Navigation (3 cols) */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-2.5 shadow-2xs space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`
                    w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all
                    ${isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}
                  `}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Support Badge */}
          <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-xs space-y-2">
            <span className="font-bold text-slate-800 dark:text-slate-200">Need Enterprise Assistance?</span>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-[11px]">
              Dedicated account manager available 24/7 for SLA guarantees.
            </p>
            <a 
              href="mailto:support@nexusai.enterprise" 
              className="inline-flex items-center gap-1 font-bold text-blue-600 dark:text-blue-400 hover:underline text-[11px]"
            >
              <span>Contact Support</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Tab Content Panel (9 cols) */}
        <div className="lg:col-span-9 bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-2xs">
          {/* 1. Profile Tab */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Profile & Preferences</h2>
                <p className="text-xs text-slate-400 mt-0.5">Manage how your name and avatar appear across projects.</p>
              </div>

              {/* Avatar section */}
              <div className="flex items-center gap-5 pt-2">
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-4 ring-blue-500/20"
                />
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => info('Avatar Upload', 'Opening file picker for high-res photo.')}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 transition-colors"
                    >
                      Change Picture
                    </button>
                    <button
                      type="button"
                      onClick={() => info('Avatar Reset', 'Reset to default initials.')}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400">JPG, PNG or GIF. Max 5MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Job Title / Role
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Timezone
                  </label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option>America/Los_Angeles (PST)</option>
                    <option>America/New_York (EST)</option>
                    <option>Europe/London (GMT)</option>
                    <option>Asia/Tokyo (JST)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-500/20 active:scale-95 transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          )}

          {/* 2. Organization Tab */}
          {activeTab === 'workspace' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Organization Details</h2>
                <p className="text-xs text-slate-400 mt-0.5">Manage domain, workspace slug, and global team brand assets.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Nexus Innovations Enterprise"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Workspace URL Slug
                  </label>
                  <div className="flex items-center">
                    <span className="px-3.5 py-2.5 rounded-l-xl border border-r-0 border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 text-xs text-slate-500 font-mono">
                      https://app.nexusai.com/org/
                    </span>
                    <input
                      type="text"
                      defaultValue="nexus-innovations"
                      className="flex-1 px-3.5 py-2.5 rounded-r-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-blue-900 dark:text-blue-300">Verified Corporate Domain</h4>
                    <p className="text-[11px] text-blue-700 dark:text-blue-400">@nexus-innovations.io auto-join allowed</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300">
                    Active SSO
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button
                  onClick={() => success('Organization Saved', 'Workspace settings synced across all team nodes.')}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-500/20 active:scale-95 transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Update Organization</span>
                </button>
              </div>
            </div>
          )}

          {/* 3. AI Tab */}
          {activeTab === 'ai' && (
            <form onSubmit={handleSaveAI} className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">AI Engine & Model Tuning</h2>
                <p className="text-xs text-slate-400 mt-0.5">Customize foundational LLMs, reasoning effort, and privacy filters.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Default Copilot Engine
                  </label>
                  <select
                    value={aiModel}
                    onChange={(e) => setAiModel(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="gpt-4o">GPT-4o Enterprise (Fast & Multimodal)</option>
                    <option value="claude-3-5">Claude 3.5 Sonnet (Superior Coding & Synthesis)</option>
                    <option value="gemini-pro">Gemini 1.5 Pro (2M Token Context Window)</option>
                  </select>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Real-Time Data Ingestion</h4>
                      <p className="text-[11px] text-slate-400">Allow AI Assistant to index active documents & tasks automatically</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={autoSummary}
                      onChange={(e) => setAutoSummary(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Zero Data Retention (ZDR)</h4>
                      <p className="text-[11px] text-slate-400">Ensure model providers do not train on corporate prompts</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={dataSharing}
                      onChange={(e) => setDataSharing(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Streaming Latency Optimization</h4>
                      <p className="text-[11px] text-slate-400">Reduce first-token response times using edge caching nodes</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={latencyOptimization}
                      onChange={(e) => setLatencyOptimization(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-500/20 active:scale-95 transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Save AI Configuration</span>
                </button>
              </div>
            </form>
          )}

          {/* 4. Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Security & Authentication</h2>
                <p className="text-xs text-slate-400 mt-0.5">Protect your workspace with two-factor authentication and session controls.</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Two-Factor Authentication (2FA)</h4>
                    <p className="text-[11px] text-slate-400">Require an authenticator app code (TOTP) when logging in</p>
                  </div>
                  <button
                    onClick={() => {
                      setTwoFactorEnabled(!twoFactorEnabled);
                      if (!twoFactorEnabled) success('2FA Enabled', 'Two-factor authentication is now required.');
                      else info('2FA Disabled', 'Two-factor authentication has been disabled.');
                    }}
                    className={`
                      px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all
                      ${twoFactorEnabled 
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' 
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}
                    `}
                  >
                    {twoFactorEnabled ? 'Enabled' : 'Disabled'}
                  </button>
                </div>

                <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Active Login Sessions</h4>
                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    <div className="py-2.5 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-slate-200">MacBook Pro 16" - Chrome (Current)</p>
                        <p className="text-[11px] text-slate-400">San Francisco, CA • IP: 198.51.100.42</p>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-500">Active Now</span>
                    </div>
                    <div className="py-2.5 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-slate-200">iPhone 15 Pro - Safari Mobile</p>
                        <p className="text-[11px] text-slate-400">San Francisco, CA • 2 hrs ago</p>
                      </div>
                      <button 
                        onClick={() => success('Session Revoked', 'Logged out iPhone 15 Pro device.')}
                        className="text-[11px] font-bold text-rose-500 hover:underline"
                      >
                        Revoke
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 5. Billing Tab */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Subscription & Plan</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Manage seat billing, invoices, and payment methods.</p>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-900">
                  Pro Plan ($49/mo)
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white space-y-4 shadow-lg shadow-blue-500/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-extrabold">NexusAI Enterprise Tier</h3>
                    <p className="text-xs text-blue-100 mt-0.5">Your next renewal date is November 1, 2026</p>
                  </div>
                  {onOpenUpgradeModal && (
                    <button
                      onClick={onOpenUpgradeModal}
                      className="px-4 py-2 rounded-xl bg-white text-blue-600 hover:bg-blue-50 text-xs font-bold shadow-md transition-all"
                    >
                      Change Plan
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-3 pt-2 text-xs border-t border-white/20">
                  <div>
                    <span className="text-blue-200 block text-[11px]">Team Seats</span>
                    <span className="font-bold text-sm">24 / 50 Used</span>
                  </div>
                  <div>
                    <span className="text-blue-200 block text-[11px]">AI Invocations</span>
                    <span className="font-bold text-sm">84.2K / 100K</span>
                  </div>
                  <div>
                    <span className="text-blue-200 block text-[11px]">Cloud Storage</span>
                    <span className="font-bold text-sm">18.4 GB / 100 GB</span>
                  </div>
                </div>
              </div>

              {/* Invoices List */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Recent Invoices</h4>
                <div className="rounded-xl border border-slate-200/80 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden text-xs">
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-200">Invoice #NX-2026-10</p>
                      <p className="text-[11px] text-slate-400">Oct 1, 2026 • Visa ending in 4242</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-slate-800 dark:text-slate-200">$49.00</span>
                      <button 
                        onClick={() => info('Invoice Downloaded', 'Saved NX-2026-10.pdf to downloads.')}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                        title="Download PDF"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-200">Invoice #NX-2026-09</p>
                      <p className="text-[11px] text-slate-400">Sep 1, 2026 • Visa ending in 4242</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-slate-800 dark:text-slate-200">$49.00</span>
                      <button 
                        onClick={() => info('Invoice Downloaded', 'Saved NX-2026-09.pdf to downloads.')}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                        title="Download PDF"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 6. API Keys Tab */}
          {activeTab === 'api' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">API Keys & Tokens</h2>
                <p className="text-xs text-slate-400 mt-0.5">Use secret keys to authenticate backend workflows and custom microservices.</p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Production Secret Key</span>
                    <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                      Active
                    </span>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      readOnly
                      value={apiKey}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs font-mono bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white pr-20"
                    />
                    <button
                      type="button"
                      onClick={() => handleCopy(apiKey)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 px-2.5 py-1 text-[11px] font-semibold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 flex items-center gap-1"
                    >
                      {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-400">Created on Oct 1, 2026 • Never expires</p>
                </div>

                <button
                  onClick={() => {
                    const newKey = `nx_live_${Math.random().toString(36).substring(2, 14)}`;
                    handleCopy(newKey);
                    success('Key Regenerated', `New production key created: ${newKey.substring(0, 10)}...`);
                  }}
                  className="px-4 py-2.5 rounded-xl border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold transition-colors"
                >
                  Regenerate Secret Key
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
