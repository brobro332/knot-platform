import { Goal } from '../../presentation/types';
import { LocalStorageClient } from './localStorageClient';

export interface IGoalRepository {
  getGoal(): Goal | null;
  saveGoal(goal: Goal | null): void;
  clear(): void;
}

export const GoalLocalStorageRepository: IGoalRepository = {
  getGoal(): Goal | null {
    return LocalStorageClient.get<Goal | null>('goal', null);
  },

  saveGoal(goal: Goal | null): void {
    if (goal === null) {
      LocalStorageClient.remove('goal');
    } else {
      LocalStorageClient.set('goal', goal);
    }
  },

  clear(): void {
    LocalStorageClient.remove('goal');
  },
};
