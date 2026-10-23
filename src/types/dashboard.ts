export type ProjectStatus = 'In Progress' | 'On Track' | 'Planning' | 'Completed';
export type TaskPriority = 'High' | 'Medium' | 'Low';

export interface MetricCardData {
  id: string;
  title: string;
  value: string;
  trend: string;
  trendDirection: 'up' | 'down';
  trendSubtext: string;
  iconType: 'briefcase' | 'users' | 'dollar' | 'clock';
}

export interface RevenueDataPoint {
  month: string;
  revenue: number;
  highlight?: boolean;
}

export interface ActivityDataPoint {
  month: string;
  completed: number;
  inProgress: number;
  pending: number;
}

export interface ActivityItem {
  id: string;
  type: 'client' | 'project' | 'team' | 'document' | 'task';
  title: string;
  subtitle: string;
  timestamp: string;
}

export interface ProjectCardData {
  id: string;
  title: string;
  client: string;
  progress: number;
  membersCount: number;
  memberAvatars: string[];
  status: ProjectStatus;
  categoryIcon: 'globe' | 'mobile' | 'bot' | 'crm' | 'analytics' | 'ecommerce';
}

export interface TaskItemData {
  id: string;
  title: string;
  client: string;
  dueDate: string;
  priority: TaskPriority;
  completed: boolean;
}

export interface UserProfile {
  name: string;
  role: string;
  avatarUrl: string;
  email?: string;
}
