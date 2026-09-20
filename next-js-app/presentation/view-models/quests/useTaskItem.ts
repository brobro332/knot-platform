'use client';

import { Task, TaskAssignee } from '../../types';

export interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
}

export interface TaskAssigneeDisplayInfo {
  label: string;
  variant: 'blue' | 'rose' | 'purple';
  assignee: TaskAssignee;
}

export function useTaskItem({ task, onToggle }: TaskItemProps) {
  const isDone = task.status === 'DONE';

  let assigneeInfo: TaskAssigneeDisplayInfo = {
    label: '공동',
    variant: 'purple',
    assignee: task.assignee,
  };

  switch (task.assignee) {
    case 'ME':
      assigneeInfo = { label: '나', variant: 'blue', assignee: task.assignee };
      break;
    case 'PARTNER':
      assigneeInfo = { label: '팀원', variant: 'rose', assignee: task.assignee };
      break;
    case 'BOTH':
      assigneeInfo = { label: '공동', variant: 'purple', assignee: task.assignee };
      break;
  }

  return {
    task,
    isDone,
    assigneeInfo,
    handlers: {
      onToggle: () => onToggle(task.id),
    },
  };
}

export type TaskItemViewModel = ReturnType<typeof useTaskItem>;
