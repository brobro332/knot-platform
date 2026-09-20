'use client';

import React from 'react';
import { TimelineEvent } from '../../types';
import { TimelineNodeItem } from './TimelineNodeItem';
import { CalendarDays, Plus } from 'lucide-react';
import { Button } from '../common/Button';

interface TimelineListProps {
  events: TimelineEvent[];
  onToggleEvent: (id: number) => void;
  onDeleteEvent: (id: number) => void;
  onAddClick?: () => void;
}

export const TimelineList: React.FC<TimelineListProps> = ({
  events,
  onToggleEvent,
  onDeleteEvent,
  onAddClick,
}) => {
  if (events.length === 0) {
    return (
      <div className="py-14 text-center px-4 bg-white rounded-3xl border border-slate-100 shadow-xs my-3">
        <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-500 mx-auto flex items-center justify-center mb-3 shadow-2xs border border-rose-100">
          <CalendarDays className="w-7 h-7 stroke-[1.8]" />
        </div>
        <h3 className="text-base font-bold text-slate-800">
          아직 등록된 기록이 없어요
        </h3>
        <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
          마일스톤, 모임 및 일정, 지출 내역을 등록하여 우리 팀만의 소중한 로드맵을 시작해보세요!
        </p>
        {onAddClick && (
          <div className="mt-4">
            <Button
              variant="primary"
              size="sm"
              icon={<Plus className="w-4 h-4" />}
              onClick={onAddClick}
            >
              첫 노드 추가하기
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="pt-2">
      {events.map((event, index) => (
        <TimelineNodeItem
          key={event.id}
          event={event}
          isLast={index === events.length - 1}
          onToggle={onToggleEvent}
          onDelete={onDeleteEvent}
        />
      ))}
    </div>
  );
};
