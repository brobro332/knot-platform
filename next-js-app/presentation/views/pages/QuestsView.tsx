'use client';

import React from 'react';
import { Plus, CheckSquare } from 'lucide-react';
import { AppLayout } from '../../layouts/AppLayout';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { QuestCard } from '../../components/quests/QuestCard';
import { QuestFilter } from '../../components/quests/QuestFilter';
import { AddQuestModal } from '../../components/quests/AddQuestModal';
import { AddTaskModal } from '../../components/quests/AddTaskModal';
import { TeamOnboardingModal } from '../../components/auth/TeamOnboardingModal';
import { QuestsViewModelResult } from '../../view-models/pages/useQuestsViewModel';

export interface QuestsViewProps {
  state: QuestsViewModelResult['state'];
  handlers: QuestsViewModelResult['handlers'];
}

export const QuestsView: React.FC<QuestsViewProps> = ({ state, handlers }) => {
  const {
    team,
    filteredQuests,
    counts,
    pendingTasksCount,
    myTasksCount,
    completedTasksCount,
    filter,
    isAddQuestOpen,
    activeQuestIdForTask,
    isOnboardingOpen,
    onboardingMode,
  } = state;

  return (
    <AppLayout>
      <div className="space-y-4 pb-4">
        {!team ? (
          <Card padding="md" className="space-y-3 border-slate-100 shadow-xs text-center py-10 mt-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl mx-auto border border-emerald-100">
              <CheckSquare className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">
                팀을 먼저 등록해주세요
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
                퀘스트와 분담 체크리스트는 팀을 생성하거나 팀원의 초대를 수락한 후에 이용할 수 있어요.
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
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-extrabold text-slate-900">
                  세부 할 일 & 퀘스트
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  마일스톤을 이루기 위한 세부 체크리스트를 둘이 함께 분담합니다
                </p>
              </div>
              <Button
                variant="primary"
                size="sm"
                icon={<Plus className="w-4 h-4" />}
                onClick={handlers.onOpenAddQuest}
              >
                새 퀘스트
              </Button>
            </div>

            {/* Completion Progress Mini Summary */}
            <div className="grid grid-cols-3 gap-2">
              <Card padding="sm" className="text-center bg-white border-slate-100 shadow-2xs">
                <span className="text-[10px] text-slate-400 font-semibold block">
                  남은 할 일
                </span>
                <span className="text-base font-extrabold text-rose-500">
                  {pendingTasksCount}개
                </span>
              </Card>
              <Card padding="sm" className="text-center bg-white border-slate-100 shadow-2xs">
                <span className="text-[10px] text-slate-400 font-semibold block">
                  내 담당 과제
                </span>
                <span className="text-base font-extrabold text-blue-500">
                  {myTasksCount}개
                </span>
              </Card>
              <Card padding="sm" className="text-center bg-white border-slate-100 shadow-2xs">
                <span className="text-[10px] text-slate-400 font-semibold block">
                  완료된 항목
                </span>
                <span className="text-base font-extrabold text-emerald-500">
                  {completedTasksCount}개
                </span>
              </Card>
            </div>

            {/* Filters */}
            <div className="pt-1">
              <QuestFilter selected={filter} onChange={handlers.onSelectFilter} counts={counts} />
            </div>

            {/* Quest Cards List */}
            <div className="space-y-3 pt-1">
              {filteredQuests.length === 0 ? (
                <div className="py-14 text-center px-4 bg-white rounded-3xl border border-slate-100 shadow-xs">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center mb-3 shadow-2xs border border-emerald-100">
                    <CheckSquare className="w-7 h-7 stroke-[1.8]" />
                  </div>
                  <h3 className="text-base font-bold text-slate-800">
                    아직 등록된 퀘스트가 없어요
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
                    프로젝트 런칭, 보증금 마련, 여행 등 함께 이룰 큰 목표의 할 일 목록을 만들어보세요.
                  </p>
                  <div className="mt-4">
                    <Button
                      variant="primary"
                      size="sm"
                      icon={<Plus className="w-4 h-4" />}
                      onClick={handlers.onOpenAddQuest}
                    >
                      첫 퀘스트 만들기
                    </Button>
                  </div>
                </div>
              ) : (
                filteredQuests.map((quest) => (
                  <QuestCard
                    key={quest.id}
                    quest={quest}
                    onToggleTask={handlers.onToggleTask}
                    onOpenAddTaskModal={(qId) => handlers.onOpenAddTask(qId)}
                  />
                ))
              )}
            </div>

            {/* Add Quest Modal */}
            <AddQuestModal
              isOpen={isAddQuestOpen}
              onClose={handlers.onCloseAddQuest}
              onAddQuest={handlers.onAddQuest}
            />

            {/* Add Task Modal */}
            <AddTaskModal
              isOpen={activeQuestIdForTask !== null}
              onClose={handlers.onCloseAddTask}
              questId={activeQuestIdForTask}
              onAddTask={handlers.onAddTask}
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
