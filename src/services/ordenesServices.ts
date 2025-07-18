"use server";


import { cookies } from "next/headers";
import axiosInstance from "../../axiosConfig";

export async function confirmarOrden(productos: { id: number; cantidad: number }[]) {
  const token = (await cookies()).get("token")?.value;

  const res = await axiosInstance.post(
    "/api/ordenes/confirmar",
    { productos },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
}
