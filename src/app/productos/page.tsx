// app/productos/page.tsx
"use client";

import { useEffect, useState } from "react";

type Producto = {
  id: number;
  nombre: string;
  precio: number;
  descripcion?: string;
};

export default function ProductosPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch("/api/product"); // Ajustá al endpoint real
        if (!res.ok) throw new Error("Error al cargar productos");
        const data = await res.json();
        setProductos(data);
      } catch (err: any) {
        setError(err.message || "Ocurrió un error");
      }
    };

    fetchProductos();
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Productos disponibles</h1>
      <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
        {productos.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{p.nombre}</h3>
            <p>${p.precio}</p>
            {p.descripcion && <small>{p.descripcion}</small>}
          </div>
        ))}
      </div>
    </main>
  );
}
