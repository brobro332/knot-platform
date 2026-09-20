import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { KnotProvider } from "../presentation/state/KnotContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KNOT (낫) - 공동 목표 빌드 플랫폼",
  description: "두 사람이 함께 만드는 원팀 스코어보드와 타임라인 로드맵",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 font-sans">
        <KnotProvider>{children}</KnotProvider>
      </body>

    </html>
  );
}

