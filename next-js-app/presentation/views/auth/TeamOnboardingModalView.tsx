'use client';

import React from 'react';
import { Copy, Check, ArrowRight, UserPlus, KeyRound } from 'lucide-react';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { TeamOnboardingModalViewModel } from '../../view-models/auth/useTeamOnboardingModal';

export const TeamOnboardingModalView: React.FC<TeamOnboardingModalViewModel> = ({
  isOpen,
  mode,
  teamName,
  inviteCode,
  generatedCode,
  copied,
  error,
  title,
  description,
  handlers,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={handlers.onClose}
      title={title}
      description={description}
    >
      {/* Step 1: Mode Select */}
      {mode === 'SELECT' && (
        <div className="space-y-3">
          <button
            onClick={handlers.onSelectCreateMode}
            className="w-full p-4 rounded-2xl border border-slate-200 hover:border-rose-300 bg-slate-50 hover:bg-rose-50/40 text-left flex items-center justify-between group transition-all cursor-pointer shadow-2xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  새 팀 만들기
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  새로운 공동 목표 공간을 열고 6자리 초대 코드를 발급받습니다.
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-rose-500 transition-colors" />
          </button>

          <button
            onClick={handlers.onSelectJoinMode}
            className="w-full p-4 rounded-2xl border border-slate-200 hover:border-rose-300 bg-slate-50 hover:bg-rose-50/40 text-left flex items-center justify-between group transition-all cursor-pointer shadow-2xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  초대 코드 입력하기
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  팀원에게 받은 6자리 코드를 입력하여 팀에 합류합니다.
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-rose-500 transition-colors" />
          </button>
        </div>
      )}

      {/* Step 2A: Create Team */}
      {mode === 'CREATE' && (
        <form onSubmit={handlers.onCreate} className="space-y-4">
          <Input
            label="팀 이름"
            placeholder="예: 스타트업 창업 원팀, 유럽 여행 크루, 신혼일기"
            value={teamName}
            onChange={(e) => handlers.onTeamNameChange(e.target.value)}
            required
            autoFocus
          />
          <div className="flex gap-2">
            <Button
              type="button"
              variant="secondary"
              className="flex-1"
              onClick={handlers.onBackToSelect}
            >
              이전
            </Button>
            <Button type="submit" variant="primary" className="flex-1">
              초대 코드 생성
            </Button>
          </div>
        </form>
      )}

      {/* Step 2B: Join Team with 6-digit code */}
      {mode === 'JOIN' && (
        <form onSubmit={handlers.onJoin} className="space-y-4">
          <Input
            label="6자리 초대 코드"
            placeholder="예: KNOT01"
            maxLength={6}
            value={inviteCode}
            onChange={(e) => handlers.onInviteCodeChange(e.target.value)}
            error={error}
            required
            autoFocus
            className="text-center font-mono tracking-widest text-lg font-bold"
          />
          <div className="flex gap-2">
            <Button
              type="button"
              variant="secondary"
              className="flex-1"
              onClick={handlers.onBackToSelect}
            >
              이전
            </Button>
            <Button type="submit" variant="primary" className="flex-1">
              팀 합류하기
            </Button>
          </div>
        </form>
      )}

      {/* Step 3: Generated Code Display */}
      {mode === 'CODE_GENERATED' && (
        <div className="space-y-4 text-center">
          <div className="p-5 bg-rose-50/70 rounded-2xl border border-rose-100">
            <span className="text-xs text-slate-400 font-semibold block mb-1">
              발급된 6자리 초대 코드
            </span>
            <div className="text-3xl font-extrabold tracking-widest font-mono text-rose-600 my-2">
              {generatedCode}
            </div>
            <p className="text-xs text-slate-500">
              팀원이 앱에서 위 코드를 입력하면 하나의 팀으로 함께 목표를 달성할 수 있습니다.
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              icon={copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              onClick={handlers.onCopy}
            >
              {copied ? '복사됨!' : '코드 복사하기'}
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
              onClick={handlers.onGoToDashboard}
            >
              대시보드로 가기
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};
