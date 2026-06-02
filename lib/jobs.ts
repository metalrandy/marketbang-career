export interface Job {
  id: string;
  title: string;
  department: string;
  type: string; // '정규직' | '계약직' | '인턴'
  location: string;
  content: string; // markdown-like rich text
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const defaultJobs: Job[] = [
  {
    id: 'sample-1',
    title: '채용 포지션 제목을 입력하세요',
    department: '개발팀',
    type: '정규직',
    location: '서울 (원격 협의)',
    content: `### 포지션 소개
마켓뱅에서 함께 성장할 [직무명]을 찾습니다.

### 주요 업무
- 업무 내용 1
- 업무 내용 2
- 업무 내용 3

### 자격 요건
- 자격 요건 1
- 자격 요건 2
- 자격 요건 3

### 우대 사항
- 우대 사항 1
- 우대 사항 2

### 처우 및 복지
- 급여: 협의
- 스톡옵션 검토 가능
- 유연 근무제
- 노션/슬랙/피그마 등 툴 지원`,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];
