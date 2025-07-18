
import { obtenerPerfil } from "@/services/usuariosServices";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  try {
    const user = await obtenerPerfil();

    return (
      <main style={{ padding: "2rem" }}>
        <h1>Bienvenido, {user.name}</h1>
      </main>
    );
  } catch {
    redirect("/login");
  }
}
