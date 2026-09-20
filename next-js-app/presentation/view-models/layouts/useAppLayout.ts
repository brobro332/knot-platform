'use client';

import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  CalendarDays,
  CheckSquare,
  Settings,
  LucideIcon,
} from 'lucide-react';
import { useKnot } from '../../state/KnotContext';
import { Member } from '../../types';

export interface FormattedLayoutMember {
  id: number;
  nickname: string;
  avatar: string;
  title: string;
  bgClass: string;
}

export interface NavItemConfig {
  label: string;
  href: string;
  icon: LucideIcon;
  isActive: boolean;
}

export function useAppLayout() {
  const pathname = usePathname();
  const { team, goal, dday, currentUser } = useKnot();

  const navItems: NavItemConfig[] = [
    {
      label: '대시보드',
      href: '/dashboard',
      icon: LayoutDashboard,
      isActive: pathname === '/dashboard',
    },
    {
      label: '타임라인',
      href: '/timeline',
      icon: CalendarDays,
      isActive: pathname === '/timeline',
    },
    {
      label: '퀘스트',
      href: '/quests',
      icon: CheckSquare,
      isActive: pathname === '/quests',
    },
    {
      label: '설정',
      href: '/settings',
      icon: Settings,
      isActive: pathname === '/settings',
    },
  ];

  const dDayLabel = goal ? dday?.label || null : null;

  const displayMembers: FormattedLayoutMember[] = team
    ? team.members.slice(0, 3).map((m: Member, idx: number) => {
        const roleLabel = idx === 0 ? '팀장' : '팀원';
        const avatar = m.avatarUrl || (idx === 0 ? '🧑🏻' : '👩🏻‍🎨');
        const bgClass =
          idx === 0
            ? 'bg-rose-100 text-rose-700'
            : idx === 1
            ? 'bg-purple-100 text-purple-700'
            : 'bg-emerald-100 text-emerald-700';

        return {
          id: m.id || idx,
          nickname: m.nickname,
          avatar,
          title: `${m.nickname} (${roleLabel})`,
          bgClass,
        };
      })
    : [];

  const extraMemberCount = team && team.members.length > 3 ? team.members.length - 3 : 0;

  return {
    team,
    currentUser,
    dDayLabel,
    displayMembers,
    extraMemberCount,
    navItems,
  };
}

export type AppLayoutViewModel = ReturnType<typeof useAppLayout>;
