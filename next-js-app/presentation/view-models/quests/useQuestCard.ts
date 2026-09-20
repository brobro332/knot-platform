'use client';

import { Quest, QuestType } from '../../types';

export interface QuestCardProps {
  quest: Quest;
  onToggleTask: (taskId: number) => void;
  onOpenAddTaskModal: (questId: number) => void;
}

export interface QuestCategoryConfig {
  type: QuestType;
  label: string;
  variant: 'purple' | 'blue' | 'rose' | 'emerald' | 'amber' | 'zinc';
}

export function useQuestCard({
  quest,
  onToggleTask,
  onOpenAddTaskModal,
}: QuestCardProps) {
  const completedCount = quest.tasks.filter((t) => t.status === 'DONE').length;
  const totalCount = quest.tasks.length;
  const percentage = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);
  const isAllCompleted = totalCount > 0 && completedCount === totalCount;

  let category: QuestCategoryConfig = {
    type: quest.questType,
    label: '일반 퀘스트',
    variant: 'zinc',
  };

  switch (quest.questType) {
    case 'PROJECT':
      category = { type: quest.questType, label: '프로젝트/창업', variant: 'purple' };
      break;
    case 'STUDY':
      category = { type: quest.questType, label: '스터디/챌린지', variant: 'blue' };
      break;
    case 'WEDDING':
      category = { type: quest.questType, label: '웨딩/커플', variant: 'rose' };
      break;
    case 'HOUSING':
      category = { type: quest.questType, label: '주거/인테리어', variant: 'blue' };
      break;
    case 'TRAVEL':
      category = { type: quest.questType, label: '여행/휴가', variant: 'emerald' };
      break;
    case 'FINANCE':
      category = { type: quest.questType, label: '자금/재정', variant: 'amber' };
      break;
  }

  return {
    quest,
    completedCount,
    totalCount,
    percentage,
    isAllCompleted,
    category,
    handlers: {
      onToggleTask,
      onOpenAddTask: () => onOpenAddTaskModal(quest.id),
    },
  };
}

export type QuestCardViewModel = ReturnType<typeof useQuestCard>;
