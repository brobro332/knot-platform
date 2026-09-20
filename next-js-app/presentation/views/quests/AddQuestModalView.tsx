'use client';

import React from 'react';
import { Plus, Calendar } from 'lucide-react';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { AddQuestModalViewModel } from '../../view-models/quests/useAddQuestModal';

export const AddQuestModalView: React.FC<AddQuestModalViewModel> = ({
  isOpen,
  title,
  description,
  questType,
  dueDate,
  categories,
  handlers,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={handlers.onClose}
      title="새로운 퀘스트 생성"
      description="함께 해결해 나갈 굵직한 마일스톤 과제를 정의하세요."
    >
      <form onSubmit={handlers.onSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            카테고리
          </label>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat.type}
                onClick={() => handlers.onQuestTypeChange(cat.type)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  questType === cat.type
                    ? 'bg-rose-500 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <Input
          label="퀘스트 제목"
          placeholder="예: MVP 배포 및 런칭, 유럽 숙소 예약, 보증금 마련"
          value={title}
          onChange={(e) => handlers.onTitleChange(e.target.value)}
          required
        />

        <Input
          label="목표 마감일"
          type="date"
          value={dueDate}
          onChange={(e) => handlers.onDueDateChange(e.target.value)}
          leftIcon={<Calendar className="w-4 h-4" />}
          required
        />

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            퀘스트 상세 설명 (선택)
          </label>
          <textarea
            value={description}
            onChange={(e) => handlers.onDescriptionChange(e.target.value)}
            placeholder="목표에 대한 간단한 가이드라인이나 메모를 남겨주세요."
            rows={2}
            className="w-full bg-slate-50 border border-slate-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-400 rounded-2xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 resize-none outline-none"
          />
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
            생성하기
          </Button>
        </div>
      </form>
    </Modal>
  );
};
