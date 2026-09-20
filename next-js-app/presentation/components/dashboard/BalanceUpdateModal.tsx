'use client';

import React from 'react';
import { BalanceUpdateModalProps, useBalanceUpdateModal } from '../../view-models/dashboard/useBalanceUpdateModal';
import { BalanceUpdateModalView } from '../../views/dashboard/BalanceUpdateModalView';

export type { BalanceUpdateModalProps };

export const BalanceUpdateModal: React.FC<BalanceUpdateModalProps> = (props) => {
  const viewModel = useBalanceUpdateModal(props);
  return <BalanceUpdateModalView {...viewModel} />;
};
