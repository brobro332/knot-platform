'use client';

import { TimelineEvent, TimelineEventType } from '../../types';

export interface TimelineNodeItemProps {
  event: TimelineEvent;
  isLast?: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export interface TimelineNodeConfig {
  bgColor: string;
  badgeVariant: 'purple' | 'rose' | 'amber';
  label: string;
  eventType: TimelineEventType;
}

export function useTimelineNodeItem({
  event,
  isLast = false,
  onToggle,
  onDelete,
}: TimelineNodeItemProps) {
  let config: TimelineNodeConfig = {
    bgColor: 'bg-purple-100 border-purple-200',
    badgeVariant: 'purple',
    label: '마일스톤',
    eventType: event.eventType,
  };

  switch (event.eventType) {
    case 'MILESTONE':
      config = {
        bgColor: 'bg-purple-100 border-purple-200',
        badgeVariant: 'purple',
        label: '마일스톤',
        eventType: event.eventType,
      };
      break;
    case 'DATE':
      config = {
        bgColor: 'bg-rose-100 border-rose-200',
        badgeVariant: 'rose',
        label: '모임/일정',
        eventType: event.eventType,
      };
      break;
    case 'EXPENSE':
      config = {
        bgColor: 'bg-amber-100 border-amber-200',
        badgeVariant: 'amber',
        label: '지출 기록',
        eventType: event.eventType,
      };
      break;
  }

  const formattedAmount =
    event.amount !== undefined && event.amount > 0
      ? `${event.amount.toLocaleString()}원`
      : undefined;

  return {
    event,
    isLast,
    config,
    formattedAmount,
    handlers: {
      onToggle: () => onToggle(event.id),
      onDelete: () => onDelete(event.id),
    },
  };
}

export type TimelineNodeItemViewModel = ReturnType<typeof useTimelineNodeItem>;
