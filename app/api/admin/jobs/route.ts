import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { title, department, location, type, description } = await request.json();

    if (!title || !department || !location || !type || !description) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const newJob = await prisma.job.create({
      data: { title, department, location, type, description, active: true },
    });

    return NextResponse.json({ success: true, data: newJob }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to publish job' }, { status: 500 });
  }
}