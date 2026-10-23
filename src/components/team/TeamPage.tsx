import React, { useState } from 'react';
import { 
  Users, 
  Target, 
  UserPlus, 
  Shield, 
  Plus, 
  Search, 
  Filter, 
  ChevronDown, 
  MoreVertical, 
  SlidersHorizontal, 
  Crown, 
  Mail,
  X
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'Owner' | 'Project Manager' | 'AI Engineer' | 'Designer' | 'Client' | 'Developer' | 'Data Analyst' | 'Tester';
  status: 'Online' | 'Away' | 'Offline' | 'Invited';
  projectsCount: number;
  lastActive: string;
}

const teamMembersData: TeamMember[] = [
  {
    id: 'm-1',
    name: 'Akash Rathour',
    email: 'akash@example.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&fit=crop&q=80',
    role: 'Owner',
    status: 'Online',
    projectsCount: 12,
    lastActive: '2 minutes ago',
  },
  {
    id: 'm-2',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&fit=crop&q=80',
    role: 'Project Manager',
    status: 'Online',
    projectsCount: 8,
    lastActive: '12 minutes ago',
  },
  {
    id: 'm-3',
    name: 'Rahul Mehta',
    email: 'rahul@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&fit=crop&q=80',
    role: 'AI Engineer',
    status: 'Online',
    projectsCount: 6,
    lastActive: '1 hour ago',
  },
  {
    id: 'm-4',
    name: 'Sneha Verma',
    email: 'sneha@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&fit=crop&q=80',
    role: 'Designer',
    status: 'Away',
    projectsCount: 4,
    lastActive: '3 hours ago',
  },
  {
    id: 'm-5',
    name: 'Vikram Singh',
    email: 'vikram@example.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&fit=crop&q=80',
    role: 'Client',
    status: 'Online',
    projectsCount: 3,
    lastActive: '5 hours ago',
  },
  {
    id: 'm-6',
    name: 'Neha Gupta',
    email: 'neha@example.com',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50&fit=crop&q=80',
    role: 'Developer',
    status: 'Offline',
    projectsCount: 5,
    lastActive: '1 day ago',
  },
  {
    id: 'm-7',
    name: 'Arjun Kapoor',
    email: 'arjun@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&fit=crop&q=80',
    role: 'Data Analyst',
    status: 'Online',
    projectsCount: 4,
    lastActive: '1 hour ago',
  },
  {
    id: 'm-8',
    name: 'Rohan Das',
    email: 'rohan@example.com',
    avatar: '',
    role: 'Tester',
    status: 'Invited',
    projectsCount: 0,
    lastActive: 'Invited 2 days ago',
  },
];

const teamDistributionData = [
  { name: 'Admins', count: 2, percentage: '11%', color: '#8b5cf6' },
  { name: 'Developers', count: 6, percentage: '33%', color: '#3b82f6' },
  { name: 'Designers', count: 3, percentage: '17%', color: '#ec4899' },
  { name: 'Clients', count: 4, percentage: '22%', color: '#10b981' },
  { name: 'Others', count: 3, percentage: '17%', color: '#0ea5e9' },
];

