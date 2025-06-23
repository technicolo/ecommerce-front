// app/api/carrito/[productoId]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { fetchFromBackend } from "../../utils/fetchFromBackend";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { productoId: string } }
) {
  const token = req.cookies.get("token")?.value;

  const data = await fetchFromBackend(`/api/carrito/${params.productoId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return NextResponse.json(data);
}
