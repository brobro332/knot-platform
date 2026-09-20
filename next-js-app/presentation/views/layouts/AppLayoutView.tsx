'use client';

import React from 'react';
import Link from 'next/link';
import { KnotIcon } from '../../components/common/KnotIcon';
import { AppLayoutViewModel } from '../../view-models/layouts/useAppLayout';

export interface AppLayoutViewProps extends AppLayoutViewModel {
  children: React.ReactNode;
}

export const AppLayoutView: React.FC<AppLayoutViewProps> = ({
  team,
  currentUser,
  dDayLabel,
  displayMembers,
  extraMemberCount,
  navItems,
  children,
}) => {
  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex justify-center">
      {/* Mobile-centric responsive container */}
      <div className="w-full max-w-md min-h-screen bg-[#F8F9FA] flex flex-col border-x border-slate-200/70 shadow-xl relative">
        {/* Top App Header */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-rose-400 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                <KnotIcon className="w-4.5 h-4.5 text-white" strokeWidth={2.4} />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-sm tracking-tight text-slate-900 flex items-center gap-1.5">
                  KNOT
                  {team ? (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 font-semibold border border-rose-100 max-w-[120px] truncate">
                      {team.name}
                    </span>
                  ) : (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-medium border border-slate-200">
                      팀 미등록
                    </span>
                  )}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  One-Team Co-Goal
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {dDayLabel && (
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200 shadow-2xs">
                {dDayLabel}
              </span>
            )}
            {/* Team members avatar stack */}
            {team ? (
              <div className="flex -space-x-1.5 items-center">
                {displayMembers.map((m) => (
                  <div
                    key={m.id}
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs border-2 border-white shadow-2xs font-bold ${m.bgClass}`}
                    title={m.title}
                  >
                    {m.avatar}
                  </div>
                ))}
                {extraMemberCount > 0 && (
                  <div
                    className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] border-2 border-white shadow-2xs font-bold"
                    title={`외 ${extraMemberCount}명`}
                  >
                    +{extraMemberCount}
                  </div>
                )}
                <Link
                  href="/settings"
                  className="w-7 h-7 rounded-full bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-500 border-2 border-dashed border-slate-300 hover:border-rose-300 flex items-center justify-center text-xs shadow-2xs font-bold transition-colors cursor-pointer"
                  title="팀원 초대 코드 확인하기"
                >
                  +
                </Link>
              </div>
            ) : currentUser ? (
              <Link
                href="/settings"
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs border-2 border-white shadow-2xs font-bold hover:bg-slate-200 transition-colors"
                title={`${currentUser.nickname} (설정)`}
              >
                {currentUser.avatarUrl || '🧑🏻'}
              </Link>
            ) : (
              <Link
                href="/login"
                className="px-2.5 py-1 text-xs font-semibold bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg transition-colors border border-rose-200/60"
              >
                로그인
              </Link>
            )}
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 pb-24 px-4 pt-4 overflow-y-auto">
          {children}
        </main>

        {/* Fixed Bottom Navigation Bar */}
        <nav className="fixed bottom-0 max-w-md w-full z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/80 px-3 py-2 shadow-lg">
          <div className="flex items-center justify-around">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 relative ${
                    item.isActive
                      ? 'text-rose-500 font-bold'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-transform duration-200 ${
                      item.isActive ? 'scale-110 stroke-[2.5]' : 'stroke-[1.8]'
                    }`}
                  />
                  <span className="text-[11px] mt-1 tracking-tight">
                    {item.label}
                  </span>
                  {item.isActive && (
                    <span className="absolute -bottom-1 w-1.5 h-1.5 bg-rose-500 rounded-full animate-in zoom-in" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
};
