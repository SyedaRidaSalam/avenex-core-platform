import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const [leadsCount, postsCount, jobsCount] = await Promise.all([
      prisma.lead.count(),
      prisma.insights.count(),
      prisma.job.count(),
    ]);
    return NextResponse.json({ leadsCount, postsCount, jobsCount });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}