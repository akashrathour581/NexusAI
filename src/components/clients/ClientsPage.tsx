import React, { useState } from 'react';
import { 
  Briefcase, 
  Plus, 
  Search, 
  MoreVertical, 
  Mail, 
  Phone, 
  ExternalLink, 
  Star, 
  DollarSign, 
  Users, 
  CheckCircle2, 
  Building2,
  X
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface Client {
  id: string;
  name: string;
  industry: string;
  contactPerson: string;
  email: string;
  phone: string;
  contractValue: string;
  status: 'Active' | 'Onboarding' | 'Pending Review';
  projectsCount: number;
  logoText: string;
  logoBg: string;
}

const initialClients: Client[] = [
  {
    id: 'c-1',
    name: 'TechBuild Inc.',
    industry: 'Construction & Real Estate',
    contactPerson: 'David Miller',
    email: 'david@techbuild.com',
    phone: '+1 (555) 234-5678',
    contractValue: '$78,000 / yr',
    status: 'Active',
    projectsCount: 12,
    logoText: 'TB',
    logoBg: 'bg-emerald-600',
  },
  {
    id: 'c-2',
    name: 'Acme Corp.',
    industry: 'Cloud Infrastructure',
    contactPerson: 'Sarah Jenkins',
    email: 'sarah@acme.com',
    phone: '+1 (555) 876-5432',
    contractValue: '$42,000 / yr',
    status: 'Active',
    projectsCount: 8,
    logoText: 'AC',
    logoBg: 'bg-blue-600',
  },
  {
    id: 'c-3',
    name: 'GlobalMart Group',
    industry: 'Retail & E-commerce',
    contactPerson: 'Marcus Thorne',
    email: 'marcus@globalmart.io',
    phone: '+1 (555) 345-6789',
    contractValue: '$64,000 / yr',
    status: 'Active',
    projectsCount: 5,
    logoText: 'GM',
    logoBg: 'bg-purple-600',
  },
  {
    id: 'c-4',
    name: 'HealthPulse Labs',
    industry: 'Healthcare Diagnostics',
    contactPerson: 'Dr. Evelyn Reed',
    email: 'ereed@healthpulse.org',
    phone: '+1 (555) 901-2345',
    contractValue: '$95,000 / yr',
    status: 'Active',
    projectsCount: 9,
    logoText: 'HP',
    logoBg: 'bg-rose-600',
  },
  {
    id: 'c-5',
    name: 'TechStart AI',
    industry: 'Software & Mobile',
    contactPerson: 'Liam Gallagher',
    email: 'liam@techstart.dev',
    phone: '+1 (555) 432-1098',
    contractValue: '$25,000 / yr',
    status: 'Onboarding',
    projectsCount: 2,
    logoText: 'TS',
    logoBg: 'bg-amber-600',
  },
  {
    id: 'c-6',
    name: 'DataSphere Global',
    industry: 'Big Data & AI',
    contactPerson: 'Alex Rivera',
    email: 'arivera@datasphere.com',
    phone: '+1 (555) 678-9012',
    contractValue: '$38,000 / yr',
    status: 'Active',
    projectsCount: 4,
    logoText: 'DS',
    logoBg: 'bg-indigo-600',
  },
];

export const ClientsPage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Active' | 'Onboarding' | 'Pending Review'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewClientModalOpen, setIsNewClientModalOpen] = useState(false);

  // New Client Form State
  const [newClientName, setNewClientName] = useState('');
  const [newClientIndustry, setNewClientIndustry] = useState('');
  const [newClientContact, setNewClientContact] = useState('');
  const [newClientEmail, setNewClientEmail] = useState('');
  const [newClientContract, setNewClientContract] = useState('');

  const { success } = useToast();

  const filteredClients = clients.filter((c) => {
    const matchesFilter = activeFilter === 'All' || c.status === activeFilter;
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.contactPerson.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName || !newClientEmail) return;

    const initials = newClientName
      .split(' ')
      .map((w) => w[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

    const colors = ['bg-blue-600', 'bg-purple-600', 'bg-emerald-600', 'bg-amber-600', 'bg-rose-600'];
    const randomBg = colors[Math.floor(Math.random() * colors.length)];

    const createdClient: Client = {
      id: `client-${Date.now()}`,
      name: newClientName,
      industry: newClientIndustry || 'Technology',
      contactPerson: newClientContact || 'Primary Contact',
      email: newClientEmail,
      phone: '+1 (555) 000-1234',
      contractValue: newClientContract ? `$${newClientContract} / yr` : '$30,000 / yr',
      status: 'Onboarding',
      projectsCount: 1,
      logoText: initials || 'CL',
      logoBg: randomBg,
    };

    setClients([createdClient, ...clients]);
    success('Client Added Successfully', `${newClientName} is now in active onboarding.`);
    setIsNewClientModalOpen(false);
    setNewClientName('');
    setNewClientEmail('');
    setNewClientIndustry('');
    setNewClientContact('');
    setNewClientContract('');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Client Directory
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-normal">
            Manage your client accounts, retainer agreements, and key relationships.
          </p>
        </div>

        <button
          onClick={() => setIsNewClientModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/25 active:scale-95 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Client</span>
        </button>
      </div>

      {/* 4 Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-[#0f172a] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Clients</span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">{clients.length}</h3>
            <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-600 mt-1">
              <span>↑ 12%</span>
              <span className="text-slate-400 font-normal">from last month</span>
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0f172a] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Active Retainers</span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">
              {clients.filter((c) => c.status === 'Active').length}
            </h3>
            <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-600 mt-1">
              <span>↑ 8%</span>
              <span className="text-slate-400 font-normal">from last month</span>
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0f172a] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Contract Value</span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">$342,000</h3>
            <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-600 mt-1">
              <span>↑ 24%</span>
              <span className="text-slate-400 font-normal">YoY growth</span>
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0f172a] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Client CSAT</span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">98.4%</h3>
            <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-600 mt-1">
              <span>↑ 4.2%</span>
              <span className="text-slate-400 font-normal">satisfaction</span>
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#0f172a] p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-2xs">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
          {(['All', 'Active', 'Onboarding', 'Pending Review'] as const).map((tab) => {
            const isActive = activeFilter === tab;
            const count = tab === 'All' ? clients.length : clients.filter((c) => c.status === tab).length;
            return (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{tab}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${isActive ? 'bg-blue-700 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative flex-1 sm:w-64 sm:flex-initial">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search clients, industry or contact..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden"
          />
        </div>
      </div>

      {/* Clients Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredClients.map((client) => (
          <div
            key={client.id}
            className="bg-white dark:bg-[#0f172a] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
          >
            <div>
              {/* Header: Logo, Name, Status, Menu */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-md ${client.logoBg}`}>
                    {client.logoText}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                      {client.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-medium">{client.industry}</p>
                  </div>
                </div>

                <button className="text-slate-300 hover:text-slate-600 dark:text-slate-600 p-1">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

              {/* Status & Contract Value */}
              <div className="mt-4 flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  client.status === 'Active'
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                    : 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                }`}>
                  ● {client.status}
                </span>

                <span className="font-extrabold text-xs text-slate-900 dark:text-white">
                  {client.contractValue}
                </span>
              </div>

              {/* Contact Information */}
              <div className="mt-3.5 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-semibold text-slate-700 dark:text-slate-200">{client.contactPerson}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">{client.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{client.phone}</span>
                </div>
              </div>
            </div>

            {/* Card Footer: Active Projects count & Action */}
            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-[11px] font-medium text-slate-400">
                <strong>{client.projectsCount}</strong> active projects
              </span>

              <button className="flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-700 hover:underline">
                <span>View Portal</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* New Client Modal */}
      {isNewClientModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setIsNewClientModalOpen(false)}
        >
          <div 
            className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/60 text-blue-600 flex items-center justify-center">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">Onboard New Client</h3>
                  <p className="text-xs text-slate-400">Add an enterprise client account</p>
                </div>
              </div>
              <button 
                onClick={() => setIsNewClientModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateClient} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                  Company / Organization Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Global Corp"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                    Industry Sector
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Fintech, Healthcare"
                    value={newClientIndustry}
                    onChange={(e) => setNewClientIndustry(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                    Annual Contract Value
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 50,000"
                    value={newClientContract}
                    onChange={(e) => setNewClientContract(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Jane Doe"
                    value={newClientContact}
                    onChange={(e) => setNewClientContact(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                    Contact Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jane@company.com"
                    value={newClientEmail}
                    onChange={(e) => setNewClientEmail(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewClientModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-500/20 active:scale-95 transition-all"
                >
                  Add Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
