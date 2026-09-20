'use client';

import { useState, useMemo } from 'react';
import { Goal } from '../../presentation/types';
import { GoalLocalStorageRepository } from '../../infrastructure/storage/goalRepository';
import { GoalService, DDayResult, ProgressResult } from '../services/goalService';

export function useGoal(teamId?: number) {
  const [goal, setGoal] = useState<Goal | null>(() =>
    GoalLocalStorageRepository.getGoal()
  );

  const dday: DDayResult | null = useMemo(() => {
    return GoalService.calculateDday(goal?.dueDate);
  }, [goal]);

  const progress: ProgressResult = useMemo(() => {
    if (!goal) return { percentage: 0, remaining: 0 };
    return GoalService.calculateProgress(goal.currentValue, goal.targetValue);
  }, [goal]);

  const createGoal = (
    title: string,
    targetValue: number,
    dueDate: string,
    overrideTeamId?: number,
    unit: string = '원'
  ) => {
    const effectiveTeamId = overrideTeamId || teamId || Date.now();
    const newGoal = GoalService.createGoalEntity(
      title,
      targetValue,
      dueDate,
      effectiveTeamId,
      unit
    );

    setGoal(newGoal);
    GoalLocalStorageRepository.saveGoal(newGoal);
  };

  const updateBalance = (newBalance: number) => {
    if (!goal) return;
    const updated = GoalService.updateGoalBalance(goal, newBalance);
    setGoal(updated);
    GoalLocalStorageRepository.saveGoal(updated);
  };

  const updateGoalTarget = (title: string, targetValue: number, dueDate: string) => {
    if (!goal) return;
    const updated = GoalService.updateGoalTargetInfo(goal, title, targetValue, dueDate);
    setGoal(updated);
    GoalLocalStorageRepository.saveGoal(updated);
  };

  return {
    goal,
    dday,
    progress,
    createGoal,
    updateBalance,
    updateGoalTarget,
  };
}
