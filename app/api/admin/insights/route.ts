import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { title, content, category, imageUrl, description } = await request.json();
    
    // Debugging ke liye check karo console mein
    console.log("Saving to DB:", { title, imageUrl, description }); 

    const newPost = await prisma.insights.create({
      data: {
        title,
        content,
        category,
        imageUrl: imageUrl || null, // Ensure explicit mapping
        description,
        slug: `${title.toLowerCase().replace(/ /g, '-')}-${Date.now()}`,
      },
    });

    return NextResponse.json({ success: true, data: newPost }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create' }, { status: 500 });
  }
}