'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useKnot } from '../../state/KnotContext';

export function useLoginViewModel() {
  const router = useRouter();
  const { loginWithSocial, createTeam, joinTeam, team } = useKnot();
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  const handleSocialLogin = (provider: 'kakao' | 'google') => {
    loginWithSocial(provider);
    if (!team) {
      setIsOnboardingOpen(true);
    } else {
      router.push('/dashboard');
    }
  };

  const handleCloseOnboarding = () => {
    setIsOnboardingOpen(false);
    router.push('/dashboard');
  };

  const handleOnboardingSuccess = () => {
    router.push('/dashboard');
  };

  return {
    state: {
      isOnboardingOpen,
    },
    handlers: {
      onSocialLogin: handleSocialLogin,
      onCloseOnboarding: handleCloseOnboarding,
      onOnboardingSuccess: handleOnboardingSuccess,
      onCreateTeam: createTeam,
      onJoinTeam: joinTeam,
    },
  };
}

export type LoginViewModelResult = ReturnType<typeof useLoginViewModel>;
