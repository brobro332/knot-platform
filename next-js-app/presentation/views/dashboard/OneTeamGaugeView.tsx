'use client';

import React from 'react';
import { Sparkles, Coins } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { OneTeamGaugeViewModel } from '../../view-models/dashboard/useOneTeamGauge';

export const OneTeamGaugeView: React.FC<OneTeamGaugeViewModel> = ({
  percentage,
  isGoalReached,
  isStarted,
  formattedCurrent,
  formattedTarget,
  formattedRemaining,
  svg,
  onOpenUpdateModal,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-rose-50/80 via-white to-pink-50/50 rounded-3xl border border-rose-100/80 shadow-xs relative overflow-hidden">
      {/* Decorative background soft glow */}
      <div className="absolute -top-10 w-48 h-48 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />

      {/* Subtitle / Philosophy badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-rose-600 text-xs font-semibold shadow-xs border border-rose-100 mb-3">
        <Sparkles className="w-3.5 h-3.5 text-rose-500" />
        <span>원팀(One-Team) 스코어보드</span>
      </div>

      {/* Dynamic Motivational Header */}
      <div className="text-center mb-5">
        {isGoalReached ? (
          <h2 className="text-xl font-extrabold text-rose-600 flex items-center justify-center gap-1.5 animate-bounce">
            🎉 축하합니다! 목표를 달성했어요!
          </h2>
        ) : !isStarted ? (
          <h2 className="text-lg sm:text-xl font-bold text-slate-800">
            목표 금액{' '}
            <span className="text-rose-500 underline decoration-rose-300 decoration-2 underline-offset-4">
              {formattedTarget}
            </span>
            을 향해 시작해요!
          </h2>
        ) : (
          <h2 className="text-lg sm:text-xl font-bold text-slate-800">
            목표 달성까지{' '}
            <span className="text-rose-500 underline decoration-rose-300 decoration-2 underline-offset-4">
              {formattedRemaining}
            </span>{' '}
            남았어요!
          </h2>
        )}
        <p className="text-xs text-slate-500 mt-1">
          비교 없는 원팀, 우리가 함께 모은 소중한 자산입니다
        </p>
      </div>

      {/* Circular Progress Gauge */}
      <div className="relative flex items-center justify-center my-2">
        <svg width={svg.size} height={svg.size} className="transform -rotate-90">
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#fb7185" />
            </linearGradient>
          </defs>

          {/* Background Track */}
          <circle
            cx={svg.size / 2}
            cy={svg.size / 2}
            r={svg.radius}
            stroke="#f1f5f9"
            strokeWidth={svg.strokeWidth}
            fill="transparent"
          />

          {/* Animated Progress Bar */}
          <circle
            cx={svg.size / 2}
            cy={svg.size / 2}
            r={svg.radius}
            stroke="url(#gaugeGradient)"
            strokeWidth={svg.strokeWidth}
            strokeDasharray={svg.circumference}
            strokeDashoffset={svg.strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Inner Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <span className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
            {percentage}%
          </span>
          <span className="text-xs font-semibold text-slate-400 mt-0.5">
            달성률
          </span>

          <div className="mt-3 pt-2 border-t border-slate-100 w-36">
            <div className="text-xs font-medium text-slate-400">
              현재 모인 총액
            </div>
            <div className="text-sm font-bold text-slate-800">
              {formattedCurrent}
            </div>
          </div>
        </div>
      </div>

      {/* Target Info Pill */}
      <div className="flex items-center justify-between w-full max-w-xs mt-3 px-4 py-2.5 bg-white/90 rounded-2xl border border-slate-100 text-xs shadow-2xs">
        <span className="text-slate-500 font-medium">최종 목표 금액</span>
        <span className="font-bold text-slate-800">
          {formattedTarget}
        </span>
      </div>

      {/* Direct Balance Update Action Button */}
      <div className="w-full max-w-xs mt-4">
        <Button
          fullWidth
          variant="primary"
          size="lg"
          icon={<Coins className="w-4 h-4" />}
          onClick={onOpenUpdateModal}
        >
          {!isStarted ? '모임통장 잔고 입력하기' : '모임통장 잔고 업데이트'}
        </Button>
      </div>
    </div>
  );
};