export const TeamPage: React.FC = () => {
  const { success } = useToast();
  const [members, setMembers] = useState<TeamMember[]>(teamMembersData);
  const [activeFilter, setActiveFilter] = useState('All Members');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Modals state
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isRolesModalOpen, setIsRolesModalOpen] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<TeamMember['role']>('Developer');

  const filterTabs = [
    { label: 'All Members', count: members.length },
    { label: 'Active', count: members.filter(m => m.status === 'Online').length },
    { label: 'Pending', count: members.filter(m => m.status === 'Invited').length },
    { label: 'Admins', count: members.filter(m => m.role === 'Owner').length },
    { label: 'Guests', count: members.filter(m => m.role === 'Client').length },
  ];

  const handleInviteMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteName.trim() || !inviteEmail.trim()) return;

    const newMember: TeamMember = {
      id: `m-${Date.now()}`,
      name: inviteName,
      email: inviteEmail,
      avatar: '',
      role: inviteRole,
      status: 'Invited',
      projectsCount: 1,
      lastActive: 'Just invited',
    };

    setMembers((prev) => [newMember, ...prev]);
    success('Invitation Dispatched', `Invited ${inviteName} (${inviteEmail}) as ${inviteRole}.`);
    setIsInviteModalOpen(false);
    setInviteName('');
    setInviteEmail('');
  };

  const handleSaveRoles = (e: React.FormEvent) => {
    e.preventDefault();
    success('Role Permissions Saved', 'Updated enterprise access matrix across all role levels.');
    setIsRolesModalOpen(false);
  };

  const filteredMembers = members.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.email.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeFilter === 'All Members') return matchesSearch;
    if (activeFilter === 'Active') return matchesSearch && m.status === 'Online';
    if (activeFilter === 'Pending') return matchesSearch && m.status === 'Invited';
    if (activeFilter === 'Admins') return matchesSearch && m.role === 'Owner';
    if (activeFilter === 'Guests') return matchesSearch && m.role === 'Client';
    return matchesSearch;
  });

  const getRoleBadge = (role: TeamMember['role']) => {
    switch (role) {
      case 'Owner':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/40">
            <Crown className="w-3.5 h-3.5 text-purple-600" />
            <span>Owner</span>
            <ChevronDown className="w-3 h-3 text-purple-400" />
          </span>
        );
      case 'Project Manager':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/40">
            <span>Project Manager</span>
            <ChevronDown className="w-3 h-3 text-blue-400" />
          </span>
        );
      case 'AI Engineer':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/40">
            <span>AI Engineer</span>
            <ChevronDown className="w-3 h-3 text-purple-400" />
          </span>
        );
      case 'Designer':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200/60 dark:border-rose-800/40">
            <span>Designer</span>
            <ChevronDown className="w-3 h-3 text-rose-400" />
          </span>
        );
      case 'Client':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300 border border-teal-200/60 dark:border-teal-800/40">
            <span>Client</span>
          </span>
        );
      case 'Developer':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/40">
            <span>Developer</span>
            <ChevronDown className="w-3 h-3 text-blue-400" />
          </span>
        );
      case 'Data Analyst':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/40">
            <span>Data Analyst</span>
            <ChevronDown className="w-3 h-3 text-indigo-400" />
          </span>
        );
      case 'Tester':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            <span>Tester</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </span>
        );
    }
  };

  const getStatusBadge = (status: TeamMember['status']) => {
    switch (status) {
      case 'Online':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Online
          </span>
        );
      case 'Away':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Away
          </span>
        );
      case 'Offline':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            Offline
          </span>
        );
      case 'Invited':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
            <Mail className="w-3 h-3" />
            Invited
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Team Management
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-normal">
            Manage your team members, roles and permissions. Collaborate and build amazing things together.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsRolesModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
          >
            <SlidersHorizontal className="w-4 h-4 text-slate-500" />
            <span>Manage Roles</span>
          </button>

          <button 
            onClick={() => setIsInviteModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/25 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Invite Member</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Cards matching Screenshot 3 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-[#0f172a] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Members</span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">18</h3>
            <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-600 mt-1">
              <span>↑ 12%</span>
              <span className="text-slate-400 font-normal">from last month</span>
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0f172a] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Active Today</span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">14</h3>
            <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-600 mt-1">
              <span>↑ 8%</span>
              <span className="text-slate-400 font-normal">from yesterday</span>
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0f172a] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <UserPlus className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Pending Invites</span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">3</h3>
            <span className="inline-flex items-center gap-0.5 text-xs font-bold text-rose-600 mt-1">
              <span>↓ 25%</span>
              <span className="text-slate-400 font-normal">from last week</span>
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0f172a] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Access Roles</span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">5</h3>
            <p className="text-xs text-slate-400 mt-1">Custom role permissions</p>
          </div>
        </div>
      </div>

      {/* Main Split: Members Table (Left) & Right Column (Distribution + Activity) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Filter Tabs, Search Bar, Table */}
        <div className="lg:col-span-8 space-y-4">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#0f172a] p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-2xs">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
              {filterTabs.map((tab) => {
                const isActive = activeFilter === tab.label;
                return (
                  <button
                    key={tab.label}
                    onClick={() => setActiveFilter(tab.label)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${isActive ? 'bg-blue-700 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Input & Filter Button */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1 sm:w-48">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden"
                />
              </div>

              <button className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <span>Filter</span>
              </button>
            </div>
          </div>

          {/* Members Table */}
          <div className="bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-3.5 px-4 w-10">
                    <input type="checkbox" className="rounded-sm" />
                  </th>
                  <th className="py-3.5 px-4">Member</th>
                  <th className="py-3.5 px-4">Role</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Projects</th>
                  <th className="py-3.5 px-4">Last Active</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/80 dark:divide-slate-800/60 font-medium text-slate-700 dark:text-slate-300">
                {filteredMembers.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(m.id)}
                        onChange={() => {
                          setSelectedIds((prev) =>
                            prev.includes(m.id) ? prev.filter((i) => i !== m.id) : [...prev, m.id]
                          );
                        }}
                        className="rounded-sm"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        {m.avatar ? (
                          <img src={m.avatar} alt={m.name} className="w-8 h-8 rounded-full object-cover" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                            RD
                          </div>
                        )}
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white leading-tight">
                            {m.name}
                          </h4>
                          <p className="text-[11px] text-slate-400">{m.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {getRoleBadge(m.role)}
                    </td>
                    <td className="py-3 px-4">
                      {getStatusBadge(m.status)}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-800 dark:text-slate-200">
                      {m.projectsCount}
                    </td>
                    <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>{m.lastActive}</span>
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button className="p-1 text-slate-300 hover:text-slate-600 dark:text-slate-600">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Team Distribution Donut & Recent Activity Feed */}
        <div className="lg:col-span-4 space-y-5">
          {/* Team Distribution Card */}
          <div className="bg-white dark:bg-[#0f172a] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Team Distribution</h3>
              <button className="text-xs font-semibold text-blue-600 hover:underline">View Details →</button>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="relative w-36 h-36 shrink-0">
                <ResponsiveContainer width="100%" height={144}>
                  <PieChart>
                    <Pie
                      data={teamDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={42}
                      outerRadius={62}
                      paddingAngle={3}
                      dataKey="count"
                    >
                      {teamDistributionData.map((entry, index) => (
                        <Cell key={`team-cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-lg font-extrabold text-slate-900 dark:text-white">18</span>
                  <span className="text-[10px] text-slate-400 font-medium">Members</span>
                </div>
              </div>

              {/* Legend with percentages */}
              <div className="space-y-1.5 text-xs flex-1">
                {teamDistributionData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="text-slate-600 dark:text-slate-400 font-medium">{item.name}</span>
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white">{item.count} ({item.percentage})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity Card */}
          <div className="bg-white dark:bg-[#0f172a] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">
                Recent Activity
              </h3>
              <button className="text-[11px] font-semibold text-blue-600 hover:underline">
                View All →
              </button>
            </div>

            <div className="space-y-3">
              {[
                { name: 'Priya Sharma', action: 'joined the team as Project Manager', time: '2 minutes ago', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&fit=crop&q=80' },
                { name: 'Rahul Mehta', action: 'updated project AI Chatbot Integration', time: '12 minutes ago', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&fit=crop&q=80' },
                { name: 'Sneha Verma', action: 'uploaded design files', time: '1 hour ago', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&fit=crop&q=80' },
                { name: 'Vikram Singh', action: 'commented on a document', time: '3 hours ago', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&fit=crop&q=80' },
                { name: 'Neha Gupta', action: 'was invited to the team', time: '1 day ago', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50&fit=crop&q=80' },
              ].map((act, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs">
                  <img src={act.avatar} alt="" className="w-6 h-6 rounded-full object-cover shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <p className="text-slate-800 dark:text-slate-200 leading-snug">
                      <strong className="font-bold text-slate-900 dark:text-white">{act.name}</strong> {act.action}
                    </p>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Invite Member Modal */}
      {isInviteModalOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="invite-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsInviteModalOpen(false)}
        >
          <div 
            className="bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-md w-full p-6 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <UserPlus className="w-4 h-4" />
                </div>
                <div>
                  <h3 id="invite-modal-title" className="text-base font-bold text-slate-900 dark:text-white">
                    Invite Team Member
                  </h3>
                  <p className="text-xs text-slate-400">Send an email invitation with workspace role access</p>
                </div>
              </div>
              <button
                onClick={() => setIsInviteModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleInviteMember} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Lin"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Corporate Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. maya@nexusai.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Workspace Role
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="Project Manager">Project Manager</option>
                  <option value="AI Engineer">AI Engineer</option>
                  <option value="Developer">Developer</option>
                  <option value="Designer">Designer</option>
                  <option value="Data Analyst">Data Analyst</option>
                  <option value="Tester">Tester</option>
                  <option value="Client">Client (Guest)</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-500/20 active:scale-95 transition-all"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Manage Roles Modal */}
      {isRolesModalOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="roles-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsRolesModalOpen(false)}
        >
          <div 
            className="bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-lg w-full p-6 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h3 id="roles-modal-title" className="text-base font-bold text-slate-900 dark:text-white">
                    Manage Roles & Permissions
                  </h3>
                  <p className="text-xs text-slate-400">Configure Role-Based Access Control (RBAC) tiers</p>
                </div>
              </div>
              <button
                onClick={() => setIsRolesModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveRoles} className="space-y-4 mt-4">
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {[
                  { role: 'Owner / Admin', desc: 'Full workspace administration, billing, and API secrets access', defaultChecked: true },
                  { role: 'Project Manager', desc: 'Create projects, assign tasks, invite members, view analytics', defaultChecked: true },
                  { role: 'AI Engineer', desc: 'Configure LLMs, manage vector stores, adjust pipeline prompts', defaultChecked: true },
                  { role: 'Developer & Designer', desc: 'Read/write access to assigned tasks, documents, and code sync', defaultChecked: true },
                  { role: 'Client (Guest)', desc: 'Read-only access to approved deliverables and demo milestones', defaultChecked: false },
                ].map((item) => (
                  <div key={item.role} className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-start gap-3 bg-slate-50/50 dark:bg-slate-900/40">
                    <input 
                      type="checkbox" 
                      id={`perm-${item.role}`} 
                      defaultChecked={item.defaultChecked} 
                      className="mt-0.5 rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                    />
                    <label htmlFor={`perm-${item.role}`} className="cursor-pointer text-xs flex-1">
                      <span className="font-bold text-slate-800 dark:text-slate-200 block">{item.role}</span>
                      <span className="text-[11px] text-slate-400 leading-snug block mt-0.5">{item.desc}</span>
                    </label>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsRolesModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-500/20 active:scale-95 transition-all"
                >
                  Save Permissions
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

