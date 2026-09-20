'use client';

import { Quest } from '../../types';

export interface UpcomingQuestsWidgetProps {
  quests: Quest[];
  onToggleTask: (taskId: number) => void;
}

export interface FormattedPendingTask {
  id: number;
  questTitle: string;
  content: string;
  assigneeText: string;
  assigneeVariant: 'blue' | 'rose' | 'purple';
}

export function useUpcomingQuestsWidget({
  quests,
  onToggleTask,
}: UpcomingQuestsWidgetProps) {
  const pendingTasks: FormattedPendingTask[] = [];

  for (const q of quests) {
    for (const t of q.tasks) {
      if (t.status === 'PENDING') {
        let assigneeText = '나';
        let assigneeVariant: 'blue' | 'rose' | 'purple' = 'blue';

        switch (t.assignee) {
          case 'ME':
            assigneeText = '나';
            assigneeVariant = 'blue';
            break;
          case 'PARTNER':
            assigneeText = '팀원';
            assigneeVariant = 'rose';
            break;
          case 'BOTH':
            assigneeText = '공동';
            assigneeVariant = 'purple';
            break;
        }

        pendingTasks.push({
          id: t.id,
          questTitle: q.title,
          content: t.content,
          assigneeText,
          assigneeVariant,
        });

        if (pendingTasks.length >= 3) break;
      }
    }
    if (pendingTasks.length >= 3) break;
  }

  return {
    tasks: pendingTasks,
    hasTasks: pendingTasks.length > 0,
    onToggleTask,
  };
}

export type UpcomingQuestsWidgetViewModel = ReturnType<typeof useUpcomingQuestsWidget>;
