'use client';

import React from 'react';
import { UpcomingQuestsWidgetProps, useUpcomingQuestsWidget } from '../../view-models/dashboard/useUpcomingQuestsWidget';
import { UpcomingQuestsWidgetView } from '../../views/dashboard/UpcomingQuestsWidgetView';

export type { UpcomingQuestsWidgetProps };

export const UpcomingQuestsWidget: React.FC<UpcomingQuestsWidgetProps> = (props) => {
  const viewModel = useUpcomingQuestsWidget(props);
  return <UpcomingQuestsWidgetView {...viewModel} />;
};
