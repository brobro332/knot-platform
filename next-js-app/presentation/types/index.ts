export type Role = 'USER' | 'ADMIN';
export type MemberStatus = 'ACTIVE' | 'INACTIVE';
export type TeamStatus = 'ACTIVE' | 'ARCHIVED';

export interface Member {
  id: number;
  email: string;
  nickname: string;
  role: Role;
  status: MemberStatus;
  avatarUrl?: string;
}

export interface Team {
  id: number;
  name: string;
  inviteCode: string;
  status: TeamStatus;
  members: Member[];
  createdAt: string;
}

export type GoalType = 'AMOUNT' | 'PERCENT' | 'COUNT';

export interface Goal {
  id: number;
  teamId: number;
  title: string;
  goalType: GoalType;
  targetValue: number;
  currentValue: number;
  dueDate: string;
  unit: string;
}

export type TimelineEventType = 'MILESTONE' | 'DATE' | 'EXPENSE';

export interface TimelineEvent {
  id: number;
  teamId: number;
  title: string;
  eventType: TimelineEventType;
  date: string;
  amount?: number;
  isCompleted: boolean;
  description?: string;
  location?: string;
  dattShared?: boolean;
  dattRecommendationUrl?: string;
  tags?: string[];
  createdAt: string;
}

export type QuestStatus = 'IN_PROGRESS' | 'COMPLETED';
export type QuestType = 'WEDDING' | 'HOUSING' | 'TRAVEL' | 'FINANCE' | 'PROJECT' | 'STUDY' | 'GENERAL';
export type TaskAssignee = 'ME' | 'PARTNER' | 'BOTH';

export interface Task {
  id: number;
  questId: number;
  content: string;
  status: 'PENDING' | 'DONE';
  assignee: TaskAssignee;
  completedAt?: string;
  displayOrder: number;
}

export interface Quest {
  id: number;
  teamId: number;
  title: string;
  description: string;
  questType: QuestType;
  status: QuestStatus;
  dueDate: string;
  targetValue: number;
  currentValue: number;
  tasks: Task[];
  createdAt: string;
}

export interface ActivityLog {
  id: number;
  teamId: number;
  actorName: string;
  actionType: 'UPDATE_BALANCE' | 'ADD_EVENT' | 'COMPLETE_TASK' | 'ADD_QUEST';
  message: string;
  createdAt: string;
}
