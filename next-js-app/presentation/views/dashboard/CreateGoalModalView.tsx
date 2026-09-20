'use client';

import React from 'react';
import { Target, Sparkles } from 'lucide-react';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { CreateGoalModalViewModel } from '../../view-models/dashboard/useCreateGoalModal';

export const CreateGoalModalView: React.FC<CreateGoalModalViewModel> = ({
  isOpen,
  title,
  targetValue,
  dueDate,
  error,
  formattedAmount,
  formattedParsedAmount,
  presetTitles,
  amountPresets,
  handlers,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={handlers.onClose}
      title="공동 목표 설정"
      description="팀원들과 함께 달성할 첫 번째 원팀 목표를 설정해보세요."
    >
      <form onSubmit={handlers.onSubmit} className="space-y-4">
        {/* Title input & Preset chips */}
        <div className="space-y-2">
          <Input
            label="목표 이름"
            value={title}
            onChange={(e) => handlers.onTitleChange(e.target.value)}
            placeholder="예: 프로젝트 런칭 자금, 도쿄 우정 여행, 신혼집 보증금"
            required
            autoFocus
          />
          <div className="flex flex-wrap gap-1.5 pt-1">
            {presetTitles.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => handlers.onSelectPresetTitle(preset)}
                className="px-2.5 py-1 text-xs rounded-full bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 border border-slate-200 hover:border-rose-200 transition-colors cursor-pointer"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Target Value input & Quick addition chips */}
        <div className="space-y-2">
          <Input
            label="목표 금액 (원)"
            type="number"
            value={targetValue}
            onChange={(e) => handlers.onTargetValueChange(e.target.value)}
            placeholder="예: 30000000"
            required
          />
          {formattedAmount && (
            <div className="text-xs font-semibold text-rose-600 flex items-center gap-1 px-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{formattedAmount} ({formattedParsedAmount})</span>
            </div>
          )}
          <div className="flex gap-1.5 pt-1">
            {amountPresets.map((preset) => (
              <button
                key={preset.value}
                type="button"
                onClick={() => handlers.onAddAmount(preset.value)}
                className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors cursor-pointer"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Due Date */}
        <div>
          <Input
            label="목표 달성 예정일"
            type="date"
            value={dueDate}
            onChange={(e) => handlers.onDueDateChange(e.target.value)}
            required
          />
        </div>

        {error && (
          <p className="text-xs text-rose-500 font-medium">{error}</p>
        )}

        <div className="flex gap-2 pt-2">
          <Button
            type="button"
            variant="secondary"
            className="flex-1"
            onClick={handlers.onClose}
          >
            취소
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="flex-1"
            icon={<Target className="w-4 h-4" />}
          >
            목표 시작하기
          </Button>
        </div>
      </form>
    </Modal>
  );
};
