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
        <link rel="stylesheet" as="style" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/web/static/pretendard-dynamic-subset.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
