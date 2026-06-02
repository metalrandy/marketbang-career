import { NextRequest, NextResponse } from 'next/server';
import { Job, defaultJobs } from '@/lib/jobs';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'jobs.json');

function ensureDataDir() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function readJobs(): Job[] {
  try {
    if (!fs.existsSync(DATA_FILE)) return defaultJobs;
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  } catch {
    return defaultJobs;
  }
}

function writeJobs(jobs: Job[]) {
  ensureDataDir();
  fs.writeFileSync(DATA_FILE, JSON.stringify(jobs, null, 2));
}

export async function GET() {
  const jobs = readJobs();
  return NextResponse.json(jobs);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const jobs = readJobs();
  const newJob: Job = {
    ...body,
    id: `job-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  jobs.push(newJob);
  writeJobs(jobs);
  return NextResponse.json(newJob);
}
