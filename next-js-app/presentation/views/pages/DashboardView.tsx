'use client';

import React from 'react';
import { Target, Users, KeyRound, Plus, Copy, Check, Sparkles, Flag } from 'lucide-react';
import { KnotIcon } from '../../components/common/KnotIcon';
import { AppLayout } from '../../layouts/AppLayout';
import { OneTeamGauge } from '../../components/dashboard/OneTeamGauge';
import { BalanceUpdateModal } from '../../components/dashboard/BalanceUpdateModal';
import { GoalSummaryCard } from '../../components/dashboard/GoalSummaryCard';
import { DattSynergyBanner } from '../../components/dashboard/DattSynergyBanner';
import { RecentTimelineWidget } from '../../components/dashboard/RecentTimelineWidget';
import { UpcomingQuestsWidget } from '../../components/dashboard/UpcomingQuestsWidget';
import { CreateGoalModal } from '../../components/dashboard/CreateGoalModal';
import { TeamOnboardingModal } from '../../components/auth/TeamOnboardingModal';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { DashboardViewModelResult } from '../../view-models/pages/useDashboardViewModel';

export interface DashboardViewProps {
  state: DashboardViewModelResult['state'];
  handlers: DashboardViewModelResult['handlers'];
}

export const DashboardView: React.FC<DashboardViewProps> = ({ state, handlers }) => {
  const {
    team,
    goal,
    timelineEvents,
    quests,
    latestLog,
    isUpdateBalanceOpen,
    isCreateGoalOpen,
    isOnboardingOpen,
    onboardingMode,
    copiedCode,
  } = state;

  return (
    <AppLayout>
      <div className="space-y-4 pb-4">
        {/* CASE 1: No Team Registered Yet */}
        {!team && (
          <div className="space-y-4">
            {/* Welcome Hero Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-rose-50/90 via-white to-pink-50/50 border border-rose-100 shadow-xs text-center relative overflow-hidden">
              <div className="w-14 h-14 rounded-2xl bg-rose-500 text-white flex items-center justify-center mx-auto mb-3 shadow-md shadow-rose-200">
                <KnotIcon className="w-7 h-7 text-white" strokeWidth={2.4} />
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                우리 팀의 첫 걸음, KNOT ✨
              </h2>
              <p className="text-xs text-slate-500 mt-1.5 max-w-xs mx-auto leading-relaxed">
                커플, 동업자, 룸메이트, 프로젝트 팀원까지—개별 기여도 비교 없이 하나의 원팀으로 달성하는 공동 목표 플랫폼입니다.
              </p>

              {/* Onboarding Call to Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-5">
                <button
                  onClick={() => handlers.onOpenOnboarding('CREATE')}
                  className="p-3.5 rounded-2xl bg-white hover:bg-rose-50/50 border border-rose-200/80 shadow-2xs flex items-center gap-3 text-left transition-all cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">
                      새 팀 만들기
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      방을 열고 6자리 초대 코드 발급
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => handlers.onOpenOnboarding('JOIN')}
                  className="p-3.5 rounded-2xl bg-white hover:bg-purple-50/50 border border-slate-200 hover:border-purple-200 shadow-2xs flex items-center gap-3 text-left transition-all cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">
                      초대 코드로 합류
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      팀원의 6자리 코드로 참여
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Feature Previews */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-slate-400 px-1 uppercase tracking-wider block">
                KNOT 핵심 기능 둘러보기
              </span>

              <Card padding="sm" className="border-slate-100 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">
                      원팀(One-Team) 스코어보드
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      개별 기여도 비교 없이 팀원 모두의 자산을 합산하여 하나의 원형 게이지로 확인해요.
                    </p>
                  </div>
                </div>
              </Card>

              <Card padding="sm" className="border-slate-100 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center shrink-0">
                    <Flag className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">
                      기록 타임라인 & 로드맵
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      프로젝트 마일스톤, 여행 일정, 일상과 공동 지출의 발자취를 세로형 로드맵으로 남겨요.
                    </p>
                  </div>
                </div>
              </Card>

              <Card padding="sm" className="border-slate-100 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">
                      분담 퀘스트 & 핫플 추천
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      할 일을 공평하게 나누고 팀원들과 함께 갈 영감 가득한 공간 추천을 받아보세요.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* CASE 2: Team Exists, but Goal Not Created Yet */}
        {team && !goal && (
          <div className="space-y-4">
            {/* Teammate Invitation Banner */}
            <div className="p-3.5 bg-rose-50/80 rounded-2xl border border-rose-200/80 flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-2">
                <span className="text-base">💌</span>
                <div>
                  <span className="text-xs font-bold text-rose-900 block">
                    {team.members.length > 1 ? '새로운 팀원을 추가 초대해보세요!' : '팀원들을 초대해보세요!'}
                  </span>
                  <span className="text-[11px] text-rose-600 font-medium">
                    초대 코드: <strong className="font-mono text-xs">{team.inviteCode}</strong> ({team.members.length}명 참여 중)
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                icon={copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                onClick={handlers.onCopyInviteCode}
                className="bg-white hover:bg-rose-50 text-xs py-1 px-2.5 h-8"
              >
                {copiedCode ? '복사됨' : '코드 복사'}
              </Button>
            </div>

            {/* Goal Creation Hero Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-amber-50/80 via-white to-rose-50/40 border border-amber-200/60 shadow-xs text-center">
              <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center mx-auto mb-3 shadow-md shadow-amber-200">
                <Target className="w-7 h-7" />
              </div>
              <h2 className="text-lg font-extrabold text-slate-900">
                첫 번째 공동 목표를 설정해주세요 🎯
              </h2>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
                창업 펀드, 우정 여행, 보증금 마련, 결혼 준비 등 팀원들과 함께 바라볼 목표 금액과 기한을 정하면 원팀 게이지가 열립니다.
              </p>

              <div className="mt-5">
                <Button
                  variant="primary"
                  size="lg"
                  icon={<Plus className="w-4 h-4" />}
                  onClick={handlers.onOpenCreateGoal}
                  className="px-6"
                >
                  첫 공동 목표 만들기
                </Button>
              </div>
            </div>

            {/* Widgets in early preview */}
            <UpcomingQuestsWidget quests={quests} onToggleTask={handlers.onToggleTask} />
            <RecentTimelineWidget events={timelineEvents} />
          </div>
        )}

        {/* CASE 3: Team and Goal Both Exist */}
        {team && goal && (
          <div className="space-y-4">
            {/* Teammate Invitation Banner */}
            {team.members.length === 1 && (
              <div className="p-3 bg-rose-50/80 rounded-2xl border border-rose-200/80 flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-2">
                  <span className="text-base">💌</span>
                  <div>
                    <span className="text-xs font-bold text-rose-900 block">
                      팀원들을 초대하여 함께 목표를 채워보세요!
                    </span>
                    <span className="text-[11px] text-rose-600 font-medium">
                      초대 코드: <strong className="font-mono text-xs">{team.inviteCode}</strong>
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  icon={copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  onClick={handlers.onCopyInviteCode}
                  className="bg-white hover:bg-rose-50 text-xs py-1 px-2.5 h-8"
                >
                  {copiedCode ? '복사됨' : '코드 복사'}
                </Button>
              </div>
            )}

            {/* Real-time Activity Ticker */}
            {latestLog ? (
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white border border-slate-100 shadow-2xs text-xs">
                <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0 animate-pulse" />
                <span className="font-bold text-slate-800 shrink-0">
                  {latestLog.actorName}:
                </span>
                <span className="text-slate-500 truncate">
                  {latestLog.message}
                </span>
                <span className="text-[10px] text-slate-400 shrink-0 ml-auto">
                  {latestLog.createdAt}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white border border-rose-100 shadow-2xs text-xs">
                <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0" />
                <span className="font-semibold text-rose-700">
                  {team.name}의 원팀 목표가 시작되었습니다! ✨
                </span>
              </div>
            )}

            {/* 1. Main Showcase: One-Team Gauge (PRD 5.2) */}
            <OneTeamGauge
              currentValue={goal.currentValue}
              targetValue={goal.targetValue}
              unit={goal.unit}
              onOpenUpdateModal={handlers.onOpenUpdateBalance}
            />

            {/* 2. Goal Metadata Card */}
            <GoalSummaryCard
              goal={goal}
              onUpdateGoalTarget={handlers.onUpdateGoalTarget}
            />

            {/* 3. DATT Flywheel Synergy Banner (PRD 4.1) */}
            <DattSynergyBanner />

            {/* 4. Upcoming Checklist Widget */}
            <UpcomingQuestsWidget quests={quests} onToggleTask={handlers.onToggleTask} />

            {/* 5. Recent Timeline Feed Widget */}
            <RecentTimelineWidget events={timelineEvents} />

            {/* Direct Balance Overwrite Modal (PRD 2.1 & 5.2) */}
            <BalanceUpdateModal
              isOpen={isUpdateBalanceOpen}
              onClose={handlers.onCloseUpdateBalance}
              currentBalance={goal.currentValue}
              onUpdateBalance={handlers.onUpdateBalance}
            />
          </div>
        )}

        {/* Global Modals */}
        <CreateGoalModal
          isOpen={isCreateGoalOpen}
          onClose={handlers.onCloseCreateGoal}
          onCreateGoal={handlers.onCreateGoal}
        />

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
