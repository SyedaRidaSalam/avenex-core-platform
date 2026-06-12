import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { title, department, location } = await request.json();
    
    // Validation rule
    if (!title || !department || !location) {
      return NextResponse.json({ error: 'Missing required payload parameters' }, { status: 400 });
    }

    // Strict type injection matching your precise Prisma schema definitions
    const newJob = await prisma.job.create({
      data: {
        title,
        department,
        location,
        type: "Full-Time", // Schema specifications matched
        description: "System pipeline integration engineering node profile.", // Default strict parameter passed
      },
    });

    return NextResponse.json({ success: true, data: newJob }, { status: 201 });
  } catch (error) {
    console.error("Prisma Core Error:", error);
    return NextResponse.json({ error: 'Database synchronization fault.' }, { status: 500 });
  }
}