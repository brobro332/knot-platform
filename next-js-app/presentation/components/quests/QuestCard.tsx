'use client';

import React from 'react';
import { QuestCardProps, useQuestCard } from '../../view-models/quests/useQuestCard';
import { QuestCardView } from '../../views/quests/QuestCardView';

export type { QuestCardProps };

export const QuestCard: React.FC<QuestCardProps> = (props) => {
  const viewModel = useQuestCard(props);
  return <QuestCardView {...viewModel} />;
};
