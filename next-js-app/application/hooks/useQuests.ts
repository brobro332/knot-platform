'use client';

import { useState } from 'react';
import { Quest, TaskAssignee, QuestType, ActivityLog } from '../../presentation/types';
import { QuestLocalStorageRepository } from '../../infrastructure/storage/questRepository';
import { QuestService } from '../services/questService';
import { TimelineService } from '../services/timelineService';

export function useQuests() {
  const [quests, setQuests] = useState<Quest[]>(() =>
    QuestLocalStorageRepository.getQuests()
  );
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() =>
    QuestLocalStorageRepository.getActivityLogs()
  );

  const appendActivityLog = (
    teamId: number,
    actionType: ActivityLog['actionType'],
    message: string,
    actorName: string
  ) => {
    const newLog = TimelineService.createActivityLog(teamId, actionType, message, actorName);
    const updated = [newLog, ...activityLogs].slice(0, 20);
    setActivityLogs(updated);
    QuestLocalStorageRepository.saveActivityLogs(updated);
  };

  const toggleTask = (
    taskId: number,
    teamId?: number,
    userNickname: string = '나'
  ) => {
    const { updatedQuests, toggledTask } = QuestService.toggleTask(quests, taskId);
    setQuests(updatedQuests);
    QuestLocalStorageRepository.saveQuests(updatedQuests);

    if (toggledTask && teamId) {
      appendActivityLog(
        teamId,
        'COMPLETE_TASK',
        `"${toggledTask.content}" 상태 변경 (${toggledTask.status === 'DONE' ? '완료' : '진행중'})`,
        userNickname
      );
    }
  };

  const addQuest = (
    data: {
      title: string;
      description: string;
      questType: QuestType;
      dueDate: string;
      targetValue?: number;
    },
    teamId: number,
    userNickname: string = '나'
  ) => {
    const newQuest = QuestService.createQuestEntity(data, teamId);
    const updated = [newQuest, ...quests];
    setQuests(updated);
    QuestLocalStorageRepository.saveQuests(updated);

    appendActivityLog(teamId, 'ADD_QUEST', `"${newQuest.title}" 퀘스트 등록`, userNickname);
  };

  const addTask = (
    questId: number,
    content: string,
    assignee: TaskAssignee,
    teamId?: number,
    userNickname: string = '나'
  ) => {
    const { updatedQuests, newTask } = QuestService.addTaskToQuest(quests, questId, content, assignee);
    setQuests(updatedQuests);
    QuestLocalStorageRepository.saveQuests(updatedQuests);

    if (newTask && teamId) {
      appendActivityLog(teamId, 'ADD_QUEST', `"${newTask.content}" 태스크 등록`, userNickname);
    }
  };

  return {
    quests,
    activityLogs,
    toggleTask,
    addQuest,
    addTask,
    appendActivityLog,
  };
}
