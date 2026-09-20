'use client';

import React from 'react';
import { RecentTimelineWidgetProps, useRecentTimelineWidget } from '../../view-models/dashboard/useRecentTimelineWidget';
import { RecentTimelineWidgetView } from '../../views/dashboard/RecentTimelineWidgetView';

export type { RecentTimelineWidgetProps };

export const RecentTimelineWidget: React.FC<RecentTimelineWidgetProps> = (props) => {
  const viewModel = useRecentTimelineWidget(props);
  return <RecentTimelineWidgetView {...viewModel} />;
};
