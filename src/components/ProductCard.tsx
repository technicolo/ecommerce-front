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

  const handleAgregarAlCarrito = () => {
    // TODO: Guardar en almacenamiento local o backend
    const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
    const actualizado = [...carrito, producto];
    localStorage.setItem("carrito", JSON.stringify(actualizado));

    alert(`🛒 "${producto.nombre}" agregado al carrito.`);
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
