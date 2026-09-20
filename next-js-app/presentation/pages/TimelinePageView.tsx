'use client';

import React from 'react';
import { useTimelineViewModel } from '../view-models/pages/useTimelineViewModel';
import { TimelineView } from '../views/pages/TimelineView';

export const TimelinePageView: React.FC = () => {
  const { state, handlers } = useTimelineViewModel();
  return <TimelineView state={state} handlers={handlers} />;
};
