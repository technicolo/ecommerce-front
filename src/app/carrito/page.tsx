"use client";

import { useEffect, useState } from "react";

type Producto = {
  id: number;
  nombre: string;
  precio: number;
  descripcion?: string;
  cantidad: number;
};

export default function CarritoPage() {
  const [carrito, setCarrito] = useState<Producto[]>([]);

  useEffect(() => {
    const obtenerCarrito = async () => {
      try {
        const res = await fetch("/api/carrito", { method: "GET" });
        if (!res.ok) throw new Error("Error al obtener el carrito");
        const data = await res.json();

        const normalizado = data.map((item: any) => ({
          id: item.producto.id,
          nombre: item.producto.nombre,
          descripcion: item.producto.descripcion,
          precio: item.producto.precio,
          cantidad: item.cantidad,
        }));
        setCarrito(normalizado);
      } catch (error) {
        console.error("🧨 Error al cargar carrito desde backend:", error);
      }
    };

    obtenerCarrito();
  }, []);

  const finalizarCompra = async () => {
    if (carrito.length === 0) return;
    try {
      const res = await fetch("/api/ordenes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productos: carrito.map((p) => ({
            id: p.id,
            cantidad: p.cantidad,
          })),
        }),
      });

      if (res.ok) {
        alert("✅ Compra finalizada con éxito!");
        setCarrito([]);
        localStorage.removeItem("carrito");
      } else {
        const data = await res.json();
        alert("❌ Error al procesar la orden: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error al conectar con el servidor.");
    }
  };

  const vaciarCarrito = async () => {
    try {
      const res = await fetch("/api/carrito/vaciar", { method: "DELETE" });
      if (!res.ok) throw new Error("Error al vaciar el carrito");
      setCarrito([]);
    } catch (err) {
      alert("❌ No se pudo vaciar el carrito.");
      console.error(err);
    }
  };

  const aumentarCantidad = (id: number) => {
    const actualizado = carrito.map((p) =>
      p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p
    );
    setCarrito(actualizado);
    localStorage.setItem("carrito", JSON.stringify(actualizado));
  };

  const disminuirCantidad = (id: number) => {
    const actualizado = carrito
      .map((p) => (p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p))
      .filter((p) => p.cantidad > 0); // elimina si llega a 0
    setCarrito(actualizado);
    localStorage.setItem("carrito", JSON.stringify(actualizado));
  };

  const eliminarProducto = async (productoId: number) => {
    try {
      const res = await fetch(`/api/carrito/${productoId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error al eliminar producto");

      setCarrito(carrito.filter((p) => p.id !== productoId));
    } catch (err) {
      alert("❌ No se pudo eliminar el producto.");
      console.error(err);
    }
  };

  const total = carrito.reduce((sum, p) => sum + p.precio * p.cantidad, 0);

  return (
    <main style={{ padding: "2rem" }}>
      <h1>🛒 Tu Carrito</h1>

      {carrito.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <ul>
            {carrito.map((p) => (
              <li key={p.id} style={{ marginBottom: "1rem" }}>
                {p.nombre} - ${p.precio} c/u
                <br />
                <button
                  onClick={() => disminuirCantidad(p.id)}
                  style={{ marginRight: "0.5rem" }}
                >
                  ➖
                </button>
                Cantidad: {p.cantidad}
                <button
                  onClick={() => aumentarCantidad(p.id)}
                  style={{ marginLeft: "0.5rem" }}
                >
                  ➕
                </button>
                <br />
                Subtotal: ${(p.precio * p.cantidad).toFixed(2)}
                <br />
                <button
                  onClick={() => eliminarProducto(p.id)}
                  style={{ marginTop: "0.5rem", color: "red" }}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <h3>Total: ${total}</h3>
          <button
            onClick={finalizarCompra}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              backgroundColor: "green",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Finalizar compra
          </button>
          <button onClick={vaciarCarrito}>Vaciar carrito</button>
        </>
      )}
    </main>
  );
}
