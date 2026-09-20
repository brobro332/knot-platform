'use client';

import React from 'react';
import { Plus, CalendarDays } from 'lucide-react';
import { AppLayout } from '../../layouts/AppLayout';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { TimelineFilter } from '../../components/timeline/TimelineFilter';
import { TimelineList } from '../../components/timeline/TimelineList';
import { AddTimelineNodeModal } from '../../components/timeline/AddTimelineNodeModal';
import { TeamOnboardingModal } from '../../components/auth/TeamOnboardingModal';
import { TimelineViewModelResult } from '../../view-models/pages/useTimelineViewModel';

export interface TimelineViewProps {
  state: TimelineViewModelResult['state'];
  handlers: TimelineViewModelResult['handlers'];
}

export const TimelineView: React.FC<TimelineViewProps> = ({ state, handlers }) => {
  const {
    team,
    timelineEvents,
    filteredEvents,
    counts,
    totalRecordedExpense,
    filter,
    isAddModalOpen,
    isOnboardingOpen,
    onboardingMode,
  } = state;

  return (
    <AppLayout>
      <div className="space-y-4 pb-4">
        {!team ? (
          <Card padding="md" className="space-y-3 border-slate-100 shadow-xs text-center py-10 mt-6">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center text-xl mx-auto border border-rose-100">
              <CalendarDays className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">
                팀을 먼저 등록해주세요
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
                타임라인 로드맵은 팀을 생성하거나 팀원의 초대를 수락한 후에 이용할 수 있어요.
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
            {/* Header with Title & Add Node Action */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-extrabold text-slate-900">
                  우리의 기록 타임라인
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  마일스톤과 데이트, 지출의 발자취를 세로형 로드맵으로 관리합니다
                </p>
              </div>
              <Button
                variant="primary"
                size="sm"
                icon={<Plus className="w-4 h-4" />}
                onClick={handlers.onOpenAddModal}
              >
                노드 추가
              </Button>
            </div>

            {/* Expense & Memory Summary Mini Card */}
            <div className="grid grid-cols-2 gap-2.5">
              <Card padding="sm" className="bg-white border-rose-100 shadow-2xs">
                <span className="text-[11px] text-slate-400 font-semibold block">
                  함께 만든 추억
                </span>
                <span className="text-base font-extrabold text-rose-600">
                  {timelineEvents.length}개 노드
                </span>
              </Card>
              <Card padding="sm" className="bg-white border-amber-100 shadow-2xs">
                <span className="text-[11px] text-slate-400 font-semibold block">
                  타임라인 태깅 총 지출
                </span>
                <span className="text-base font-extrabold text-amber-600">
                  {totalRecordedExpense.toLocaleString()}원
                </span>
              </Card>
            </div>

            {/* Filter Chips */}
            <div className="pt-1">
              <TimelineFilter
                selected={filter}
                onChange={handlers.onSelectFilter}
                counts={counts}
              />
            </div>

            {/* Timeline Roadmap List */}
            <TimelineList
              events={filteredEvents}
              onToggleEvent={handlers.onToggleTimelineEvent}
              onDeleteEvent={handlers.onDeleteTimelineEvent}
              onAddClick={handlers.onOpenAddModal}
            />

            {/* Add Timeline Node Modal */}
            <AddTimelineNodeModal
              isOpen={isAddModalOpen}
              onClose={handlers.onCloseAddModal}
              onAddEvent={handlers.onAddTimelineEvent}
            />
          </>
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
