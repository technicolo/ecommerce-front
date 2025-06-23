"use client";

import { useRouter } from "next/navigation";

type Producto = {
  id: number;
  nombre: string;
  precio: number;
  descripcion?: string;
};

interface Props {
  producto: Producto;
}

export default function ProductCard({ producto }: Props) {
  const router = useRouter();

  const handleAgregarAlCarrito = async () => {
    try {
      const res = await fetch("/api/carrito", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productoId: producto.id,
          cantidad: 1,
        }),
      });

      const responseText = await res.text();

      console.log("🔄 Estado HTTP:", res.status);
      console.log("📩 Respuesta:", responseText);

      if (!res.ok) throw new Error("Error al agregar al carrito");

      alert(`🛒 "${producto.nombre}" agregado al carrito.`);
    } catch (err) {
      alert("❌ No se pudo agregar al carrito.");
      console.error("🧨 Error en fetch:", err);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <h3>{producto.nombre}</h3>
      <p>${producto.precio}</p>
      {producto.descripcion && <small>{producto.descripcion}</small>}
      <button style={{ marginTop: "1rem" }} onClick={handleAgregarAlCarrito}>
        Agregar al carrito
      </button>
    </div>
  );
}
