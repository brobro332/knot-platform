'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useKnot } from '../../state/KnotContext';

export function useSettingsViewModel() {
  const router = useRouter();
  const { team, currentUser, logout, createTeam, joinTeam } = useKnot();

  const [copied, setCopied] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [onboardingMode, setOnboardingMode] = useState<'SELECT' | 'CREATE' | 'JOIN'>('SELECT');

  const handleCopyCode = () => {
    if (!team?.inviteCode) return;
    navigator.clipboard.writeText(team.inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenOnboarding = (mode: 'CREATE' | 'JOIN') => {
    setOnboardingMode(mode);
    setIsOnboardingOpen(true);
  };

  const handleCloseOnboarding = () => {
    setIsOnboardingOpen(false);
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleNavigateToLogin = () => {
    router.push('/login');
  };

  return {
    state: {
      team,
      currentUser,
      copied,
      isOnboardingOpen,
      onboardingMode,
    },
    handlers: {
      onCopyInviteCode: handleCopyCode,
      onOpenOnboarding: handleOpenOnboarding,
      onCloseOnboarding: handleCloseOnboarding,
      onLogout: handleLogout,
      onNavigateToLogin: handleNavigateToLogin,
      onCreateTeam: createTeam,
      onJoinTeam: joinTeam,
      onOnboardingSuccess: handleCloseOnboarding,
    },
  };
}

export type SettingsViewModelResult = ReturnType<typeof useSettingsViewModel>;
