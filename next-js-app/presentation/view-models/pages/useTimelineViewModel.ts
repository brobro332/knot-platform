'use client';

import { useState } from 'react';
import { useKnot } from '../../state/KnotContext';
import { TimelineFilterType } from '../../components/timeline/TimelineFilter';

export function useTimelineViewModel() {
  const {
    team,
    timelineEvents,
    addTimelineEvent,
    toggleTimelineEvent,
    deleteTimelineEvent,
    createTeam,
    joinTeam,
  } = useKnot();

  const [filter, setFilter] = useState<TimelineFilterType>('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [onboardingMode, setOnboardingMode] = useState<'SELECT' | 'CREATE' | 'JOIN'>('SELECT');

  const filteredEvents = timelineEvents.filter((ev) => {
    if (filter === 'ALL') return true;
    return ev.eventType === filter;
  });

  const counts: Record<TimelineFilterType, number> = {
    ALL: timelineEvents.length,
    MILESTONE: timelineEvents.filter((e) => e.eventType === 'MILESTONE').length,
    DATE: timelineEvents.filter((e) => e.eventType === 'DATE').length,
    EXPENSE: timelineEvents.filter((e) => e.eventType === 'EXPENSE').length,
  };

  const totalRecordedExpense = timelineEvents
    .filter((e) => e.amount !== undefined && e.amount > 0)
    .reduce((sum, e) => sum + (e.amount || 0), 0);

  const handleOpenOnboarding = (mode: 'CREATE' | 'JOIN') => {
    setOnboardingMode(mode);
    setIsOnboardingOpen(true);
  };

  const handleCloseOnboarding = () => {
    setIsOnboardingOpen(false);
  };

  const handleOpenAddModal = () => setIsAddModalOpen(true);
  const handleCloseAddModal = () => setIsAddModalOpen(false);

  return {
    state: {
      team,
      timelineEvents,
      filteredEvents,
      counts,
      totalRecordedExpense,
      filter,
      isAddModalOpen,
      isOnboardingOpen,
      onboardingMode,
    },
    handlers: {
      onSelectFilter: setFilter,
      onOpenAddModal: handleOpenAddModal,
      onCloseAddModal: handleCloseAddModal,
      onOpenOnboarding: handleOpenOnboarding,
      onCloseOnboarding: handleCloseOnboarding,
      onAddTimelineEvent: addTimelineEvent,
      onToggleTimelineEvent: toggleTimelineEvent,
      onDeleteTimelineEvent: deleteTimelineEvent,
      onCreateTeam: createTeam,
      onJoinTeam: joinTeam,
      onOnboardingSuccess: handleCloseOnboarding,
    },
  };
}

export type TimelineViewModelResult = ReturnType<typeof useTimelineViewModel>;
