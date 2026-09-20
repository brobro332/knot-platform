'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

interface SocialLoginButtonsProps {
  onLogin: (provider: 'kakao' | 'google') => void;
}

export const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({ onLogin }) => {
  return (
    <div className="space-y-3 w-full">
      {/* DATT Ecosystem SSO integration badge */}
      <div className="flex items-center justify-center gap-1.5 py-1 px-3 bg-rose-50 rounded-full border border-rose-100 mx-auto w-fit">
        <Sparkles className="w-3.5 h-3.5 text-rose-500" />
        <span className="text-[11px] font-bold text-rose-600">
          DATT 패밀리 계정 SSO 연동 지원
        </span>
      </div>

      {/* Kakao Login Button */}
      <button
        onClick={() => onLogin('kakao')}
        className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-2xl bg-[#FEE500] hover:bg-[#FDD800] text-[#191919] font-bold text-sm shadow-xs transition-transform active:scale-[0.98] cursor-pointer"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3C6.477 3 2 6.477 2 10.772c0 2.766 1.854 5.19 4.675 6.545l-1.188 4.354a.5.5 0 0 0 .736.543l5.228-3.468c.18.016.363.024.549.024 5.523 0 10-3.477 10-7.772S17.523 3 12 3z" />
        </svg>
        <span>카카오로 3초 만에 시작하기</span>
      </button>

      {/* Google Login Button */}
      <button
        onClick={() => onLogin('google')}
        className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm border border-slate-200 shadow-2xs transition-transform active:scale-[0.98] cursor-pointer"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        <span>Google 계정으로 계속하기</span>
      </button>
    </div>
  );
};
