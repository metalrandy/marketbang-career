'use client';

import { useEffect, useState } from 'react';
import { Job } from '@/lib/jobs';
import Link from 'next/link';

const ADMIN_PASSWORD = 'marketbang2024';

const emptyJob = (): Omit<Job, 'id' | 'createdAt' | 'updatedAt'> => ({
  title: '',
  department: '',
  type: '정규직',
  location: '서울',
  content: `### 포지션 소개\n\n### 주요 업무\n- \n\n### 자격 요건\n- \n\n### 우대 사항\n- \n\n### 처우 및 복지\n- `,
  isActive: true,
});

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState('');
  const [pwError, setPwError] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editing, setEditing] = useState<Job | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [form, setForm] = useState(emptyJob());
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (authed) loadJobs();
  }, [authed]);

  function loadJobs() {
    fetch('/api/jobs').then(r => r.json()).then(setJobs);
  }

  function handleLogin() {
    if (pw === ADMIN_PASSWORD) { setAuthed(true); setPwError(false); }
    else setPwError(true);
  }

  function startNew() {
    setIsNew(true);
    setEditing(null);
    setForm(emptyJob());
  }

  function startEdit(job: Job) {
    setIsNew(false);
    setEditing(job);
    setForm({ title: job.title, department: job.department, type: job.type, location: job.location, content: job.content, isActive: job.isActive });
  }

  async function handleSave() {
    setSaving(true);
    if (isNew) {
      await fetch('/api/jobs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    } else if (editing) {
      await fetch(`/api/jobs/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    }
    await loadJobs();
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setEditing(null);
    setIsNew(false);
  }

  async function handleDelete(id: string) {
    if (!confirm('이 공고를 삭제하시겠습니까?')) return;
    await fetch(`/api/jobs/${id}`, { method: 'DELETE' });
    loadJobs();
  }

  async function toggleActive(job: Job) {
    await fetch(`/api/jobs/${job.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ isActive: !job.isActive }) });
    loadJobs();
  }

  const inputStyle = {
    width: '100%', padding: '0.65rem 0.9rem',
    border: '1.5px solid rgba(123,30,30,0.2)', borderRadius: 8,
    fontSize: '0.9rem', outline: 'none', background: '#fff',
    color: 'var(--mb-charcoal)', fontFamily: 'inherit',
  };

  if (!authed) return (
    <div style={{ minHeight: '100vh', background: 'var(--mb-cream)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 16, padding: '3rem', width: '100%', maxWidth: 380, border: '1px solid rgba(123,30,30,0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--mb-burgundy)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
            <span style={{ color: '#fff', fontWeight: 700, fontSize: '1.2rem' }}>M</span>
          </div>
          <h1 style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--mb-charcoal)' }}>관리자 로그인</h1>
          <p style={{ color: 'var(--mb-gray)', fontSize: '0.85rem', marginTop: '0.25rem' }}>마켓뱅 채용 관리자 페이지</p>
        </div>
        <input
          type="password" placeholder="비밀번호" value={pw}
          onChange={e => setPw(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
          style={{ ...inputStyle, marginBottom: '0.75rem', borderColor: pwError ? '#e53e3e' : 'rgba(123,30,30,0.2)' }}
        />
        {pwError && <p style={{ color: '#e53e3e', fontSize: '0.8rem', marginBottom: '0.75rem' }}>비밀번호가 올바르지 않습니다.</p>}
        <button onClick={handleLogin} style={{ width: '100%', background: 'var(--mb-burgundy)', color: '#fff', border: 'none', borderRadius: 8, padding: '0.75rem', fontWeight: 600, cursor: 'pointer', fontSize: '0.95rem' }}>
          로그인
        </button>
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <Link href="/" style={{ color: 'var(--mb-gray)', fontSize: '0.8rem', textDecoration: 'none' }}>← 채용 페이지로 돌아가기</Link>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: 'var(--mb-cream)' }}>
      <header style={{ background: 'var(--mb-burgundy)', padding: '0 2rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ color: '#fff', fontWeight: 700 }}>마켓뱅 채용 관리자</span>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Link href="/" target="_blank" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', textDecoration: 'none' }}>채용 페이지 보기 →</Link>
            <button onClick={() => setAuthed(false)} style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', borderRadius: 6, padding: '0.35rem 0.85rem', cursor: 'pointer', fontSize: '0.8rem' }}>로그아웃</button>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--mb-charcoal)' }}>채용 공고 관리</h2>
          <button onClick={startNew} style={{ background: 'var(--mb-burgundy)', color: '#fff', border: 'none', borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}>+ 새 공고 작성</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: (isNew || editing) ? '1fr 1.4fr' : '1fr', gap: '1.5rem' }}>
          {/* Job list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {jobs.length === 0 && (
              <div style={{ textAlign: 'center', padding: '3rem', border: '2px dashed rgba(123,30,30,0.15)', borderRadius: 12, color: 'var(--mb-gray)' }}>
                공고가 없습니다. 새 공고를 작성해주세요.
              </div>
            )}
            {jobs.map(job => (
              <div key={job.id} style={{ background: '#fff', borderRadius: 12, padding: '1.25rem', border: editing?.id === job.id ? '2px solid var(--mb-burgundy)' : '1px solid rgba(123,30,30,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--mb-gold)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{job.department}</span>
                    <span style={{ fontSize: '0.65rem', padding: '0.15rem 0.5rem', borderRadius: 4, background: job.isActive ? 'rgba(72,187,120,0.1)' : 'rgba(160,160,160,0.1)', color: job.isActive ? '#38a169' : '#999' }}>
                      {job.isActive ? '공개' : '비공개'}
                    </span>
                  </div>
                  <p style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--mb-charcoal)', marginBottom: '0.25rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{job.title}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--mb-gray)' }}>{job.type} · {job.location}</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem', flexShrink: 0 }}>
                  <button onClick={() => toggleActive(job)} title={job.isActive ? '비공개로 전환' : '공개로 전환'} style={{ background: 'var(--mb-cream)', border: 'none', borderRadius: 6, padding: '0.4rem 0.6rem', cursor: 'pointer', fontSize: '0.8rem' }}>
                    {job.isActive ? '🙈' : '👁️'}
                  </button>
                  <button onClick={() => startEdit(job)} style={{ background: 'var(--mb-cream)', border: 'none', borderRadius: 6, padding: '0.4rem 0.75rem', cursor: 'pointer', fontSize: '0.8rem', color: 'var(--mb-charcoal)' }}>수정</button>
                  <button onClick={() => handleDelete(job.id)} style={{ background: '#fff0f0', border: 'none', borderRadius: 6, padding: '0.4rem 0.75rem', cursor: 'pointer', fontSize: '0.8rem', color: '#e53e3e' }}>삭제</button>
                </div>
              </div>
            ))}
          </div>

          {/* Editor */}
          {(isNew || editing) && (
            <div style={{ background: '#fff', borderRadius: 16, padding: '2rem', border: '1px solid rgba(123,30,30,0.1)', position: 'sticky', top: 20, maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontWeight: 700, color: 'var(--mb-charcoal)' }}>{isNew ? '새 공고 작성' : '공고 수정'}</h3>
                <button onClick={() => { setEditing(null); setIsNew(false); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--mb-gray)', fontSize: '1.2rem' }}>✕</button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--mb-gray)', display: 'block', marginBottom: '0.35rem' }}>포지션명 *</label>
                  <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="예: iOS 개발자" style={inputStyle} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--mb-gray)', display: 'block', marginBottom: '0.35rem' }}>부서/팀</label>
                    <input value={form.department} onChange={e => setForm(f => ({ ...f, department: e.target.value }))} placeholder="예: 개발팀" style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--mb-gray)', display: 'block', marginBottom: '0.35rem' }}>고용 형태</label>
                    <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} style={{ ...inputStyle, appearance: 'none' }}>
                      <option>정규직</option>
                      <option>계약직</option>
                      <option>인턴</option>
                      <option>프리랜서</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--mb-gray)', display: 'block', marginBottom: '0.35rem' }}>근무지</label>
                  <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="예: 서울 (원격 협의)" style={inputStyle} />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--mb-gray)', display: 'block', marginBottom: '0.35rem' }}>
                    JD 내용 *
                    <span style={{ fontWeight: 400, marginLeft: '0.5rem', color: '#aaa' }}>- ### 제목, - 리스트 형식으로 작성</span>
                  </label>
                  <textarea
                    value={form.content}
                    onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                    rows={20}
                    style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6, fontFamily: 'monospace', fontSize: '0.85rem' }}
                    placeholder="### 포지션 소개&#10;&#10;### 주요 업무&#10;- 업무 내용"
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input type="checkbox" checked={form.isActive} onChange={e => setForm(f => ({ ...f, isActive: e.target.checked }))} />
                    <span style={{ fontSize: '0.875rem', color: 'var(--mb-charcoal)' }}>공개 상태로 게시</span>
                  </label>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button onClick={handleSave} disabled={saving || !form.title} style={{ flex: 1, background: 'var(--mb-burgundy)', color: '#fff', border: 'none', borderRadius: 8, padding: '0.75rem', fontWeight: 600, cursor: 'pointer', fontSize: '0.95rem', opacity: saving || !form.title ? 0.6 : 1 }}>
                    {saving ? '저장 중...' : saved ? '✓ 저장됨' : '저장하기'}
                  </button>
                  <button onClick={() => { setEditing(null); setIsNew(false); }} style={{ background: 'var(--mb-cream)', color: 'var(--mb-charcoal)', border: 'none', borderRadius: 8, padding: '0.75rem 1.25rem', cursor: 'pointer', fontSize: '0.9rem' }}>취소</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
