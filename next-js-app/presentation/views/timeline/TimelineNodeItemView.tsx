'use client';

import React from 'react';
import {
  Flag,
  Receipt,
  MapPin,
  Sparkles,
  ExternalLink,
  Check,
  Trash2,
} from 'lucide-react';
import { KnotIcon } from '../../components/common/KnotIcon';
import { Badge } from '../../components/common/Badge';
import { TimelineNodeItemViewModel } from '../../view-models/timeline/useTimelineNodeItem';
import { TimelineEventType } from '../../types';

const renderNodeIcon = (type: TimelineEventType) => {
  switch (type) {
    case 'MILESTONE':
      return <Flag className="w-4 h-4 text-purple-600" />;
    case 'DATE':
      return <KnotIcon className="w-4 h-4 text-rose-600" strokeWidth={2.2} />;
    case 'EXPENSE':
      return <Receipt className="w-4 h-4 text-amber-600" />;
  }
};

export const TimelineNodeItemView: React.FC<TimelineNodeItemViewModel> = ({
  event,
  isLast,
  config,
  formattedAmount,
  handlers,
}) => {
  return (
    <div className="relative flex items-start gap-3.5 group">
      {/* Vertical line connector */}
      {!isLast && (
        <div className="absolute left-4.5 top-9 bottom-0 w-0.5 bg-slate-200" />
      )}

      {/* Node Icon Circle */}
      <button
        onClick={handlers.onToggle}
        className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all cursor-pointer ${
          event.isCompleted
            ? 'bg-emerald-500 border-emerald-400 text-white shadow-xs shadow-emerald-200'
            : `${config.bgColor}`
        }`}
        title={event.isCompleted ? '완료 취소하기' : '완료로 표시하기'}
      >
        {event.isCompleted ? (
          <Check className="w-4 h-4 stroke-[3]" />
        ) : (
          renderNodeIcon(config.eventType)
        )}
      </button>

      {/* Node Content Card */}
      <div className="flex-1 pb-6">
        <div
          className={`p-4 rounded-2xl bg-white border transition-all ${
            event.isCompleted
              ? 'border-slate-100 opacity-70'
              : 'border-slate-100 shadow-xs hover:border-slate-200'
          }`}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant={config.badgeVariant} size="sm">
                {config.label}
              </Badge>
              <span className="text-xs font-semibold text-slate-400">
                {event.date}
              </span>
              {event.isCompleted && (
                <Badge variant="emerald" size="sm">
                  완료됨
                </Badge>
              )}
            </div>

            <button
              onClick={handlers.onDelete}
              className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 p-1 rounded-lg transition-opacity cursor-pointer"
              title="노드 삭제"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Title */}
          <h4
            className={`text-sm font-bold mt-2 text-slate-900 ${
              event.isCompleted ? 'line-through text-slate-400' : ''
            }`}
          >
            {event.title}
          </h4>

          {/* Description */}
          {event.description && (
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {event.description}
            </p>
          )}

          {/* Details & Metadata */}
          <div className="mt-3 flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            {/* Amount */}
            {formattedAmount && (
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 font-bold text-xs border border-amber-100">
                <span>지출:</span>
                <span>{formattedAmount}</span>
              </div>
            )}

            {/* Location */}
            {event.location && (
              <div className="inline-flex items-center gap-1 text-xs text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{event.location}</span>
              </div>
            )}

            {/* DATT Shared Badge & Link */}
            {event.dattShared && (
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-violet-50 text-violet-600 text-[10px] font-semibold border border-violet-100">
                <Sparkles className="w-3 h-3 text-violet-500" />
                <span>DATT 추천 공유 장소</span>
              </div>
            )}

            {event.dattRecommendationUrl && (
              <a
                href={event.dattRecommendationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-violet-600 hover:underline ml-auto"
              >
                <span>DATT 코스 보기</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
