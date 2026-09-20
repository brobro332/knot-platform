'use client';

import React from 'react';
import { CreateGoalModalProps, useCreateGoalModal } from '../../view-models/dashboard/useCreateGoalModal';
import { CreateGoalModalView } from '../../views/dashboard/CreateGoalModalView';

export type { CreateGoalModalProps };

export const CreateGoalModal: React.FC<CreateGoalModalProps> = (props) => {
  const viewModel = useCreateGoalModal(props);
  return <CreateGoalModalView {...viewModel} />;
};
