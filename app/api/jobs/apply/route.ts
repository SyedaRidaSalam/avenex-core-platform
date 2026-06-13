import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  const { jobId, name, email, resumeUrl } = await request.json();

  const application = await prisma.jobApplication.create({
    data: { 
      jobId, 
      name, 
      email, 
      resumeUrl // Ab yahan URL save hoga
    },
  });
  return NextResponse.json({ success: true });
}