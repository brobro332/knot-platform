'use client';

import { TimelineEvent } from '../../types';

export interface RecentTimelineWidgetProps {
  events: TimelineEvent[];
}

export interface FormattedTimelineItem {
  id: number;
  title: string;
  eventType: TimelineEvent['eventType'];
  date: string;
  amount?: number;
  formattedAmount?: string;
  badgeVariant: 'purple' | 'rose' | 'amber';
  badgeLabel: string;
}

export function useRecentTimelineWidget({ events }: RecentTimelineWidgetProps) {
  const displayEvents: FormattedTimelineItem[] = events.slice(0, 3).map((item) => {
    let badgeVariant: 'purple' | 'rose' | 'amber' = 'purple';
    let badgeLabel = '마일스톤';

    switch (item.eventType) {
      case 'MILESTONE':
        badgeVariant = 'purple';
        badgeLabel = '마일스톤';
        break;
      case 'DATE':
        badgeVariant = 'rose';
        badgeLabel = '모임/일정';
        break;
      case 'EXPENSE':
        badgeVariant = 'amber';
        badgeLabel = '지출';
        break;
    }

    return {
      id: item.id,
      title: item.title,
      eventType: item.eventType,
      date: item.date,
      amount: item.amount,
      formattedAmount: item.amount ? `${item.amount.toLocaleString()}원` : undefined,
      badgeVariant,
      badgeLabel,
    };
  });

  return {
    items: displayEvents,
    hasItems: displayEvents.length > 0,
  };
}

export type RecentTimelineWidgetViewModel = ReturnType<typeof useRecentTimelineWidget>;
