'use client';

import React from 'react';
import { User, Users, Sparkles, Plus } from 'lucide-react';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { AddTaskModalViewModel } from '../../view-models/quests/useAddTaskModal';
import { TaskAssignee } from '../../types';

const renderAssigneeIcon = (assignee: TaskAssignee) => {
  switch (assignee) {
    case 'ME':
      return <User className="w-4 h-4 text-blue-500" />;
    case 'PARTNER':
      return <Users className="w-4 h-4 text-rose-500" />;
    case 'BOTH':
      return <Sparkles className="w-4 h-4 text-purple-500" />;
  }
};

export const AddTaskModalView: React.FC<AddTaskModalViewModel> = ({
  isOpen,
  content,
  assignee,
  assigneeOptions,
  handlers,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={handlers.onClose}
      title="세부 할 일 추가"
      description="퀘스트 완료를 위한 구체적인 체크리스트를 등록하세요."
    >
      <form onSubmit={handlers.onSubmit} className="space-y-4">
        <Input
          label="할 일 내용"
          placeholder="예: 웨딩홀 견적서 엑셀 정리하기"
          value={content}
          onChange={(e) => handlers.onContentChange(e.target.value)}
          required
          autoFocus
        />

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            담당자 지정
          </label>
          <div className="grid grid-cols-3 gap-2">
            {assigneeOptions.map((opt) => {
              const isSelected = assignee === opt.value;
              return (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => handlers.onAssigneeChange(opt.value)}
                  className={`p-2.5 rounded-2xl border text-center flex flex-col items-center justify-center transition-all cursor-pointer ${
                    isSelected
                      ? 'border-rose-400 bg-rose-50/70 shadow-2xs'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  {renderAssigneeIcon(opt.value)}
                  <span className="text-xs font-bold text-slate-800 mt-1">
                    {opt.label}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5">
                    {opt.sublabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

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
            icon={<Plus className="w-4 h-4" />}
          >
            추가하기
          </Button>
        </div>
      </form>
    </Modal>
  );
};
