"use client";

import { useEffect, useState } from "react";

type Producto = {
  id: number;
  nombre: string;
  precio: number;
  descripcion?: string;
};

export default function CarritoPage() {
  const [carrito, setCarrito] = useState<Producto[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("carrito") || "[]");
    setCarrito(data);
  }, []);

  const eliminarProducto = (id: number) => {
    const actualizado = carrito.filter((p) => p.id !== id);
    setCarrito(actualizado);
    localStorage.setItem("carrito", JSON.stringify(actualizado));
  };

  const total = carrito.reduce((sum, p) => sum + p.precio, 0);

  return (
    <main style={{ padding: "2rem" }}>
      <h1>🛒 Tu Carrito</h1>

      {carrito.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <ul>
            {carrito.map((p) => (
              <li key={p.id} style={{ marginBottom: "0.5rem" }}>
                {p.nombre} - ${p.precio}
                <button
                  onClick={() => eliminarProducto(p.id)}
                  style={{ marginLeft: "1rem", color: "red" }}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <h3>Total: ${total}</h3>
        </>
      )}
    </main>
  );
}
