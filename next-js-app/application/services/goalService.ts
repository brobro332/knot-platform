import { Goal } from '../../presentation/types';

export interface DDayResult {
  label: string;
  days: number;
  isPassed: boolean;
}

export interface ProgressResult {
  percentage: number;
  remaining: number;
}

export const GoalService = {
  calculateDday(targetDateStr?: string | null): DDayResult | null {
    if (!targetDateStr) return null;
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const target = new Date(targetDateStr);
      target.setHours(0, 0, 0, 0);

      const diffTime = target.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) {
        return { label: 'D-Day', days: 0, isPassed: false };
      }
      if (diffDays > 0) {
        return { label: `D-${diffDays}`, days: diffDays, isPassed: false };
      }
      return { label: `D+${Math.abs(diffDays)}`, days: diffDays, isPassed: true };
    } catch {
      return null;
    }
  },

  calculateProgress(currentValue: number, targetValue: number): ProgressResult {
    if (!targetValue || targetValue <= 0) {
      return { percentage: 0, remaining: 0 };
    }
    const ratio = Math.min(1, Math.max(0, currentValue / targetValue));
    const percentage = Math.round(ratio * 100);
    const remaining = Math.max(0, targetValue - currentValue);
    return { percentage, remaining };
  },

  createGoalEntity(title: string, targetValue: number, dueDate: string, teamId: number, unit: string = '원'): Goal {
    return {
      id: Date.now(),
      teamId,
      title: title.trim(),
      goalType: 'AMOUNT',
      targetValue: Math.max(0, targetValue),
      currentValue: 0,
      dueDate,
      unit,
    };
  },

  updateGoalBalance(goal: Goal, newBalance: number): Goal {
    return {
      ...goal,
      currentValue: Math.max(0, newBalance),
    };
  },

  updateGoalTargetInfo(goal: Goal, title: string, targetValue: number, dueDate: string): Goal {
    return {
      ...goal,
      title: title.trim() || goal.title,
      targetValue: Math.max(0, targetValue),
      dueDate: dueDate || goal.dueDate,
    };
  },
};
