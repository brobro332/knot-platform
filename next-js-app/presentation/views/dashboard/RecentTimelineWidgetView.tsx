'use client';

import React from 'react';
import Link from 'next/link';
import { CalendarDays, ChevronRight, Flag, Receipt, Plus } from 'lucide-react';
import { KnotIcon } from '../../components/common/KnotIcon';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { RecentTimelineWidgetViewModel, FormattedTimelineItem } from '../../view-models/dashboard/useRecentTimelineWidget';

const renderEventIcon = (type: FormattedTimelineItem['eventType']) => {
  switch (type) {
    case 'MILESTONE':
      return <Flag className="w-3.5 h-3.5 text-purple-600" />;
    case 'DATE':
      return <KnotIcon className="w-3.5 h-3.5 text-rose-500" strokeWidth={2.2} />;
    case 'EXPENSE':
      return <Receipt className="w-3.5 h-3.5 text-amber-600" />;
  }
};

export const RecentTimelineWidgetView: React.FC<RecentTimelineWidgetViewModel> = ({
  items,
  hasItems,
}) => {
  return (
    <Card padding="md" className="border-slate-100 shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-rose-500" />
          <h3 className="text-sm font-bold text-slate-900">
            우리 팀 최근 기록
          </h3>
        </div>
        {hasItems && (
          <Link
            href="/timeline"
            className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-0.5"
          >
            <span>더보기</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>

      <div className="space-y-2.5">
        {!hasItems ? (
          <div className="py-6 text-center bg-slate-50/60 rounded-2xl border border-dashed border-slate-200 p-4">
            <p className="text-xs text-slate-500 font-medium mb-2.5">
              아직 타임라인에 기록된 일정이 없어요.
            </p>
            <Link
              href="/timeline"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-rose-200 text-rose-600 text-xs font-bold shadow-2xs hover:bg-rose-50 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>첫 일정 기록하기</span>
            </Link>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-2xs shrink-0 border border-slate-100">
                  {renderEventIcon(item.eventType)}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <Badge variant={item.badgeVariant} size="sm">
                      {item.badgeLabel}
                    </Badge>
                    <span className="text-[11px] text-slate-400">{item.date}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 truncate mt-0.5">
                    {item.title}
                  </h4>
                </div>
              </div>

              {item.formattedAmount && (
                <span className="text-xs font-bold text-slate-700 shrink-0 ml-2">
                  {item.formattedAmount}
                </span>
              )}
            </div>
          ))
        )}
      </div>
    </Card>
  );
};
