# 마켓뱅 채용 페이지

마켓뱅 채용 전용 랜딩 페이지입니다.

## 기능
- 서비스/기업문화 소개
- 채용 공고 목록 + 상세 보기
- 관리자 페이지에서 JD 작성/수정/삭제/공개비공개 전환

## 로컬 실행

```bash
npm install
npm run dev
```

## Vercel 배포

1. GitHub에 이 레포지토리를 push
2. [vercel.com](https://vercel.com) → New Project → GitHub 연결
3. 자동 빌드 & 배포 완료

> ⚠️ **중요**: Vercel은 서버리스 환경으로 파일 시스템 저장이 초기화됩니다.
> 운영 환경에서는 DB(Supabase, PlanetScale 등) 또는 Vercel KV로 데이터를 저장해야 합니다.
> 로컬 테스트 및 프리뷰 단계에서는 `data/jobs.json`에 저장됩니다.

## 관리자 접근
- URL: `/admin`
- 초기 비밀번호: `marketbang2024` (app/admin/page.tsx에서 변경 가능)
