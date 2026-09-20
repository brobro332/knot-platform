'use client';

import { useState } from 'react';

export interface TeamOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTeam: (teamName: string) => string;
  onJoinTeam: (inviteCode: string) => boolean;
  onSuccess: () => void;
  initialMode?: 'SELECT' | 'CREATE' | 'JOIN';
}

export type OnboardingMode = 'SELECT' | 'CREATE' | 'JOIN' | 'CODE_GENERATED';

export function useTeamOnboardingModal({
  isOpen,
  onClose,
  onCreateTeam,
  onJoinTeam,
  onSuccess,
  initialMode = 'SELECT',
}: TeamOnboardingModalProps) {
  const [mode, setMode] = useState<OnboardingMode>(initialMode);
  const [prevInitialMode, setPrevInitialMode] = useState(initialMode);
  const [teamName, setTeamName] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  if (prevInitialMode !== initialMode) {
    setPrevInitialMode(initialMode);
    setMode(initialMode);
    setTeamName('');
    setInviteCode('');
    setGeneratedCode('');
    setCopied(false);
    setError('');
  }

  const handleClose = () => {
    setMode(initialMode);
    setTeamName('');
    setInviteCode('');
    setGeneratedCode('');
    setCopied(false);
    setError('');
    onClose();
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim()) return;
    const code = onCreateTeam(teamName.trim());
    setGeneratedCode(code);
    setMode('CODE_GENERATED');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteCode.trim() || inviteCode.length < 6) {
      setError('6자리 초대 코드를 입력해주세요.');
      return;
    }
    const ok = onJoinTeam(inviteCode.trim());
    if (ok) {
      onSuccess();
      handleClose();
    } else {
      setError('유효하지 않은 초대 코드입니다.');
    }
  };

  const title =
    mode === 'SELECT'
      ? '팀 연동 시작하기'
      : mode === 'CREATE'
      ? '새로운 팀 만들기'
      : mode === 'JOIN'
      ? '초대 코드로 팀 합류'
      : '초대 코드 발급 완료';

  const description =
    mode === 'SELECT'
      ? '팀원들과 함께 사용할 공동 팀 공간을 준비하세요.'
      : mode === 'CODE_GENERATED'
      ? '팀원들에게 아래 6자리 코드를 공유해주세요.'
      : undefined;

  return {
    isOpen,
    mode,
    teamName,
    inviteCode,
    generatedCode,
    copied,
    error,
    title,
    description,
    handlers: {
      onClose: handleClose,
      onSelectCreateMode: () => setMode('CREATE'),
      onSelectJoinMode: () => setMode('JOIN'),
      onBackToSelect: () => setMode('SELECT'),
      onTeamNameChange: setTeamName,
      onInviteCodeChange: (val: string) => {
        setInviteCode(val.toUpperCase());
        setError('');
      },
      onCreate: handleCreate,
      onCopy: handleCopy,
      onJoin: handleJoin,
      onGoToDashboard: () => {
        onSuccess();
        handleClose();
      },
    },
  };
}

export type TeamOnboardingModalViewModel = ReturnType<typeof useTeamOnboardingModal>;
