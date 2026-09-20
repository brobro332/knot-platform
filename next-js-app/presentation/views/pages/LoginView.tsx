'use client';

import React from 'react';
import { KnotIcon } from '../../components/common/KnotIcon';
import { SocialLoginButtons } from '../../components/auth/SocialLoginButtons';
import { TeamOnboardingModal } from '../../components/auth/TeamOnboardingModal';
import { LoginViewModelResult } from '../../view-models/pages/useLoginViewModel';

export interface LoginViewProps {
  state: LoginViewModelResult['state'];
  handlers: LoginViewModelResult['handlers'];
}

export const LoginView: React.FC<LoginViewProps> = ({ state, handlers }) => {
  const { isOnboardingOpen } = state;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xl flex flex-col items-center text-center">
        {/* Brand Icon */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-rose-200 mb-5">
          <KnotIcon className="w-9 h-9 text-white" strokeWidth={2.4} />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
          KNOT (낫)
        </h1>
        <p className="text-xs font-semibold text-rose-500 mt-1">
          공동 목표 빌드 플랫폼
        </p>

        {/* Value Proposition */}
        <p className="text-xs text-slate-500 mt-3 leading-relaxed">
          커플, 프로젝트 팀, 룸메이트, 친구 크루까지—모두가 함께 달성하는 원팀 스코어보드와 타임라인 로드맵
        </p>

        {/* Feature Highlights */}
        <div className="w-full my-6 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-left space-y-2.5">
          <div className="flex items-center gap-2 text-xs text-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
            <span>개별 기여도 비교 없는 <strong>원팀 게이지바</strong></span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
            <span>모임·일정과 지출을 함께 담는 <strong>세로형 타임라인</strong></span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span>DATT 유니버스와 연동되는 <strong>핫플·모임 공간 추천</strong></span>
          </div>
        </div>

        {/* Social Login Buttons */}
        <SocialLoginButtons onLogin={handlers.onSocialLogin} />

        {/* Team Onboarding Modal */}
        <TeamOnboardingModal
          isOpen={isOnboardingOpen}
          onClose={handlers.onCloseOnboarding}
          onCreateTeam={handlers.onCreateTeam}
          onJoinTeam={handlers.onJoinTeam}
          onSuccess={handlers.onOnboardingSuccess}
        />
      </div>
    </div>
  );
};
