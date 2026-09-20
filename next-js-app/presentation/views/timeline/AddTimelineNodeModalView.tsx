'use client';

import React from 'react';
import { Flag, Receipt, Sparkles, MapPin, Calendar, Plus } from 'lucide-react';
import { KnotIcon } from '../../components/common/KnotIcon';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { AddTimelineNodeModalViewModel } from '../../view-models/timeline/useAddTimelineNodeModal';
import { TimelineEventType } from '../../types';

const renderTypeIcon = (type: TimelineEventType) => {
  switch (type) {
    case 'MILESTONE':
      return <Flag className="w-4 h-4 text-purple-600" />;
    case 'DATE':
      return <KnotIcon className="w-4 h-4 text-rose-500" strokeWidth={2.2} />;
    case 'EXPENSE':
      return <Receipt className="w-4 h-4 text-amber-500" />;
  }
};

export const AddTimelineNodeModalView: React.FC<AddTimelineNodeModalViewModel> = ({
  isOpen,
  eventType,
  title,
  date,
  description,
  location,
  amount,
  dattShared,
  typeOptions,
  handlers,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={handlers.onClose}
      title="타임라인 노드 추가"
      description="우리 팀만의 특별한 순간과 일정을 기록해보세요."
      maxWidth="md"
    >
      <form onSubmit={handlers.onSubmit} className="space-y-4">
        {/* Type Selector */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            기록 유형 선택
          </label>
          <div className="grid grid-cols-3 gap-2">
            {typeOptions.map((opt) => {
              const isSelected = eventType === opt.type;
              return (
                <button
                  key={opt.type}
                  type="button"
                  onClick={() => handlers.onEventTypeChange(opt.type)}
                  className={`p-2.5 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    isSelected
                      ? opt.activeBorder
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    {renderTypeIcon(opt.type)}
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-rose-500" />
                    )}
                  </div>
                  <div className="mt-2">
                    <span className="text-xs font-bold block text-slate-900">
                      {opt.label}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      {opt.desc}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Title */}
        <Input
          label="제목"
          placeholder={
            eventType === 'MILESTONE'
              ? '예: 상견례, 웨딩홀 계약, 아파트 계약'
              : eventType === 'DATE'
              ? '예: 이번 주말 성수동 카페 데이트'
              : '예: 스냅 촬영 계약금 결제'
          }
          value={title}
          onChange={(e) => handlers.onTitleChange(e.target.value)}
          required
        />

        {/* Date */}
        <Input
          label="일정 날짜"
          type="date"
          value={date}
          onChange={(e) => handlers.onDateChange(e.target.value)}
          leftIcon={<Calendar className="w-4 h-4" />}
          required
        />

        {/* Amount */}
        {(eventType === 'EXPENSE' || eventType === 'DATE' || eventType === 'MILESTONE') && (
          <Input
            label={eventType === 'EXPENSE' ? '지출 금액 (원) *' : '지출 금액 (선택)'}
            type="number"
            placeholder="0"
            value={amount}
            onChange={(e) => handlers.onAmountChange(e.target.value)}
            leftIcon={<Receipt className="w-4 h-4" />}
            required={eventType === 'EXPENSE'}
          />
        )}

        {/* Location */}
        <Input
          label="장소 (선택)"
          placeholder="예: 더채플앳논현, 성수동 에디토리"
          value={location}
          onChange={(e) => handlers.onLocationChange(e.target.value)}
          leftIcon={<MapPin className="w-4 h-4" />}
        />

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            메모 / 설명 (선택)
          </label>
          <textarea
            value={description}
            onChange={(e) => handlers.onDescriptionChange(e.target.value)}
            placeholder="우리 팀의 세부 메모나 기억하고 싶은 점을 적어보세요."
            rows={2}
            className="w-full bg-slate-50 border border-slate-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-400 rounded-2xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 resize-none outline-none"
          />
        </div>

        {/* DATT Ecosystem Flywheel Agreement Checkbox */}
        {eventType === 'DATE' && (
          <div className="p-3.5 bg-violet-50/70 rounded-2xl border border-violet-100">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={dattShared}
                onChange={(e) => handlers.onDattSharedChange(e.target.checked)}
                className="mt-0.5 rounded border-violet-300 text-violet-600 focus:ring-violet-400 w-4 h-4 accent-violet-600 cursor-pointer"
              />
              <div>
                <div className="flex items-center gap-1 text-xs font-bold text-violet-900">
                  <Sparkles className="w-3.5 h-3.5 text-violet-600" />
                  <span>이 멋진 장소를 DATT에 추천(공유)하시겠어요?</span>
                </div>
                <p className="text-[11px] text-violet-700 mt-1 leading-snug">
                  동의하시면 사적인 메모를 제외한 장소 정보만 DATT 추천 데이터베이스로 안전하게 연동되어 다른 팀들에게 좋은 영감을 줍니다.
                </p>
              </div>
            </label>
          </div>
        )}

        {/* Submit Actions */}
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
            타임라인에 추가
          </Button>
        </div>
      </form>
    </Modal>
  );
};
