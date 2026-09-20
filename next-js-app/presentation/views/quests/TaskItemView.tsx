'use client';

import React from 'react';
import { Check, User, Users, Sparkles } from 'lucide-react';
import { Badge } from '../../components/common/Badge';
import { TaskItemViewModel } from '../../view-models/quests/useTaskItem';
import { TaskAssignee } from '../../types';

const renderAssigneeIcon = (assignee: TaskAssignee) => {
  switch (assignee) {
    case 'ME':
      return <User className="w-3 h-3" />;
    case 'PARTNER':
      return <Users className="w-3 h-3" />;
    case 'BOTH':
      return <Sparkles className="w-3 h-3" />;
  }
};

export const TaskItemView: React.FC<TaskItemViewModel> = ({
  task,
  isDone,
  assigneeInfo,
  handlers,
}) => {
  return (
    <div
      onClick={handlers.onToggle}
      className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer select-none group ${
        isDone
          ? 'bg-slate-50/70 border-slate-100 text-slate-400'
          : 'bg-white border-slate-100 hover:border-slate-200 shadow-2xs'
      }`}
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {/* Checkbox button */}
        <div
          className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-all shrink-0 ${
            isDone
              ? 'bg-emerald-500 border-emerald-500 text-white shadow-2xs'
              : 'border-slate-300 group-hover:border-rose-400 bg-slate-50'
          }`}
        >
          {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1 pr-2">
          <p
            className={`text-xs font-semibold leading-snug transition-all ${
              isDone
                ? 'line-through text-slate-400'
                : 'text-slate-800'
            }`}
          >
            {task.content}
          </p>
          {isDone && task.completedAt && (
            <span className="text-[10px] text-slate-400 block mt-0.5">
              완료: {task.completedAt}
            </span>
          )}
        </div>
      </div>

      {/* Assignee Badge */}
      <Badge
        variant={assigneeInfo.variant}
        size="sm"
        icon={renderAssigneeIcon(assigneeInfo.assignee)}
        className="shrink-0"
      >
        {assigneeInfo.label}
      </Badge>
    </div>
  );
};
