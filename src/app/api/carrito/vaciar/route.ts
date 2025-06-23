
import { NextRequest, NextResponse } from "next/server";
import { fetchFromBackend } from "../../utils/fetchFromBackend";

export async function DELETE(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const data = await fetchFromBackend("/api/carrito/vaciar", {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return NextResponse.json(data);
}
