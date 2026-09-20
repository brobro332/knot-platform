'use client';

import React from 'react';
import { useAppLayout } from '../view-models/layouts/useAppLayout';
import { AppLayoutView } from '../views/layouts/AppLayoutView';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const viewModel = useAppLayout();
  return <AppLayoutView {...viewModel}>{children}</AppLayoutView>;
};
