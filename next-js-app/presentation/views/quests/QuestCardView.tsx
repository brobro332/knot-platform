'use client';

import React from 'react';
import {
  Calendar,
  CheckCircle2,
  Plus,
  Home,
  Heart,
  Plane,
  Coins,
  Bookmark,
  Briefcase,
  BookOpen,
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { TaskItem } from '../../components/quests/TaskItem';
import { QuestCardViewModel } from '../../view-models/quests/useQuestCard';
import { QuestType } from '../../types';

const renderCategoryIcon = (type: QuestType) => {
  switch (type) {
    case 'PROJECT':
      return <Briefcase className="w-3.5 h-3.5 text-purple-600" />;
    case 'STUDY':
      return <BookOpen className="w-3.5 h-3.5 text-blue-600" />;
    case 'WEDDING':
      return <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />;
    case 'HOUSING':
      return <Home className="w-3.5 h-3.5 text-blue-500" />;
    case 'TRAVEL':
      return <Plane className="w-3.5 h-3.5 text-emerald-500" />;
    case 'FINANCE':
      return <Coins className="w-3.5 h-3.5 text-amber-500" />;
    default:
      return <Bookmark className="w-3.5 h-3.5 text-zinc-500" />;
  }
};

export const QuestCardView: React.FC<QuestCardViewModel> = ({
  quest,
  completedCount,
  totalCount,
  percentage,
  isAllCompleted,
  category,
  handlers,
}) => {
  return (
    <Card padding="md" className="space-y-4 border-slate-100 shadow-xs">
      {/* Quest Header */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <Badge
            variant={category.variant}
            size="sm"
            icon={renderCategoryIcon(category.type)}
          >
            {category.label}
          </Badge>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400">
            <Calendar className="w-3.5 h-3.5" />
            <span>기한: {quest.dueDate}</span>
          </div>
        </div>

        <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
          <span>{quest.title}</span>
          {isAllCompleted && (
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          )}
        </h3>

        {quest.description && (
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            {quest.description}
          </p>
        )}
      </div>

      {/* Progress Bar & Counter */}
      <div className="space-y-1.5 bg-slate-50/80 p-3 rounded-2xl border border-slate-100">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-600">진행률</span>
          <span className="font-bold text-slate-900">
            {completedCount} / {totalCount} 완료 ({percentage}%)
          </span>
        </div>
        <div className="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              isAllCompleted
                ? 'bg-emerald-500'
                : 'bg-gradient-to-r from-rose-500 to-pink-500'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Task Checklist Items */}
      <div className="space-y-2">
        {quest.tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={handlers.onToggleTask}
          />
        ))}

        {/* Add Task Button */}
        <button
          onClick={handlers.onOpenAddTask}
          className="w-full py-2.5 px-3 rounded-2xl border border-dashed border-slate-200 hover:border-rose-300 bg-white hover:bg-rose-50/30 text-slate-400 hover:text-rose-500 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>새로운 세부 할 일 추가</span>
        </button>
      </div>
    </Card>
  );
};
