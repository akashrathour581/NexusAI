import type { 
  MetricCardData, 
  RevenueDataPoint, 
  ActivityDataPoint, 
  ActivityItem, 
  ProjectCardData, 
  TaskItemData, 
  UserProfile 
} from '../types/dashboard';

export const currentUser: UserProfile = {
  name: 'Akash Rathour',
  role: 'Admin',
  email: 'akash@nexusai.dev',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
};

export const metricCards: MetricCardData[] = [
  {
    id: 'projects',
    title: 'Total Projects',
    value: '24',
    trend: '12%',
    trendDirection: 'up',
    trendSubtext: 'from last month',
    iconType: 'briefcase',
  },
  {
    id: 'clients',
    title: 'Active Clients',
    value: '18',
    trend: '8%',
    trendDirection: 'up',
    trendSubtext: 'from last month',
    iconType: 'users',
  },
  {
    id: 'revenue',
    title: 'Total Revenue',
    value: '$12,450',
    trend: '23%',
    trendDirection: 'up',
    trendSubtext: 'from last month',
    iconType: 'dollar',
  },
  {
    id: 'time-saved',
    title: 'Time Saved',
    value: '120 hrs',
    trend: '35%',
    trendDirection: 'up',
    trendSubtext: 'with AI',
    iconType: 'clock',
  },
];

export const revenueData: RevenueDataPoint[] = [
  { month: 'Jan', revenue: 8000 },
  { month: 'Feb', revenue: 13000 },
  { month: 'Mar', revenue: 9500 },
  { month: 'Apr', revenue: 14500 },
  { month: 'May', revenue: 12500 },
  { month: 'Jun', revenue: 15500 },
  { month: 'Jul', revenue: 18000 },
  { month: 'Aug', revenue: 22480, highlight: true },
  { month: 'Sep', revenue: 19500 },
  { month: 'Oct', revenue: 17500 },
  { month: 'Nov', revenue: 20000 },
  { month: 'Dec', revenue: 22000 },
];

export const projectActivityData: ActivityDataPoint[] = [
  { month: 'Jan', completed: 7, inProgress: 5, pending: 4 },
  { month: 'Feb', completed: 7, inProgress: 4, pending: 4 },
  { month: 'Mar', completed: 9, inProgress: 6, pending: 4 },
  { month: 'Apr', completed: 11, inProgress: 6, pending: 4 },
  { month: 'May', completed: 8, inProgress: 6, pending: 4 },
  { month: 'Jun', completed: 13, inProgress: 7, pending: 5 },
  { month: 'Jul', completed: 15, inProgress: 8, pending: 4 },
  { month: 'Aug', completed: 17, inProgress: 6, pending: 4 },
  { month: 'Sep', completed: 20, inProgress: 7, pending: 7 },
  { month: 'Oct', completed: 24, inProgress: 10, pending: 0 },
];

export const recentActivities: ActivityItem[] = [
  {
    id: 'act-1',
    type: 'client',
    title: 'New client onboarded',
    subtitle: 'TechBuild Inc.',
    timestamp: '2 hours ago',
  },
  {
    id: 'act-2',
    type: 'project',
    title: 'Project update',
    subtitle: 'Website Redesign',
    timestamp: '4 hours ago',
  },
  {
    id: 'act-3',
    type: 'team',
    title: 'Team member added',
    subtitle: 'Rahul Mehta joined',
    timestamp: '6 hours ago',
  },
  {
    id: 'act-4',
    type: 'document',
    title: 'Document uploaded',
    subtitle: 'Market Research.pdf',
    timestamp: '8 hours ago',
  },
  {
    id: 'act-5',
    type: 'task',
    title: 'Task completed',
    subtitle: 'UI/UX design for client portal',
    timestamp: '12 hours ago',
  },
];

export const activeProjects: ProjectCardData[] = [
  {
    id: 'proj-1',
    title: 'Website Redesign',
    client: 'Acme Corp.',
    progress: 67,
    membersCount: 8,
    memberAvatars: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&fit=crop&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&fit=crop&q=80',
    ],
    status: 'In Progress',
    categoryIcon: 'globe',
  },
  {
    id: 'proj-2',
    title: 'Mobile App Development',
    client: 'TechStart',
    progress: 80,
    membersCount: 6,
    memberAvatars: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&fit=crop&q=80',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&fit=crop&q=80',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&fit=crop&q=80',
    ],
    status: 'On Track',
    categoryIcon: 'mobile',
  },
  {
    id: 'proj-3',
    title: 'AI Chatbot Integration',
    client: 'GlobalMart',
    progress: 60,
    membersCount: 4,
    memberAvatars: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=60&fit=crop&q=80',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=60&fit=crop&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=60&fit=crop&q=80',
    ],
    status: 'In Progress',
    categoryIcon: 'bot',
  },
  {
    id: 'proj-4',
    title: 'CRM System',
    client: 'BuildCorp',
    progress: 71,
    membersCount: 5,
    memberAvatars: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&fit=crop&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&fit=crop&q=80',
    ],
    status: 'On Track',
    categoryIcon: 'crm',
  },
  {
    id: 'proj-5',
    title: 'Data Analytics Dashboard',
    client: 'DataSphere',
    progress: 70,
    membersCount: 4,
    memberAvatars: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&fit=crop&q=80',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&fit=crop&q=80',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&fit=crop&q=80',
    ],
    status: 'In Progress',
    categoryIcon: 'analytics',
  },
  {
    id: 'proj-6',
    title: 'E-commerce Platform',
    client: 'ShopHub',
    progress: 42,
    membersCount: 6,
    memberAvatars: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=60&fit=crop&q=80',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=60&fit=crop&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=60&fit=crop&q=80',
    ],
    status: 'Planning',
    categoryIcon: 'ecommerce',
  },
];

export const initialTasks: TaskItemData[] = [
  {
    id: 'task-1',
    title: 'Prepare client proposal',
    client: 'Acme Corp.',
    dueDate: 'Oct 2, 2026',
    priority: 'High',
    completed: false,
  },
  {
    id: 'task-2',
    title: 'Finalize UI/UX design',
    client: 'TechStart',
    dueDate: 'Oct 3, 2026',
    priority: 'Medium',
    completed: false,
  },
  {
    id: 'task-3',
    title: 'API integration',
    client: 'GlobalMart',
    dueDate: 'Oct 5, 2026',
    priority: 'Low',
    completed: false,
  },
  {
    id: 'task-4',
    title: 'Content for landing page',
    client: 'ShopHub',
    dueDate: 'Oct 6, 2026',
    priority: 'Medium',
    completed: false,
  },
  {
    id: 'task-5',
    title: 'Market research analysis',
    client: 'DataSphere',
    dueDate: 'Oct 8, 2026',
    priority: 'Low',
    completed: false,
  },
];
