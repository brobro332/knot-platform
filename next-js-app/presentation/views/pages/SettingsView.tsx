'use client';

import React from 'react';
import {
  Users,
  Copy,
  Check,
  ShieldCheck,
  Sparkles,
  LogOut,
  LogIn,
  UserPlus,
} from 'lucide-react';
import { KnotIcon } from '../../components/common/KnotIcon';
import { AppLayout } from '../../layouts/AppLayout';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { TeamOnboardingModal } from '../../components/auth/TeamOnboardingModal';
import { SettingsViewModelResult } from '../../view-models/pages/useSettingsViewModel';

export interface SettingsViewProps {
  state: SettingsViewModelResult['state'];
  handlers: SettingsViewModelResult['handlers'];
}

export const SettingsView: React.FC<SettingsViewProps> = ({ state, handlers }) => {
  const { team, currentUser, copied, isOnboardingOpen, onboardingMode } = state;

  return (
    <AppLayout>
      <div className="space-y-4 pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900">
            우리 팀 & 연동 설정
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            팀 프로필, 팀원 초대 코드 및 보안 설정을 관리합니다
          </p>
        </div>

        {/* User Account Info Card */}
        {currentUser ? (
          <Card padding="md" className="space-y-2 border-slate-100 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center text-base font-bold shadow-2xs">
                  {currentUser.avatarUrl || '🧑🏻'}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {currentUser.nickname} (나)
                  </h3>
                  <span className="text-xs text-slate-400">
                    {currentUser.email}
                  </span>
                </div>
              </div>
              <Badge variant="emerald" size="sm">
                로그인됨
              </Badge>
            </div>
          </Card>
        ) : (
          <Card padding="md" className="space-y-2 border-slate-100 shadow-xs text-center py-4">
            <p className="text-xs text-slate-500">
              현재 로그인되어 있지 않습니다.
            </p>
            <Button
              variant="primary"
              size="sm"
              icon={<LogIn className="w-3.5 h-3.5" />}
              onClick={handlers.onNavigateToLogin}
            >
              로그인하러 가기
            </Button>
          </Card>
        )}

        {/* If No Team: Show Empty Team Status Card */}
        {!team ? (
          <Card padding="md" className="space-y-3 border-slate-100 shadow-xs text-center py-6">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center text-xl mx-auto">
              👥
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">
                아직 등록된 팀이 없습니다
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                새로운 팀을 만들어 팀원을 초대하거나, 팀원의 6자리 초대 코드를 입력해 팀에 합류하세요.
              </p>
            </div>
            <div className="flex gap-2 pt-2 justify-center max-w-xs mx-auto">
              <Button
                variant="primary"
                size="sm"
                className="flex-1"
                onClick={() => handlers.onOpenOnboarding('CREATE')}
              >
                새 팀 만들기
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => handlers.onOpenOnboarding('JOIN')}
              >
                초대 코드로 합류
              </Button>
            </div>
          </Card>
        ) : (
          <>
            {/* Team Profile Card */}
            <Card padding="md" className="space-y-3 border-slate-100 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white shadow-2xs">
                    <KnotIcon className="w-6 h-6 text-white" strokeWidth={2.4} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {team.name}
                    </h3>
                    <span className="text-xs text-slate-400">
                      결성일: {team.createdAt}
                    </span>
                  </div>
                </div>
                <Badge variant="rose" size="md">
                  ACTIVE
                </Badge>
              </div>

              {/* Invite Code Box */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
                    팀원 초대 코드
                  </span>
                  <span className="text-lg font-mono font-extrabold text-slate-800 tracking-wider">
                    {team.inviteCode}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  icon={copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  onClick={handlers.onCopyInviteCode}
                >
                  {copied ? '복사됨' : '복사'}
                </Button>
              </div>
            </Card>

            {/* Team Members Card */}
            <Card padding="md" className="space-y-3 border-slate-100 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-rose-500" />
                  <h4 className="text-sm font-bold text-slate-900">
                    팀 멤버 ({team.members.length}명)
                  </h4>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">
                  원팀 멤버십
                </span>
              </div>

              <div className="space-y-2">
                {team.members.map((member, idx) => (
                  <div
                    key={member.id || idx}
                    className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 border border-slate-100"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        idx === 0
                          ? 'bg-rose-100 text-rose-700'
                          : idx === 1
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {member.avatarUrl || (idx === 0 ? '🧑🏻' : '👩🏻‍🎨')}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">
                          {member.nickname} {member.id === currentUser?.id ? '(나)' : ''}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {member.email}
                        </div>
                      </div>
                    </div>
                    <Badge variant={idx === 0 ? 'blue' : 'rose'} size="sm">
                      {idx === 0 ? '팀장' : '팀원'}
                    </Badge>
                  </div>
                ))}

                {/* Teammates Invitation Box */}
                <div className="p-3 rounded-2xl bg-rose-50/50 border border-dashed border-rose-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UserPlus className="w-4 h-4 text-rose-500" />
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">
                        새로운 팀원 초대하기
                      </span>
                      <span className="text-[11px] text-slate-500">
                        초대 코드 ({team.inviteCode})를 공유해 누구나 팀에 합류할 수 있어요.
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlers.onCopyInviteCode}
                  >
                    초대하기
                  </Button>
                </div>
              </div>
            </Card>
          </>
        )}

        {/* DATT Ecosystem & Privacy Card (PRD 7.1 & 7.2) */}
        <Card padding="md" className="space-y-3 border-slate-100 shadow-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <h4 className="text-sm font-bold text-slate-900">
              보안 및 프라이버시 정책 (RLS)
            </h4>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            KNOT은 <strong>행 수준 보안(Row Level Security, RLS)</strong>을 통해 다른 팀이 여러분의 데이터에 기술적으로 절대 접근할 수 없도록 격리되어 있습니다.
          </p>
          <div className="p-3 bg-slate-50 rounded-2xl text-xs space-y-1 text-slate-600 border border-slate-100">
            <div className="flex items-center gap-1.5 font-semibold text-slate-800">
              <Sparkles className="w-3.5 h-3.5 text-violet-500" />
              <span>DATT 데이터 파이프라인 동의 상태</span>
            </div>
            <p className="text-[11px] text-slate-500">
              유저가 명시적으로 체크한 장소 데이터 외에는 관리자도 일체의 타임라인 메모나 자산 내역을 열람하지 않습니다.
            </p>
          </div>
        </Card>

        {/* Logout Action */}
        {currentUser && (
          <div className="pt-2">
            <Button
              variant="outline"
              fullWidth
              icon={<LogOut className="w-4 h-4 text-rose-500" />}
              className="text-rose-600 hover:bg-rose-50 hover:border-rose-200"
              onClick={handlers.onLogout}
            >
              로그아웃
            </Button>
          </div>
        )}

        <TeamOnboardingModal
          isOpen={isOnboardingOpen}
          onClose={handlers.onCloseOnboarding}
          onCreateTeam={handlers.onCreateTeam}
          onJoinTeam={handlers.onJoinTeam}
          onSuccess={handlers.onOnboardingSuccess}
          initialMode={onboardingMode}
        />
      </div>
    </AppLayout>
  );
};
