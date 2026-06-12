import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    // Neon cloud database se teeno tables ka live total count parallel uthana
    const [leadsCount, postsCount, jobsCount] = await Promise.all([
      prisma.lead.count(),
      prisma.post.count(),
      prisma.job.count(),
    ]);

    return NextResponse.json({
      success: true,
      leadsCount,
      postsCount,
      jobsCount,
    }, { status: 200 });

  } catch (error) {
    console.error("Dashboard stats aggregation fault:", error);
    return NextResponse.json({ error: 'Failed to balance metrics summary.' }, { status: 500 });
  }
}