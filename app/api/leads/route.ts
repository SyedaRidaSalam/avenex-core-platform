import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db'; 

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, message } = body;

    // 1. Basic Validation Rule
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Required specification fields missing.' },
        { status: 400 }
      );
    }

    // 2. Neon Cloud DB mein Safely Data Create Karna
    const newLead = await prisma.lead.create({
      data: {
        name,
        email,
        company: company || null, // Optional field logic
        message,
      },
    });

    // 3. Success Transmission Return
    return NextResponse.json(
      { success: true, message: 'Data logged to systems engine.', data: newLead },
      { status: 201 }
    );

  } catch (error) {
    console.error('Database API Error:', error);
    return NextResponse.json(
      { error: 'Internal pipeline synchronization failure.' },
      { status: 500 }
    );
  }
}