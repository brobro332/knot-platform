'use client';

import React from 'react';
import { useLoginViewModel } from '../view-models/pages/useLoginViewModel';
import { LoginView } from '../views/pages/LoginView';

export const LoginPageView: React.FC = () => {
  const { state, handlers } = useLoginViewModel();
  return <LoginView state={state} handlers={handlers} />;
};
