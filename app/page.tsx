'use client';

import { useEffect, useState } from 'react';
import { Job } from '@/lib/jobs';
import Link from 'next/link';

function parseContent(content: string) {
  const lines = content.split('\n');
  const result: { type: string; text: string }[] = [];
  lines.forEach(line => {
    if (line.startsWith('### ')) result.push({ type: 'h3', text: line.slice(4) });
    else if (line.startsWith('- ')) result.push({ type: 'li', text: line.slice(2) });
    else if (line.trim()) result.push({ type: 'p', text: line });
    else result.push({ type: 'br', text: '' });
  });
  return result;
}

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selected, setSelected] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/jobs')
      .then(r => r.json())
      .then((data: Job[]) => {
        const active = data.filter(j => j.isActive);
        setJobs(active);
        if (active.length > 0) setSelected(active[0]);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--mb-cream)' }}>
      <header style={{ borderBottom: '1px solid rgba(123,30,30,0.12)', background: 'rgba(245,240,232,0.95)', backdropFilter: 'blur(8px)', position: 'sticky', top: 0, zIndex: 50, padding: '0 2rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--mb-burgundy)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.85rem' }}>M</span>
            </div>
            <span style={{ fontWeight: 700, color: 'var(--mb-charcoal)', fontSize: '1rem', letterSpacing: '-0.02em' }}>마켓뱅 채용</span>
          </div>
          <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <a href="#about" style={{ fontSize: '0.875rem', color: 'var(--mb-gray)', textDecoration: 'none' }}>서비스 소개</a>
            <a href="#culture" style={{ fontSize: '0.875rem', color: 'var(--mb-gray)', textDecoration: 'none' }}>기업문화</a>
            <a href="#jobs" style={{ fontSize: '0.875rem', color: 'var(--mb-gray)', textDecoration: 'none' }}>채용 공고</a>
            <Link href="/admin" style={{ fontSize: '0.8rem', color: 'var(--mb-burgundy)', textDecoration: 'none', border: '1px solid var(--mb-burgundy)', borderRadius: 6, padding: '0.3rem 0.75rem' }}>관리자</Link>
          </nav>
        </div>
      </header>

      <section style={{ background: 'var(--mb-burgundy)', padding: '5rem 2rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 70% 50%, rgba(196,151,58,0.15) 0%, transparent 60%)' }} />
        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
          <p className="animate-fade-up animate-delay-1" style={{ color: 'var(--mb-gold)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>Careers at Marketbang</p>
          <h1 className="animate-fade-up animate-delay-2" style={{ color: '#fff', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>
            와인 B2B 시장을<br />함께 바꿔갈 분을 찾습니다
          </h1>
          <p className="animate-fade-up animate-delay-3" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: 560 }}>
            마켓뱅은 수입사와 소매점 사이의 비효율을 없애는 B2B 와인 유통 플랫폼입니다.<br />초기 성장 단계에서 함께 만들어갈 팀원을 모십니다.
          </p>
          <div className="animate-fade-up animate-delay-4" style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#jobs" style={{ background: 'var(--mb-gold)', color: '#fff', padding: '0.75rem 2rem', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}>채용 공고 보기</a>
            <a href="#about" style={{ border: '1px solid rgba(255,255,255,0.4)', color: '#fff', padding: '0.75rem 2rem', borderRadius: 8, textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem' }}>마켓뱅 알아보기</a>
          </div>
        </div>
      </section>

      <section id="about" style={{ padding: '5rem 2rem', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ color: 'var(--mb-gold)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>About</p>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '1rem', color: 'var(--mb-charcoal)' }}>마켓뱅이란?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            {[
              { icon: '🍷', title: '와인 B2B 유통 중개', desc: '해외 와인 수입사와 레스토랑·와인바·주류 판매점을 직접 연결합니다. 중간 유통 과정을 줄여 더 합리적인 가격과 다양한 상품 접근이 가능합니다.' },
              { icon: '🤝', title: '파트너와 함께 성장', desc: '단순 플랫폼이 아니라 파트너사와 점주 모두가 신뢰할 수 있는 비즈니스 관계를 만들어갑니다. B2B 특유의 전문성과 신뢰감을 최우선으로 합니다.' },
              { icon: '📊', title: '데이터 기반 매칭', desc: '수입사의 상품과 소매점의 수요를 효율적으로 연결하는 매칭 시스템으로 거래 마찰을 최소화합니다. 공동구매 기획도 운영합니다.' },
            ].map(item => (
              <div key={item.title} style={{ background: 'var(--mb-cream)', borderRadius: 12, padding: '2rem', border: '1px solid rgba(123,30,30,0.08)' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{item.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.75rem', color: 'var(--mb-burgundy)' }}>{item.title}</h3>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--mb-gray)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="culture" style={{ padding: '5rem 2rem', background: 'var(--mb-cream)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ color: 'var(--mb-gold)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Culture</p>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '0.75rem', color: 'var(--mb-charcoal)' }}>우리가 일하는 방식</h2>
          <p style={{ color: 'var(--mb-gray)', fontSize: '1rem', maxWidth: 560, lineHeight: 1.7, marginBottom: '3rem' }}>5명의 작은 팀이지만, 빠른 실행력과 높은 주인의식으로 시장을 만들어가고 있습니다.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            {[
              { title: '빠른 실행', desc: '논의보다 실행이 먼저입니다. 작게 시작하고, 빠르게 배웁니다.', icon: '⚡' },
              { title: '주인의식', desc: '각자의 영역에서 오너십을 갖고 의사결정합니다.', icon: '🎯' },
              { title: '투명한 소통', desc: '노션·슬랙으로 모든 정보를 공유합니다. 숨기지 않습니다.', icon: '💬' },
              { title: '전문가 협업', desc: 'B2B 도메인을 깊이 이해하고 서로 배웁니다.', icon: '🤝' },
            ].map(item => (
              <div key={item.title} style={{ background: '#fff', borderRadius: 12, padding: '1.75rem', border: '1px solid rgba(123,30,30,0.08)', borderTop: '3px solid var(--mb-burgundy)' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{item.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--mb-charcoal)' }}>{item.title}</h3>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--mb-gray)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '3rem', background: 'var(--mb-burgundy)', borderRadius: 16, padding: '2.5rem', display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
            {[{ label: 'Team', value: '5명', sub: '현재 팀 규모' }, { label: 'Stage', value: '초기', sub: '성장 단계 진입 중' }, { label: 'Domain', value: 'B2B', sub: '와인 유통 플랫폼' }].map((stat, i) => (
              <div key={stat.label} style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                {i > 0 && <div style={{ width: 1, height: 60, background: 'rgba(255,255,255,0.15)' }} />}
                <div>
                  <p style={{ color: 'var(--mb-gold)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{stat.label}</p>
                  <p style={{ color: '#fff', fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.04em' }}>{stat.value}</p>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>{stat.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="jobs" style={{ padding: '5rem 2rem', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ color: 'var(--mb-gold)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Open Positions</p>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '3rem', color: 'var(--mb-charcoal)' }}>채용 공고</h2>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--mb-gray)' }}>불러오는 중...</div>
          ) : jobs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', border: '2px dashed rgba(123,30,30,0.2)', borderRadius: 16, color: 'var(--mb-gray)' }}>
              <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>현재 공개된 채용 공고가 없습니다.</p>
              <p style={{ fontSize: '0.875rem' }}>추후 공고가 올라오면 이 페이지에서 확인하실 수 있습니다.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem', alignItems: 'start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {jobs.map(job => (
                  <button key={job.id} onClick={() => setSelected(job)} style={{ textAlign: 'left', padding: '1.25rem', borderRadius: 10, cursor: 'pointer', border: selected?.id === job.id ? '2px solid var(--mb-burgundy)' : '2px solid rgba(123,30,30,0.12)', background: selected?.id === job.id ? 'rgba(123,30,30,0.04)' : '#fff', transition: 'all 0.15s ease' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--mb-gold)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>{job.department}</div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--mb-charcoal)', marginBottom: '0.5rem' }}>{job.title}</div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {[job.type, job.location].map(tag => (
                        <span key={tag} style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', background: 'var(--mb-cream)', borderRadius: 4, color: 'var(--mb-gray)' }}>{tag}</span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
              {selected && (
                <div style={{ background: 'var(--mb-cream)', borderRadius: 16, padding: '2.5rem', border: '1px solid rgba(123,30,30,0.1)', position: 'sticky', top: 80 }}>
                  <p style={{ color: 'var(--mb-gold)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{selected.department}</p>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--mb-charcoal)', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>{selected.title}</h3>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                    {[selected.type, selected.location].map(tag => (
                      <span key={tag} style={{ fontSize: '0.8rem', padding: '0.3rem 0.75rem', background: '#fff', borderRadius: 6, color: 'var(--mb-gray)', border: '1px solid rgba(123,30,30,0.12)' }}>{tag}</span>
                    ))}
                  </div>
                  <div style={{ height: 1, background: 'rgba(123,30,30,0.12)', marginBottom: '1.5rem' }} />
                  <div className="prose-custom">
                    {parseContent(selected.content).map((block, i) => {
                      if (block.type === 'h3') return <h3 key={i}>{block.text}</h3>;
                      if (block.type === 'li') return <ul key={i}><li>{block.text}</li></ul>;
                      if (block.type === 'p') return <p key={i}>{block.text}</p>;
                      return <div key={i} style={{ height: '0.5rem' }} />;
                    })}
                  </div>
                  <div style={{ marginTop: '2rem' }}>
                    <a href="mailto:recruit@marketbang.kr" style={{ display: 'inline-block', background: 'var(--mb-burgundy)', color: '#fff', padding: '0.85rem 2.5rem', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}>지원하기 →</a>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <footer style={{ background: 'var(--mb-charcoal)', padding: '3rem 2rem', textAlign: 'center' }}>
        <div style={{ color: 'var(--mb-gold)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Marketbang</div>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>와인 B2B 유통 플랫폼 · 쓰리랩스 주식회사</p>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', marginTop: '0.5rem' }}>채용 문의: recruit@marketbang.kr</p>
      </footer>
    </div>
  );
}
