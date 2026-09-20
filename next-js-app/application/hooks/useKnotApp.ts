'use client';

import { useTeam } from './useTeam';
import { useGoal } from './useGoal';
import { useTimeline } from './useTimeline';
import { useQuests } from './useQuests';
import { TimelineEvent, Quest, Role } from '../../presentation/types';

export function useKnotApp() {
  const teamState = useTeam();
  const goalState = useGoal(teamState.team?.id);
  const timelineState = useTimeline();
  const questsState = useQuests();

  const userNickname = teamState.currentUser?.nickname || '나';

  const addTeamMember = (nickname: string, role?: Role, avatarUrl?: string) => {
    const newMember = teamState.addTeamMember(nickname, role, avatarUrl);
    if (newMember && teamState.team) {
      questsState.appendActivityLog(
        teamState.team.id,
        'ADD_EVENT',
        `${newMember.nickname}님이 팀에 합류했습니다.`,
        userNickname
      );
    }
  };

  const addTimelineEvent = (eventData: {
    title: string;
    eventType: TimelineEvent['eventType'];
    date: string;
    amount?: number;
    description?: string;
    location?: string;
    dattShared?: boolean;
  }) => {
    const currentTeamId = teamState.team ? teamState.team.id : Date.now();
    const newEvent = timelineState.addTimelineEvent(
      eventData,
      currentTeamId
    );

    if (teamState.team) {
      questsState.appendActivityLog(
        teamState.team.id,
        'ADD_EVENT',
        `"${newEvent.title}" 기록`,
        userNickname
      );
    }
  };

  const createGoal = (
    title: string,
    targetValue: number,
    dueDate: string,
    unit?: string
  ) => {
    const currentTeamId = teamState.team ? teamState.team.id : Date.now();
    goalState.createGoal(title, targetValue, dueDate, currentTeamId, unit);

    if (teamState.team) {
      questsState.appendActivityLog(
        teamState.team.id,
        'UPDATE_BALANCE',
        `"${title}" (목표액: ${targetValue.toLocaleString()}원)`,
        userNickname
      );
    }
  };

  const updateBalance = (newBalance: number) => {
    goalState.updateBalance(newBalance);

    if (teamState.team) {
      questsState.appendActivityLog(
        teamState.team.id,
        'UPDATE_BALANCE',
        `현재 잔고: ${newBalance.toLocaleString()}원`,
        userNickname
      );
    }
  };

  const toggleTask = (taskId: number) => {
    questsState.toggleTask(
      taskId,
      teamState.team?.id,
      userNickname
    );
  };

  const addQuest = (data: {
    title: string;
    description: string;
    questType: Quest['questType'];
    dueDate: string;
    targetValue?: number;
  }) => {
    const currentTeamId = teamState.team ? teamState.team.id : Date.now();
    questsState.addQuest(data, currentTeamId, userNickname);
  };

  const addTask = (
    questId: number,
    content: string,
    assignee: Quest['tasks'][0]['assignee']
  ) => {
    questsState.addTask(
      questId,
      content,
      assignee,
      teamState.team?.id,
      userNickname
    );
  };

  return {
    // Team & Auth
    currentUser: teamState.currentUser,
    partner: teamState.partner,
    team: teamState.team,
    isLoggedIn: teamState.isLoggedIn,
    loginWithSocial: teamState.loginWithSocial,
    logout: teamState.logout,
    createTeam: teamState.createTeam,
    joinTeam: teamState.joinTeam,
    addTeamMember,

    // Goal
    goal: goalState.goal,
    dday: goalState.dday,
    progress: goalState.progress,
    createGoal,
    updateBalance,
    updateGoalTarget: goalState.updateGoalTarget,

    // Timeline
    timelineEvents: timelineState.timelineEvents,
    addTimelineEvent,
    toggleTimelineEvent: timelineState.toggleTimelineEvent,
    deleteTimelineEvent: timelineState.deleteTimelineEvent,

    // Quests & Logs
    quests: questsState.quests,
    activityLogs: questsState.activityLogs,
    toggleTask,
    addQuest,
    addTask,
  };
}

export type KnotAppHookResult = ReturnType<typeof useKnotApp>;
