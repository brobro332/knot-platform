'use client';

import React from 'react';
import { TeamOnboardingModalProps, useTeamOnboardingModal } from '../../view-models/auth/useTeamOnboardingModal';
import { TeamOnboardingModalView } from '../../views/auth/TeamOnboardingModalView';

export type { TeamOnboardingModalProps };

export const TeamOnboardingModal: React.FC<TeamOnboardingModalProps> = (props) => {
  const viewModel = useTeamOnboardingModal(props);
  return <TeamOnboardingModalView {...viewModel} />;
};
