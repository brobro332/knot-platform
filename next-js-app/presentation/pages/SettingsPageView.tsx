'use client';

import React from 'react';
import { useSettingsViewModel } from '../view-models/pages/useSettingsViewModel';
import { SettingsView } from '../views/pages/SettingsView';

export const SettingsPageView: React.FC = () => {
  const { state, handlers } = useSettingsViewModel();
  return <SettingsView state={state} handlers={handlers} />;
};
