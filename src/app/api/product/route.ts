import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(req: NextRequest) {
  const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/Producto`;
  const token = (await cookies()).get("token")?.value;

  try {
    const res = await fetch(fullUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    const raw = await res.text();

    if (!res.ok) {
      return NextResponse.json({ message: "Backend error", status: res.status, raw }, { status: res.status });
    }

    const data = JSON.parse(raw);
    return NextResponse.json(data);
  } catch (err: any) {
    console.error("❌ Error:", err.message);
    return NextResponse.json({ message: "Error interno" }, { status: 500 });
  }
}
