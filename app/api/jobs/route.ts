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

export async function GET() {
  const jobs = await readJobs();
  return NextResponse.json(jobs);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const jobs = await readJobs();
  const newJob: Job = {
    ...body,
    id: `job-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  jobs.push(newJob);
  await writeJobs(jobs);
  return NextResponse.json(newJob);
}
