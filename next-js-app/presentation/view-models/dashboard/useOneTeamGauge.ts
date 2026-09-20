'use client';

export interface OneTeamGaugeProps {
  currentValue: number;
  targetValue: number;
  unit?: string;
  percentage?: number;
  remaining?: number;
  onOpenUpdateModal: () => void;
}

export function useOneTeamGauge({
  currentValue,
  targetValue,
  unit = '원',
  percentage: propPercentage,
  remaining: propRemaining,
  onOpenUpdateModal,
}: OneTeamGaugeProps) {
  const percentage =
    propPercentage !== undefined
      ? propPercentage
      : targetValue > 0
      ? Math.min(100, Math.round((currentValue / targetValue) * 100))
      : 0;

  const remaining =
    propRemaining !== undefined
      ? propRemaining
      : Math.max(0, targetValue - currentValue);

  const isGoalReached = targetValue > 0 && currentValue >= targetValue;

  // SVG Circular Gauge parameters
  const size = 260;
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const formattedCurrent = `${currentValue.toLocaleString()} ${unit}`;
  const formattedTarget = `${targetValue.toLocaleString()} ${unit}`;
  const formattedRemaining = `${remaining.toLocaleString()} ${unit}`;

  return {
    percentage,
    remaining,
    isGoalReached,
    isStarted: currentValue > 0,
    formattedCurrent,
    formattedTarget,
    formattedRemaining,
    svg: {
      size,
      strokeWidth,
      radius,
      circumference,
      strokeDashoffset,
    },
    onOpenUpdateModal,
  };
}

export type OneTeamGaugeViewModel = ReturnType<typeof useOneTeamGauge>;
