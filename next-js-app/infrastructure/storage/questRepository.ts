import { Quest, ActivityLog } from '../../presentation/types';
import { LocalStorageClient } from './localStorageClient';

export interface IQuestRepository {
  getQuests(): Quest[];
  saveQuests(quests: Quest[]): void;
  getActivityLogs(): ActivityLog[];
  saveActivityLogs(logs: ActivityLog[]): void;
  clear(): void;
}

export const QuestLocalStorageRepository: IQuestRepository = {
  getQuests(): Quest[] {
    return LocalStorageClient.get<Quest[]>('quests', []);
  },

  saveQuests(quests: Quest[]): void {
    LocalStorageClient.set('quests', quests);
  },

  getActivityLogs(): ActivityLog[] {
    return LocalStorageClient.get<ActivityLog[]>('logs', []);
  },

  saveActivityLogs(logs: ActivityLog[]): void {
    LocalStorageClient.set('logs', logs);
  },

  clear(): void {
    LocalStorageClient.remove('quests');
    LocalStorageClient.remove('logs');
  },
};
