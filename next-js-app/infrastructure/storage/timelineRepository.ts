import { TimelineEvent } from '../../presentation/types';
import { LocalStorageClient } from './localStorageClient';

export interface ITimelineRepository {
  getTimelineEvents(): TimelineEvent[];
  saveTimelineEvents(events: TimelineEvent[]): void;
  clear(): void;
}

export const TimelineLocalStorageRepository: ITimelineRepository = {
  getTimelineEvents(): TimelineEvent[] {
    return LocalStorageClient.get<TimelineEvent[]>('timeline', []);
  },

  saveTimelineEvents(events: TimelineEvent[]): void {
    LocalStorageClient.set('timeline', events);
  },

  clear(): void {
    LocalStorageClient.remove('timeline');
  },
};
