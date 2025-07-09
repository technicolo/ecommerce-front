"use client";

import { withAuthClient } from "@/lib/withAuthClient";
import { useEffect, useState } from "react";
import styles from "./carrito.module.css";
import ConfirmModal from "@/components/modals/confirmModal/ConfirmModal";


type Producto = {
  id: number;
  nombre: string;
  precio: number;
  descripcion?: string;
  cantidad: number;
};

function CarritoPage() {
  const [carrito, setCarrito] = useState<Producto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [onConfirmAction, setOnConfirmAction] = useState<() => void>(() => () => {});

  useEffect(() => {
    const obtenerCarrito = async () => {
      try {
        const res = await fetch("/api/carrito", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || "Error desconocido al obtener el carrito");
        }

        const data = await res.json();

        const normalizado = data.map((item: any) => ({
          id: item.producto.id,
          nombre: item.producto.nombre,
          descripcion: item.producto.descripcion,
          precio: item.producto.precio,
          cantidad: item.cantidad,
        }));

        setCarrito(normalizado);
      } catch (error: any) {
        setError(error.message || "Error desconocido al cargar el carrito.");
      }
    };

    obtenerCarrito();
  }, []);

  const finalizarCompra = async () => {
    if (carrito.length === 0) return;
    try {
      const res = await fetch("/api/ordenes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
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
    } catch {
      alert("❌ Error al conectar con el servidor.");
    }
  };

  const vaciarCarrito = async () => {
    try {
      const res = await fetch("/api/carrito/vaciar", {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Error al vaciar el carrito");
      setCarrito([]);
    } catch {
      alert("❌ No se pudo vaciar el carrito.");
    }
  };

  const aumentarCantidad = (id: number) => {
    const actualizado = carrito.map((p) =>
      p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p
    );
    setCarrito(actualizado);
    localStorage.setItem("carrito", JSON.stringify(actualizado));
  };

  const disminuirCantidad = async (id: number) => {
    const producto = carrito.find((p) => p.id === id);
    if (!producto) return;

    if (producto.cantidad === 1) {
      try {
        const res = await fetch(`/api/carrito/${id}`, {
          method: "DELETE",
          credentials: "include",
        });
        if (!res.ok) throw new Error("Error al eliminar producto");
        setCarrito(carrito.filter((p) => p.id !== id));
      } catch {
        alert("❌ No se pudo eliminar el producto.");
      }
    } else {
      const actualizado = carrito.map((p) =>
        p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p
      );
      setCarrito(actualizado);
      localStorage.setItem("carrito", JSON.stringify(actualizado));
    }
  };

  const eliminarProducto = async (id: number) => {
    try {
      const res = await fetch(`/api/carrito/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Error al eliminar producto");
      setCarrito(carrito.filter((p) => p.id !== id));
    } catch {
      alert("❌ No se pudo eliminar el producto.");
    }
  };

  const confirmar = (accion: () => void) => {
    setOnConfirmAction(() => accion);
    setModalOpen(true);
  };

  const total = carrito.reduce((sum, p) => sum + p.precio * p.cantidad, 0);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>🛒 Tu Carrito</h1>

        {error && <p className={styles.error}>❌ {error}</p>}

        {carrito.length === 0 && !error ? (
          <p className={styles.empty}>No hay productos en el carrito.</p>
        ) : (
          <>
            <ul className={styles.list}>
              {carrito.map((p) => (
                <li key={p.id} className={styles.item}>
                  <h3>{p.nombre}</h3>
                  <p>${p.precio} c/u</p>
                  <div className={styles.controls}>
                    <button onClick={() => disminuirCantidad(p.id)}>➖</button>
                    <span>Cantidad: {p.cantidad}</span>
                    <button onClick={() => aumentarCantidad(p.id)}>➕</button>
                  </div>
                  <p>Subtotal: ${(p.precio * p.cantidad).toFixed(2)}</p>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => confirmar(() => eliminarProducto(p.id))}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>

            <h3 className={styles.total}>Total: ${total}</h3>

            <div className={styles.actions}>
              <button
                className={styles.finalizarBtn}
                onClick={() => confirmar(finalizarCompra)}
              >
                Finalizar compra
              </button>
              <button className={styles.vaciarBtn} onClick={vaciarCarrito}>
                Vaciar carrito
              </button>
            </div>
          </>
        )}
      </div>

      <ConfirmModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => {
          onConfirmAction();
          setModalOpen(false);
        }}
      />
    </main>
  );
}

export default withAuthClient(CarritoPage);
