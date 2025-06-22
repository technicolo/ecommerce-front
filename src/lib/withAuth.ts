// lib/withAuth.ts
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { JSX } from "react";

export function withAuth(pageFn: () => Promise<JSX.Element> | JSX.Element) {
  return async function ProtectedPage() {
    const token = (await cookies()).get("token")?.value;

    if (!token) {
      redirect("/login");
    }

    return await pageFn(); // Ejecuta la página real si está logueado
  };
}
