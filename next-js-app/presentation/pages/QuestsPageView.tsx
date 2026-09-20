'use client';

import React from 'react';
import { useQuestsViewModel } from '../view-models/pages/useQuestsViewModel';
import { QuestsView } from '../views/pages/QuestsView';

export const QuestsPageView: React.FC = () => {
  const { state, handlers } = useQuestsViewModel();
  return <QuestsView state={state} handlers={handlers} />;
};
