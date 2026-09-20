'use client';

import React from 'react';
import { AddTimelineNodeModalProps, useAddTimelineNodeModal } from '../../view-models/timeline/useAddTimelineNodeModal';
import { AddTimelineNodeModalView } from '../../views/timeline/AddTimelineNodeModalView';

export type { AddTimelineNodeModalProps };

export const AddTimelineNodeModal: React.FC<AddTimelineNodeModalProps> = (props) => {
  const viewModel = useAddTimelineNodeModal(props);
  return <AddTimelineNodeModalView {...viewModel} />;
};
