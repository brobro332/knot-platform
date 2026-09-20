import React from 'react';

export interface KnotIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
  strokeWidth?: number | string;
}

/**
 * KNOT Brand & Synergy Knot Icon
 * Represents unity, collaboration, and intertwined bonds of multiple team members.
 * Follows Lucide's 24x24 grid, round caps, and stroke conventions.
 */
export const KnotIcon: React.FC<KnotIconProps> = ({
  size = 24,
  className = '',
  strokeWidth = 2.2,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="m20 19-6.5-6.5A4.9 4.9 0 0 1 12 9a5 5 0 0 1 10 0A10 10 0 0 1 2 9a5 5 0 1 1 10 0c0 1.4-.6 2.6-1.5 3.5L4 19" />
    </svg>
  );
};
