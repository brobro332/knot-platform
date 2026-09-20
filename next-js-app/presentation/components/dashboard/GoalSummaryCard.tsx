'use client';

import React from 'react';
import { GoalSummaryCardProps, useGoalSummaryCard } from '../../view-models/dashboard/useGoalSummaryCard';
import { GoalSummaryCardView } from '../../views/dashboard/GoalSummaryCardView';

export type { GoalSummaryCardProps };

export const GoalSummaryCard: React.FC<GoalSummaryCardProps> = (props) => {
  const viewModel = useGoalSummaryCard(props);
  return <GoalSummaryCardView {...viewModel} />;
};
