'use client';

import { useState } from 'react';
import { QuestType } from '../../types';

export interface AddQuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddQuest: (questData: {
    title: string;
    description: string;
    questType: QuestType;
    dueDate: string;
  }) => void;
}

const CATEGORIES: Array<{ type: QuestType; label: string }> = [
  { type: 'PROJECT', label: '프로젝트/창업' },
  { type: 'FINANCE', label: '자금/저축' },
  { type: 'TRAVEL', label: '여행/휴가' },
  { type: 'HOUSING', label: '주거/인테리어' },
  { type: 'STUDY', label: '스터디/챌린지' },
  { type: 'WEDDING', label: '웨딩/커플' },
  { type: 'GENERAL', label: '일반 과제' },
];

export function useAddQuestModal({
  isOpen,
  onClose,
  onAddQuest,
}: AddQuestModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questType, setQuestType] = useState<QuestType>('PROJECT');
  const [dueDate, setDueDate] = useState('2026-09-30');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddQuest({
      title: title.trim(),
      description: description.trim(),
      questType,
      dueDate,
    });

    setTitle('');
    setDescription('');
    onClose();
  };

  return {
    isOpen,
    title,
    description,
    questType,
    dueDate,
    categories: CATEGORIES,
    handlers: {
      onClose,
      onTitleChange: setTitle,
      onDescriptionChange: setDescription,
      onQuestTypeChange: setQuestType,
      onDueDateChange: setDueDate,
      onSubmit: handleSubmit,
    },
  };
}

export type AddQuestModalViewModel = ReturnType<typeof useAddQuestModal>;
