import { TimelineEvent, TimelineEventType, ActivityLog } from '../../presentation/types';

export const TimelineService = {
  createEventEntity(
    data: {
      title: string;
      eventType: TimelineEventType;
      date: string;
      amount?: number;
      description?: string;
      location?: string;
      dattShared?: boolean;
    },
    teamId: number
  ): TimelineEvent {
    return {
      id: Date.now(),
      teamId,
      title: data.title.trim(),
      eventType: data.eventType,
      date: data.date,
      amount: data.amount,
      isCompleted: false,
      description: data.description,
      location: data.location,
      dattShared: data.dattShared,
      createdAt: new Date().toISOString().split('T')[0],
    };
  },

  toggleEvent(events: TimelineEvent[], id: number): TimelineEvent[] {
    return events.map((event) =>
      event.id === id ? { ...event, isCompleted: !event.isCompleted } : event
    );
  },

  deleteEvent(events: TimelineEvent[], id: number): TimelineEvent[] {
    return events.filter((event) => event.id !== id);
  },

  filterEvents(events: TimelineEvent[], filterType: 'ALL' | TimelineEventType): TimelineEvent[] {
    if (filterType === 'ALL') return events;
    return events.filter((e) => e.eventType === filterType);
  },

  sortEventsChronological(events: TimelineEvent[]): TimelineEvent[] {
    return [...events].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },

  createActivityLog(
    teamId: number,
    actionType: ActivityLog['actionType'],
    message: string,
    actorName: string
  ): ActivityLog {
    return {
      id: Date.now(),
      teamId,
      actorName,
      actionType,
      message,
      createdAt: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
    };
  },
};
