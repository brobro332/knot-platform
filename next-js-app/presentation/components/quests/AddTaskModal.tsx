'use client';

import React from 'react';
import { AddTaskModalProps, useAddTaskModal } from '../../view-models/quests/useAddTaskModal';
import { AddTaskModalView } from '../../views/quests/AddTaskModalView';

export type { AddTaskModalProps };

export const AddTaskModal: React.FC<AddTaskModalProps> = (props) => {
  const viewModel = useAddTaskModal(props);
  return <AddTaskModalView {...viewModel} />;
};
