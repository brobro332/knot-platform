'use client';

import React from 'react';
import { TimelineEventType } from '../../types';

export type TimelineFilterType = 'ALL' | TimelineEventType;

interface TimelineFilterProps {
  selected: TimelineFilterType;
  onChange: (filter: TimelineFilterType) => void;
  counts: Record<TimelineFilterType, number>;
}

export const TimelineFilter: React.FC<TimelineFilterProps> = ({
  selected,
  onChange,
  counts,
}) => {
  const filters: Array<{ type: TimelineFilterType; label: string }> = [
    { type: 'ALL', label: '전체' },
    { type: 'MILESTONE', label: '마일스톤' },
    { type: 'DATE', label: '모임/일정' },
    { type: 'EXPENSE', label: '지출' },
  ];

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar">
      {filters.map(({ type, label }) => {
        const isActive = selected === type;
        const count = counts[type] || 0;
        return (
          <button
            key={type}
            onClick={() => onChange(type)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
              isActive
                ? 'bg-rose-500 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>{label}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                isActive
                  ? 'bg-white/25 text-white'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
