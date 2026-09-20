import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'rose' | 'amber' | 'blue' | 'emerald' | 'purple' | 'zinc';
  styleType?: 'subtle' | 'solid' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'rose',
  styleType = 'subtle',
  size = 'sm',
  className = '',
  icon,
}) => {
  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 font-medium gap-1 rounded-full',
    md: 'text-xs px-2.5 py-1 font-semibold gap-1.5 rounded-full',
  }[size];

  const variantStyles = {
    rose: {
      subtle: 'bg-rose-50 text-rose-600 border border-rose-100/80',
      solid: 'bg-rose-500 text-white',
      outline: 'border border-rose-300 text-rose-600',
    },
    amber: {
      subtle: 'bg-amber-50 text-amber-700 border border-amber-100/80',
      solid: 'bg-amber-500 text-white',
      outline: 'border border-amber-300 text-amber-700',
    },
    blue: {
      subtle: 'bg-blue-50 text-blue-600 border border-blue-100/80',
      solid: 'bg-blue-500 text-white',
      outline: 'border border-blue-300 text-blue-600',
    },
    emerald: {
      subtle: 'bg-emerald-50 text-emerald-700 border border-emerald-100/80',
      solid: 'bg-emerald-500 text-white',
      outline: 'border border-emerald-300 text-emerald-700',
    },
    purple: {
      subtle: 'bg-purple-50 text-purple-600 border border-purple-100/80',
      solid: 'bg-purple-500 text-white',
      outline: 'border border-purple-300 text-purple-600',
    },
    zinc: {
      subtle: 'bg-slate-100 text-slate-700 border border-slate-200',
      solid: 'bg-slate-700 text-white',
      outline: 'border border-slate-300 text-slate-700',
    },
  }[variant][styleType];

  return (
    <span className={`inline-flex items-center justify-center leading-none ${sizeStyles} ${variantStyles} ${className}`}>
      {icon}
      {children}
    </span>
  );
};
