// app/api/usuarios/perfil/route.ts
import { NextRequest, NextResponse } from "next/server";
import { fetchFromBackend } from "../../utils/fetchFromBackend";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    const data = await fetchFromBackend("/api/Usuarios/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
