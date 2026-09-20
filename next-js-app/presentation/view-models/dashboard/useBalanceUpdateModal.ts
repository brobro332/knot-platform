'use client';

import { useState } from 'react';

export interface BalanceUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBalance: number;
  onUpdateBalance: (newBalance: number) => void;
}

export function useBalanceUpdateModal({
  isOpen,
  onClose,
  currentBalance,
  onUpdateBalance,
}: BalanceUpdateModalProps) {
  const [amount, setAmount] = useState<string>(() => currentBalance.toString());
  const [error, setError] = useState('');

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/[^0-9]/g, '');
    setAmount(rawVal);
    setError('');
  };

  const addPreset = (added: number) => {
    const currentNum = parseInt(amount, 10) || 0;
    setAmount((currentNum + added).toString());
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseInt(amount, 10);
    if (isNaN(parsed) || parsed < 0) {
      setError('올바른 금액을 입력해 주세요.');
      return;
    }
    onUpdateBalance(parsed);
    onClose();
  };

  const parsedAmount = parseInt(amount, 10) || 0;
  const diff = parsedAmount - currentBalance;
  const formattedDisplayAmount = amount ? parseInt(amount, 10).toLocaleString() : '';

  const presets = [
    { value: 100000, label: '+10만' },
    { value: 300000, label: '+30만' },
    { value: 500000, label: '+50만' },
    { value: 1000000, label: '+100만' },
  ];

  return {
    isOpen,
    error,
    formattedDisplayAmount,
    diff,
    presets,
    handlers: {
      onClose,
      onAmountChange: handleAmountChange,
      onAddPreset: addPreset,
      onSubmit: handleSubmit,
    },
  };
}

export type BalanceUpdateModalViewModel = ReturnType<typeof useBalanceUpdateModal>;
