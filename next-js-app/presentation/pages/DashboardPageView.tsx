'use client';

import React from 'react';
import { useDashboardViewModel } from '../view-models/pages/useDashboardViewModel';
import { DashboardView } from '../views/pages/DashboardView';

export const DashboardPageView: React.FC = () => {
  const { state, handlers } = useDashboardViewModel();
  return <DashboardView state={state} handlers={handlers} />;
};
