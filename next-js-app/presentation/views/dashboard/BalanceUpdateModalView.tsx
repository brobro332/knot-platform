'use client';

import React from 'react';
import { Coins, CheckCircle2 } from 'lucide-react';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { KnotIcon } from '../../components/common/KnotIcon';
import { BalanceUpdateModalViewModel } from '../../view-models/dashboard/useBalanceUpdateModal';

export const BalanceUpdateModalView: React.FC<BalanceUpdateModalViewModel> = ({
  isOpen,
  error,
  formattedDisplayAmount,
  diff,
  presets,
  handlers,
}) => {
  if (!isOpen) return null;

  return (
    <Modal
      isOpen={true}
      onClose={handlers.onClose}
      title="모임통장 잔고 업데이트"
      description="카카오 모임통장 등의 현재 잔액을 입력해 주세요."
    >
      <form onSubmit={handlers.onSubmit} className="space-y-4">
        {/* Core Philosophy Notice Card */}
        <div className="p-3 bg-rose-50/80 rounded-2xl border border-rose-100 flex items-start gap-2.5">
          <KnotIcon className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" strokeWidth={2.2} />
          <p className="text-xs text-rose-800 leading-relaxed">
            <strong>원팀(One-Team) 철학:</strong> KNOT은 개별 기여도를 따지지 않습니다. 우리 팀이 함께 모은 <strong>현재 총 잔액</strong>으로 게이지를 즉시 동기화합니다.
          </p>
        </div>

        {/* Input */}
        <div>
          <Input
            label="현재 모임통장 총 잔고"
            value={formattedDisplayAmount}
            onChange={handlers.onAmountChange}
            placeholder="0"
            error={error}
            leftIcon={<Coins className="w-4 h-4" />}
            rightElement={<span className="text-sm font-semibold text-slate-400">원</span>}
          />
          {diff !== 0 && (
            <p className="mt-1.5 text-xs text-slate-500 flex items-center gap-1 font-medium">
              <span>기존 잔고 대비</span>
              <span className={`font-bold ${diff > 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                {diff > 0 ? `+${diff.toLocaleString()}` : diff.toLocaleString()}원
              </span>
              변동
            </p>
          )}
        </div>

        {/* Quick Add Presets */}
        <div>
          <div className="text-[11px] font-semibold text-slate-500 mb-2">빠른 입금 추가</div>
          <div className="grid grid-cols-4 gap-1.5">
            {presets.map((preset) => (
              <button
                type="button"
                key={preset.value}
                onClick={() => handlers.onAddPreset(preset.value)}
                className="px-2 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-rose-50 hover:border-rose-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
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
            icon={<CheckCircle2 className="w-4 h-4" />}
          >
            잔고 덮어쓰기
          </Button>
        </div>
      </form>
    </Modal>
  );
};
