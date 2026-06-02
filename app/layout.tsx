import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "마켓뱅 채용 | Marketbang Careers",
  description: "와인 B2B 유통 플랫폼 마켓뱅에서 함께 성장할 팀원을 찾습니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
