'use client';

import React from 'react';
import Link from 'next/link';
import { CheckSquare, ChevronRight, Circle, Plus } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { UpcomingQuestsWidgetViewModel } from '../../view-models/dashboard/useUpcomingQuestsWidget';

export const UpcomingQuestsWidgetView: React.FC<UpcomingQuestsWidgetViewModel> = ({
  tasks,
  hasTasks,
  onToggleTask,
}) => {
  return (
    <Card padding="md" className="border-slate-100 shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <CheckSquare className="w-4 h-4 text-emerald-500" />
          <h3 className="text-sm font-bold text-slate-900">
            할 일 체크리스트
          </h3>
        </div>
        {hasTasks && (
          <Link
            href="/quests"
            className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-0.5"
          >
            <span>전체보기</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>

      <div className="space-y-2">
        {!hasTasks ? (
          <div className="py-6 text-center bg-slate-50/60 rounded-2xl border border-dashed border-slate-200 p-4">
            <p className="text-xs text-slate-500 font-medium mb-2.5">
              아직 등록된 퀘스트(할 일)가 없어요.
            </p>
            <Link
              href="/quests"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-emerald-200 text-emerald-700 text-xs font-bold shadow-2xs hover:bg-emerald-50 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>첫 퀘스트 만들기</span>
            </Link>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => onToggleTask(task.id)}
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer hover:bg-slate-100/80 transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <button className="text-slate-400 hover:text-emerald-500 transition-colors shrink-0">
                  <Circle className="w-4 h-4" />
                </button>
                <div className="min-w-0">
                  <div className="text-[10px] text-slate-400 truncate">
                    {task.questTitle}
                  </div>
                  <div className="text-xs font-medium text-slate-800 truncate">
                    {task.content}
                  </div>
                </div>
              </div>

              <Badge variant={task.assigneeVariant} size="sm" className="shrink-0 ml-2">
                {task.assigneeText}
              </Badge>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};
