// app/api/usuarios/editar/route.ts
import { NextRequest, NextResponse } from "next/server";
import { fetchFromBackend } from "../../utils/fetchFromBackend";

export async function PUT(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    const body = await req.json();

    const data = await fetchFromBackend("/api/Usuarios/me", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
