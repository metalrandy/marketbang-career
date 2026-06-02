import { NextRequest, NextResponse } from 'next/server';
import { Job, defaultJobs } from '@/lib/jobs';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'jobs.json');

function readJobs(): Job[] {
  try {
    if (!fs.existsSync(DATA_FILE)) return defaultJobs;
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  } catch {
    return defaultJobs;
  }
}

function writeJobs(jobs: Job[]) {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(jobs, null, 2));
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const jobs = readJobs();
  const idx = jobs.findIndex(j => j.id === id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  jobs[idx] = { ...jobs[idx], ...body, updatedAt: new Date().toISOString() };
  writeJobs(jobs);
  return NextResponse.json(jobs[idx]);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const jobs = readJobs();
  const filtered = jobs.filter(j => j.id !== id);
  writeJobs(filtered);
  return NextResponse.json({ success: true });
}
