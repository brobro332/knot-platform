'use client';

import { useState } from 'react';
import { useKnot } from '../../state/KnotContext';
import { QuestFilterType } from '../../components/quests/QuestFilter';

export function useQuestsViewModel() {
  const {
    team,
    quests,
    toggleTask,
    addTask,
    addQuest,
    createTeam,
    joinTeam,
  } = useKnot();

  const [filter, setFilter] = useState<QuestFilterType>('ALL');
  const [isAddQuestOpen, setIsAddQuestOpen] = useState(false);
  const [activeQuestIdForTask, setActiveQuestIdForTask] = useState<number | null>(null);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [onboardingMode, setOnboardingMode] = useState<'SELECT' | 'CREATE' | 'JOIN'>('SELECT');

  const allTasks = quests.flatMap((q) => q.tasks);
  const completedTasksCount = allTasks.filter((t) => t.status === 'DONE').length;
  const pendingTasksCount = allTasks.filter((t) => t.status === 'PENDING').length;
  const myTasksCount = allTasks.filter(
    (t) => (t.assignee === 'ME' || t.assignee === 'BOTH') && t.status === 'PENDING'
  ).length;

  const counts: Record<QuestFilterType, number> = {
    ALL: quests.length,
    IN_PROGRESS: quests.filter((q) => q.status === 'IN_PROGRESS').length,
    MY_TASKS: myTasksCount,
    COMPLETED: quests.filter((q) => q.status === 'COMPLETED').length,
  };

  const filteredQuests = quests.filter((q) => {
    if (filter === 'ALL') return true;
    if (filter === 'IN_PROGRESS') return q.status === 'IN_PROGRESS';
    if (filter === 'COMPLETED') return q.status === 'COMPLETED';
    if (filter === 'MY_TASKS') {
      return q.tasks.some(
        (t) => (t.assignee === 'ME' || t.assignee === 'BOTH') && t.status === 'PENDING'
      );
    }
    return true;
  });

  const handleOpenOnboarding = (mode: 'CREATE' | 'JOIN') => {
    setOnboardingMode(mode);
    setIsOnboardingOpen(true);
  };

  const handleCloseOnboarding = () => {
    setIsOnboardingOpen(false);
  };

  const handleOpenAddQuest = () => setIsAddQuestOpen(true);
  const handleCloseAddQuest = () => setIsAddQuestOpen(false);

  const handleOpenAddTask = (questId: number) => setActiveQuestIdForTask(questId);
  const handleCloseAddTask = () => setActiveQuestIdForTask(null);

  return {
    state: {
      team,
      quests,
      filteredQuests,
      counts,
      pendingTasksCount,
      myTasksCount,
      completedTasksCount,
      filter,
      isAddQuestOpen,
      activeQuestIdForTask,
      isOnboardingOpen,
      onboardingMode,
    },
    handlers: {
      onSelectFilter: setFilter,
      onOpenAddQuest: handleOpenAddQuest,
      onCloseAddQuest: handleCloseAddQuest,
      onOpenAddTask: handleOpenAddTask,
      onCloseAddTask: handleCloseAddTask,
      onOpenOnboarding: handleOpenOnboarding,
      onCloseOnboarding: handleCloseOnboarding,
      onToggleTask: toggleTask,
      onAddTask: addTask,
      onAddQuest: addQuest,
      onCreateTeam: createTeam,
      onJoinTeam: joinTeam,
      onOnboardingSuccess: handleCloseOnboarding,
    },
  };
}

export type QuestsViewModelResult = ReturnType<typeof useQuestsViewModel>;
