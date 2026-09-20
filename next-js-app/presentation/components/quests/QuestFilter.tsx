'use client';

import React from 'react';

export type QuestFilterType = 'ALL' | 'IN_PROGRESS' | 'COMPLETED' | 'MY_TASKS';

interface QuestFilterProps {
  selected: QuestFilterType;
  onChange: (filter: QuestFilterType) => void;
  counts: Record<QuestFilterType, number>;
}

export const QuestFilter: React.FC<QuestFilterProps> = ({
  selected,
  onChange,
  counts,
}) => {
  const filters: Array<{ type: QuestFilterType; label: string }> = [
    { type: 'ALL', label: '전체' },
    { type: 'IN_PROGRESS', label: '진행중' },
    { type: 'MY_TASKS', label: '내 담당' },
    { type: 'COMPLETED', label: '완료됨' },
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
