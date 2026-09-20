'use client';

import { useState } from 'react';
import { useKnot } from '../../state/KnotContext';

export function useDashboardViewModel() {
  const {
    team,
    goal,
    timelineEvents,
    quests,
    activityLogs,
    createTeam,
    joinTeam,
    createGoal,
    updateBalance,
    updateGoalTarget,
    toggleTask,
  } = useKnot();

  const [isUpdateBalanceOpen, setIsUpdateBalanceOpen] = useState(false);
  const [isCreateGoalOpen, setIsCreateGoalOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [onboardingMode, setOnboardingMode] = useState<'SELECT' | 'CREATE' | 'JOIN'>('SELECT');
  const [copiedCode, setCopiedCode] = useState(false);

  const latestLog = activityLogs[0];

  const handleCopyInviteCode = () => {
    if (!team?.inviteCode) return;
    navigator.clipboard.writeText(team.inviteCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleOpenOnboarding = (mode: 'CREATE' | 'JOIN') => {
    setOnboardingMode(mode);
    setIsOnboardingOpen(true);
  };

  const handleCloseOnboarding = () => {
    setIsOnboardingOpen(false);
  };

  const handleOpenUpdateBalance = () => setIsUpdateBalanceOpen(true);
  const handleCloseUpdateBalance = () => setIsUpdateBalanceOpen(false);

  const handleOpenCreateGoal = () => setIsCreateGoalOpen(true);
  const handleCloseCreateGoal = () => setIsCreateGoalOpen(false);

  return {
    state: {
      team,
      goal,
      timelineEvents,
      quests,
      activityLogs,
      latestLog,
      isUpdateBalanceOpen,
      isCreateGoalOpen,
      isOnboardingOpen,
      onboardingMode,
      copiedCode,
    },
    handlers: {
      onCopyInviteCode: handleCopyInviteCode,
      onOpenOnboarding: handleOpenOnboarding,
      onCloseOnboarding: handleCloseOnboarding,
      onOpenUpdateBalance: handleOpenUpdateBalance,
      onCloseUpdateBalance: handleCloseUpdateBalance,
      onOpenCreateGoal: handleOpenCreateGoal,
      onCloseCreateGoal: handleCloseCreateGoal,
      onCreateTeam: createTeam,
      onJoinTeam: joinTeam,
      onCreateGoal: createGoal,
      onUpdateBalance: updateBalance,
      onUpdateGoalTarget: updateGoalTarget,
      onToggleTask: toggleTask,
      onOnboardingSuccess: handleCloseOnboarding,
    },
  };
}

export type DashboardViewModelResult = ReturnType<typeof useDashboardViewModel>;
