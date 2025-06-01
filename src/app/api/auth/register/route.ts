import { NextRequest, NextResponse } from "next/server";

if (process.env.NODE_ENV === "development") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Todos los campos son requeridos" },
        { status: 400 }
      );
    }

    const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/Usuarios/registro`;
    console.log("🔗 Registrando en backend:", fullUrl);
    console.log("📦 Payload:", { name, email, password });

    const apiRes = await fetch(fullUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre: name, email, password }),
    });

    const raw = await apiRes.text();
    console.log("🧪 Respuesta cruda:", raw);

    let data: any = {};
    try {
      data = JSON.parse(raw);
    } catch {
      console.warn("⚠️ Respuesta no es JSON válido:", raw);
      data = { raw };
    }

    if (!apiRes.ok) {
      return NextResponse.json(
        { message: data.message || "Error al registrar" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ Error en registro:", err);
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
