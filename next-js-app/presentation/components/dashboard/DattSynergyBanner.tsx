'use client';

import React from 'react';
import { Sparkles, ExternalLink, MapPin } from 'lucide-react';
import { Card } from '../common/Card';

export const DattSynergyBanner: React.FC = () => {
  return (
    <Card
      padding="md"
      className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500 text-white border-0 shadow-md relative overflow-hidden"
    >
      <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="flex items-start justify-between relative z-10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold backdrop-blur-xs">
            <Sparkles className="w-3 h-3" />
            <span>DATT 플레이스 & 코스 연동</span>
          </div>
          <h4 className="font-bold text-sm text-white pt-1">
            이번 주말 우리 팀을 위한 핫플레이스는 어디로?
          </h4>
          <p className="text-xs text-purple-100 leading-snug">
            타임라인에 기록한 장소가 DATT 추천 플레이스로 확장됩니다. 팀 모임, 감성 카페, 워크 스페이스 추천을 확인해보세요.
          </p>
        </div>
      </div>

      <div className="mt-3.5 flex items-center justify-between pt-2.5 border-t border-white/20">
        <div className="flex items-center gap-1 text-[11px] text-purple-100 font-medium">
          <MapPin className="w-3.5 h-3.5" />
          <span>성수·한남·홍대 인기 모임 & 핫플 큐레이션</span>
        </div>
        <a
          href="https://datt.app"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-bold text-white bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-xl transition-colors backdrop-blur-xs cursor-pointer"
        >
          <span>DATT 플레이스 보기</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </Card>
  );
};
