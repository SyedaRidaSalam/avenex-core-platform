import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { passkey } = await request.json();
    
    // .env se safely password uthana jo sirf server ko pata hai
    const secureKey = process.env.ADMIN_PASSKEY;

    if (passkey === secureKey) {
      return NextResponse.json({ success: true, message: "Access granted." }, { status: 200 });
    }

    return NextResponse.json({ success: false, error: "Invalid credentials." }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: "Security subsystem fault." }, { status: 500 });
  }
}