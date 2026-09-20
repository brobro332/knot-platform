'use client';

import { useState } from 'react';
import { Goal } from '../../types';

export interface GoalSummaryCardProps {
  goal: Goal;
  onUpdateGoalTarget: (title: string, targetValue: number, dueDate: string) => void;
}

export function useGoalSummaryCard({ goal, onUpdateGoalTarget }: GoalSummaryCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [title, setTitle] = useState(goal.title);
  const [targetValue, setTargetValue] = useState(goal.targetValue.toString());
  const [dueDate, setDueDate] = useState(goal.dueDate);

  const handleOpenEdit = () => {
    setTitle(goal.title);
    setTargetValue(goal.targetValue.toString());
    setDueDate(goal.dueDate);
    setIsEditOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditOpen(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseInt(targetValue, 10);
    if (!title.trim() || isNaN(parsed)) return;
    onUpdateGoalTarget(title.trim(), parsed, dueDate);
    setIsEditOpen(false);
  };

  const formattedTargetValue = `${goal.targetValue.toLocaleString()} ${goal.unit}`;

  return {
    goal,
    formattedTargetValue,
    editState: {
      isOpen: isEditOpen,
      title,
      targetValue,
      dueDate,
    },
    handlers: {
      onOpenEdit: handleOpenEdit,
      onCloseEdit: handleCloseEdit,
      onTitleChange: setTitle,
      onTargetValueChange: setTargetValue,
      onDueDateChange: setDueDate,
      onSave: handleSave,
    },
  };
}

export type GoalSummaryCardViewModel = ReturnType<typeof useGoalSummaryCard>;
