import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  bordered?: boolean;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  padding = 'md',
  hoverable = false,
  bordered = true,
  className = '',
  ...props
}) => {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-3.5',
    md: 'p-5',
    lg: 'p-6',
  }[padding];

  const borderStyles = bordered
    ? 'border border-slate-100'
    : '';

  const hoverStyles = hoverable
    ? 'transition-all duration-200 hover:shadow-md hover:border-rose-200'
    : '';

  return (
    <div
      className={`bg-white rounded-3xl shadow-xs ${paddingStyles} ${borderStyles} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
