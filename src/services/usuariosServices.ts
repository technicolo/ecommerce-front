"use server";

import { cookies } from "next/headers";
import axiosInstance from "../../axiosConfig";

export async function actualizarPerfil(datos: {
  nombre?: string;
  email?: string;
  username?: string;
}) {
  const token = (await cookies()).get("token")?.value;

  const res = await axiosInstance.put("/api/Usuarios/me", datos, {
    headers: {
      Authorization: `Bearer ${token}` },
  });

  return res.data;
}

export async function cambiarPassword(datos: {
  passwordActual: string;
  nuevaPassword: string;
}) {
  const token = (await cookies()).get("token")?.value;

  const res = await axiosInstance.put("/api/Usuarios/me/password", datos, {
    headers: {
      Authorization: `Bearer ${token}` },
  });

  return res.data;
}
