'use client';

import { useState } from 'react';
import { TimelineEvent, TimelineEventType } from '../../presentation/types';
import { TimelineLocalStorageRepository } from '../../infrastructure/storage/timelineRepository';
import { TimelineService } from '../services/timelineService';

export function useTimeline() {
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>(() =>
    TimelineLocalStorageRepository.getTimelineEvents()
  );

  const addTimelineEvent = (
    eventData: {
      title: string;
      eventType: TimelineEventType;
      date: string;
      amount?: number;
      description?: string;
      location?: string;
      dattShared?: boolean;
    },
    teamId: number,
  ): TimelineEvent => {
    const newEvent = TimelineService.createEventEntity(eventData, teamId);
    const updated = [newEvent, ...timelineEvents];
    setTimelineEvents(updated);
    TimelineLocalStorageRepository.saveTimelineEvents(updated);
    return newEvent;
  };

  const toggleTimelineEvent = (id: number) => {
    const updated = TimelineService.toggleEvent(timelineEvents, id);
    setTimelineEvents(updated);
    TimelineLocalStorageRepository.saveTimelineEvents(updated);
  };

  const deleteTimelineEvent = (id: number) => {
    const updated = TimelineService.deleteEvent(timelineEvents, id);
    setTimelineEvents(updated);
    TimelineLocalStorageRepository.saveTimelineEvents(updated);
  };

  return {
    timelineEvents,
    addTimelineEvent,
    toggleTimelineEvent,
    deleteTimelineEvent,
  };
}
