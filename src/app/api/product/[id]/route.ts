import { NextRequest, NextResponse } from "next/server";
import { fetchFromBackend } from "../../utils/fetchFromBackend";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const token = req.cookies.get("token")?.value;
  const productoId = params.id;

  try {
    const producto = await fetchFromBackend(`/api/Producto/${productoId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(producto);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Error al obtener producto" },
      { status: 500 }
    );
  }
}
