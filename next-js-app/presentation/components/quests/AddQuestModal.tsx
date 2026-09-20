'use client';

import React from 'react';
import { AddQuestModalProps, useAddQuestModal } from '../../view-models/quests/useAddQuestModal';
import { AddQuestModalView } from '../../views/quests/AddQuestModalView';

export type { AddQuestModalProps };

export const AddQuestModal: React.FC<AddQuestModalProps> = (props) => {
  const viewModel = useAddQuestModal(props);
  return <AddQuestModalView {...viewModel} />;
};
