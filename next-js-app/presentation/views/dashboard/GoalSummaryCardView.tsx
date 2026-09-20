'use client';

import React from 'react';
import { Target, Calendar, Edit3 } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { GoalSummaryCardViewModel } from '../../view-models/dashboard/useGoalSummaryCard';

export const GoalSummaryCardView: React.FC<GoalSummaryCardViewModel> = ({
  goal,
  formattedTargetValue,
  editState,
  handlers,
}) => {
  return (
    <>
      <Card padding="md" className="border-slate-100 shadow-xs">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100 shadow-2xs">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400">공동 목표</span>
              <h3 className="text-sm font-bold text-slate-800 line-clamp-1">
                {goal.title}
              </h3>
            </div>
          </div>
          <button
            onClick={handlers.onOpenEdit}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            title="목표 수정"
          >
            <Edit3 className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-slate-100 text-xs">
          <div>
            <span className="text-slate-400 block mb-0.5">목표 금액</span>
            <span className="font-bold text-slate-800">
              {formattedTargetValue}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">목표 예정일</span>
            <span className="font-bold text-slate-800 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {goal.dueDate}
            </span>
          </div>
        </div>
      </Card>

      <Modal
        isOpen={editState.isOpen}
        onClose={handlers.onCloseEdit}
        title="공동 목표 설정"
        description="함께 달성할 목표의 이름과 목표 금액을 설정하세요."
      >
        <form onSubmit={handlers.onSave} className="space-y-4">
          <Input
            label="목표 이름"
            value={editState.title}
            onChange={(e) => handlers.onTitleChange(e.target.value)}
            placeholder="예: 우리의 첫 보금자리 자금 모으기"
            required
          />
          <Input
            label="목표 금액 (원)"
            type="number"
            value={editState.targetValue}
            onChange={(e) => handlers.onTargetValueChange(e.target.value)}
            placeholder="10000000"
            required
          />
          <Input
            label="목표 기한"
            type="date"
            value={editState.dueDate}
            onChange={(e) => handlers.onDueDateChange(e.target.value)}
            required
          />
          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="secondary"
              className="flex-1"
              onClick={handlers.onCloseEdit}
            >
              취소
            </Button>
            <Button type="submit" variant="primary" className="flex-1">
              저장하기
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
