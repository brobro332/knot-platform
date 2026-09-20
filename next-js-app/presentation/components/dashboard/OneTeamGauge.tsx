'use client';

import React from 'react';
import { OneTeamGaugeProps, useOneTeamGauge } from '../../view-models/dashboard/useOneTeamGauge';
import { OneTeamGaugeView } from '../../views/dashboard/OneTeamGaugeView';

export type { OneTeamGaugeProps };

export const OneTeamGauge: React.FC<OneTeamGaugeProps> = (props) => {
  const viewModel = useOneTeamGauge(props);
  return <OneTeamGaugeView {...viewModel} />;
};
