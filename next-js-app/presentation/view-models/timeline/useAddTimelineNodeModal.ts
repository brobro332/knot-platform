'use client';

import { useState } from 'react';
import { TimelineEventType } from '../../types';

export interface AddTimelineNodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (eventData: {
    title: string;
    eventType: TimelineEventType;
    date: string;
    amount?: number;
    description?: string;
    location?: string;
    dattShared?: boolean;
  }) => void;
}

export interface TimelineTypeOption {
  type: TimelineEventType;
  label: string;
  desc: string;
  activeBorder: string;
}

const TYPE_OPTIONS: TimelineTypeOption[] = [
  {
    type: 'MILESTONE',
    label: '마일스톤',
    desc: '굵직한 목표/할 일',
    activeBorder: 'border-purple-400 bg-purple-50/60 shadow-2xs',
  },
  {
    type: 'DATE',
    label: '모임/일정',
    desc: '만남 & 핫플 방문',
    activeBorder: 'border-rose-400 bg-rose-50/60 shadow-2xs',
  },
  {
    type: 'EXPENSE',
    label: '지출 기록',
    desc: '소중한 소비 내역',
    activeBorder: 'border-amber-400 bg-amber-50/60 shadow-2xs',
  },
];

export function useAddTimelineNodeModal({
  isOpen,
  onClose,
  onAddEvent,
}: AddTimelineNodeModalProps) {
  const [eventType, setEventType] = useState<TimelineEventType>('MILESTONE');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [amount, setAmount] = useState('');
  const [dattShared, setDattShared] = useState(true);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setLocation('');
    setAmount('');
    setDattShared(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddEvent({
      title: title.trim(),
      eventType,
      date,
      description: description.trim() || undefined,
      location: location.trim() || undefined,
      amount: amount ? parseInt(amount, 10) : undefined,
      dattShared: eventType === 'DATE' ? dattShared : undefined,
    });

    resetForm();
    onClose();
  };

  return {
    isOpen,
    eventType,
    title,
    date,
    description,
    location,
    amount,
    dattShared,
    typeOptions: TYPE_OPTIONS,
    handlers: {
      onClose,
      onEventTypeChange: setEventType,
      onTitleChange: setTitle,
      onDateChange: setDate,
      onDescriptionChange: setDescription,
      onLocationChange: setLocation,
      onAmountChange: setAmount,
      onDattSharedChange: setDattShared,
      onSubmit: handleSubmit,
    },
  };
}

export type AddTimelineNodeModalViewModel = ReturnType<typeof useAddTimelineNodeModal>;
