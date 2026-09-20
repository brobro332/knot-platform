import { Quest, Task, TaskAssignee, QuestType } from '../../presentation/types';

export const QuestService = {
  calculateProgress(quest: Quest): { completedCount: number; totalCount: number; percentage: number; isAllCompleted: boolean } {
    const totalCount = quest.tasks.length;
    const completedCount = quest.tasks.filter((t) => t.status === 'DONE').length;
    const percentage = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);
    const isAllCompleted = totalCount > 0 && completedCount === totalCount;
    return { completedCount, totalCount, percentage, isAllCompleted };
  },

  toggleTask(quests: Quest[], taskId: number): { updatedQuests: Quest[]; toggledTask?: Task } {
    let toggledTask: Task | undefined;
    const updatedQuests = quests.map((q) => {
      const taskIndex = q.tasks.findIndex((t) => t.id === taskId);
      if (taskIndex === -1) return q;

      const updatedTasks = q.tasks.map((t) => {
        if (t.id !== taskId) return t;
        const newStatus: Task['status'] = t.status === 'DONE' ? 'PENDING' : 'DONE';
        toggledTask = {
          ...t,
          status: newStatus,
          completedAt: newStatus === 'DONE' ? new Date().toISOString() : undefined,
        };
        return toggledTask;
      });

      return { ...q, tasks: updatedTasks };
    });

    return { updatedQuests, toggledTask };
  },

  createQuestEntity(
    data: {
      title: string;
      description: string;
      questType: QuestType;
      dueDate: string;
      targetValue?: number;
    },
    teamId: number
  ): Quest {
    return {
      id: Date.now(),
      teamId,
      title: data.title.trim(),
      description: data.description.trim(),
      questType: data.questType,
      status: 'IN_PROGRESS',
      dueDate: data.dueDate,
      targetValue: data.targetValue || 0,
      currentValue: 0,
      tasks: [],
      createdAt: new Date().toISOString().split('T')[0],
    };
  },

  addTaskToQuest(
    quests: Quest[],
    questId: number,
    content: string,
    assignee: TaskAssignee
  ): { updatedQuests: Quest[]; newTask?: Task } {
    const targetQuest = quests.find((q) => q.id === questId);
    const displayOrder = targetQuest ? targetQuest.tasks.length + 1 : 1;

    const newTask: Task = {
      id: Date.now(),
      questId,
      content: content.trim(),
      status: 'PENDING',
      assignee,
      displayOrder,
    };

    const updatedQuests = quests.map((q) => {
      if (q.id !== questId) return q;
      return {
        ...q,
        tasks: [...q.tasks, newTask],
      };
    });

    return { updatedQuests, newTask };
  },
};
