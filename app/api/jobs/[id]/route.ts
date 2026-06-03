import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { Job, defaultJobs } from '@/lib/jobs';

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const JOBS_KEY = 'marketbang:jobs';

async function readJobs(): Promise<Job[]> {
  try {
    const data = await redis.get<Job[]>(JOBS_KEY);
    if (!data || data.length === 0) return defaultJobs;
    return data;
  } catch {
    return defaultJobs;
  }
}

async function writeJobs(jobs: Job[]) {
  await redis.set(JOBS_KEY, jobs);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const jobs = await readJobs();
  const idx = jobs.findIndex(j => j.id === id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  jobs[idx] = { ...jobs[idx], ...body, updatedAt: new Date().toISOString() };
  await writeJobs(jobs);
  return NextResponse.json(jobs[idx]);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const jobs = await readJobs();
  const filtered = jobs.filter(j => j.id !== id);
  await writeJobs(filtered);
  return NextResponse.json({ success: true });
}