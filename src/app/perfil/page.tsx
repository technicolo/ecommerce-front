"use client";

import { obtenerPerfil } from "@/services/perfil";
import { useEffect, useState } from "react";


export default function PerfilUsuarioPage() {
  const [perfil, setPerfil] = useState<{ nombre: string; email: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const data = await obtenerPerfil();
        setPerfil(data);
      } catch (err: any) {
        setError("Error al cargar perfil: " + err.message);
      }
    };

    cargarPerfil();
  }, []);

  if (error) {
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
  }

  if (!perfil) {
    return <p style={{ textAlign: "center" }}>Cargando perfil...</p>;
  }

  return (
    <main style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>👤 Mi Perfil</h1>
      <p><strong>Nombre:</strong> {perfil.nombre}</p>
      <p><strong>Email:</strong> {perfil.email}</p>
    </main>
  );
}
