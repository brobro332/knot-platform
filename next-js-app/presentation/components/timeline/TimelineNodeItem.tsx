'use client';

import React from 'react';
import { TimelineNodeItemProps, useTimelineNodeItem } from '../../view-models/timeline/useTimelineNodeItem';
import { TimelineNodeItemView } from '../../views/timeline/TimelineNodeItemView';

export type { TimelineNodeItemProps };

export const TimelineNodeItem: React.FC<TimelineNodeItemProps> = (props) => {
  const viewModel = useTimelineNodeItem(props);
  return <TimelineNodeItemView {...viewModel} />;
};
