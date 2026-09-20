'use client';

import { useState } from 'react';

export interface CreateGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateGoal: (title: string, targetValue: number, dueDate: string) => void;
}

const PRESET_TITLES = [
  '💼 창업 / 사이드 프로젝트 펀드',
  '✈️ 우정 여행 / 워케이션 자금',
  '🏠 신혼집 / 보증금 마련',
  '🎯 1억 모으기 챌린지',
  '💻 공동 스터디 / 장비 펀드',
  '💒 결혼 준비 자금',
];

const AMOUNT_PRESETS = [
  { value: 10000000, label: '+1,000만' },
  { value: 30000000, label: '+3,000만' },
  { value: 50000000, label: '+5,000만' },
  { value: 100000000, label: '+1억' },
];

export function useCreateGoalModal({
  isOpen,
  onClose,
  onCreateGoal,
}: CreateGoalModalProps) {
  const [title, setTitle] = useState('');
  const [targetValue, setTargetValue] = useState('');
  const [dueDate, setDueDate] = useState(() => {
    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    return nextYear.toISOString().split('T')[0];
  });
  const [error, setError] = useState('');

  const parsedAmount = parseInt(targetValue, 10);
  const formattedAmount = !isNaN(parsedAmount) && parsedAmount > 0
    ? parsedAmount >= 100000000
      ? `${(parsedAmount / 100000000).toFixed(1).replace('.0', '')}억 ${(parsedAmount % 100000000) > 0 ? `${Math.floor((parsedAmount % 100000000) / 10000)}만 ` : ''}원`
      : parsedAmount >= 10000
      ? `${(parsedAmount / 10000).toLocaleString()}만 원`
      : `${parsedAmount.toLocaleString()}원`
    : null;

  const handleAddAmount = (addVal: number) => {
    const current = isNaN(parsedAmount) ? 0 : parsedAmount;
    setTargetValue((current + addVal).toString());
    setError('');
  };

  const handleSelectPresetTitle = (preset: string) => {
    setTitle(preset);
    setError('');
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    setError('');
  };

  const handleTargetValueChange = (val: string) => {
    setTargetValue(val);
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('목표 이름을 입력해주세요.');
      return;
    }
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('올바른 목표 금액을 입력해주세요.');
      return;
    }
    if (!dueDate) {
      setError('목표 달성 예정일을 선택해주세요.');
      return;
    }

    onCreateGoal(title.trim(), parsedAmount, dueDate);
    onClose();
  };

  return {
    isOpen,
    title,
    targetValue,
    dueDate,
    error,
    formattedAmount,
    formattedParsedAmount: !isNaN(parsedAmount) ? `${parsedAmount.toLocaleString()}원` : '',
    presetTitles: PRESET_TITLES,
    amountPresets: AMOUNT_PRESETS,
    handlers: {
      onClose,
      onTitleChange: handleTitleChange,
      onTargetValueChange: handleTargetValueChange,
      onDueDateChange: setDueDate,
      onSelectPresetTitle: handleSelectPresetTitle,
      onAddAmount: handleAddAmount,
      onSubmit: handleSubmit,
    },
  };
}

export type CreateGoalModalViewModel = ReturnType<typeof useCreateGoalModal>;
