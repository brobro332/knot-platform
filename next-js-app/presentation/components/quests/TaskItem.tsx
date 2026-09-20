'use client';

import React from 'react';
import { TaskItemProps, useTaskItem } from '../../view-models/quests/useTaskItem';
import { TaskItemView } from '../../views/quests/TaskItemView';

export type { TaskItemProps };

export const TaskItem: React.FC<TaskItemProps> = (props) => {
  const viewModel = useTaskItem(props);
  return <TaskItemView {...viewModel} />;
};
