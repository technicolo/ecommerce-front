"use client";

import { useEffect, useState } from "react";
import styles from "./carrito.module.css";
import ConfirmModal from "@/components/modals/confirmModal/ConfirmModal";
import {
  vaciarCarrito,
  eliminarDelCarrito,
  agregarAlCarrito,
  obtenerCarrito,
} from "@/services/carritoService";
import { ProductoDTO } from "../interfaces/productoDTO";
import { confirmarOrden } from "@/services/ordenesServices";




function CarritoPage() {
  const [carrito, setCarrito] = useState<ProductoDTO[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [onConfirmAction, setOnConfirmAction] = useState<() => void>(() => () => {});

  useEffect(() => {
    const cargarCarrito = async () => {
      try {
        const data = await obtenerCarrito();
        const normalizado = data.map((item: any) => ({
          id: item.producto.id,
          nombre: item.producto.nombre,
          descripcion: item.producto.descripcion,
          precio: item.producto.precio,
          cantidad: item.cantidad,
        }));
        setCarrito(normalizado);
      } catch (err: any) {
        setError(err.message || "Error desconocido al cargar el carrito.");
      }
    };

    cargarCarrito();
  }, []);

const finalizarCompra = async () => {
  if (carrito.length === 0) return;

  try {
    await confirmarOrden(
      carrito.map((p) => ({ id: p.id, cantidad: p.cantidad }))
    );

    alert("✅ Compra finalizada con éxito!");
    setCarrito([]);
  } catch (error: any) {
    alert("❌ Error al procesar la orden: " + error.message);
  }
};

  const vaciar = async () => {
    try {
      await vaciarCarrito();
      setCarrito([]);
    } catch {
      alert("❌ No se pudo vaciar el carrito.");
    }
  };

  const aumentarCantidad = async (id: number) => {
    try {
      await agregarAlCarrito(id, 1);
      const actualizado = carrito.map((p) =>
        p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p
      );
      setCarrito(actualizado);
    } catch {
      alert("❌ No se pudo aumentar la cantidad.");
    }
  };

  const disminuirCantidad = async (id: number) => {
    const producto = carrito.find((p) => p.id === id);
    if (!producto) return;

    if (producto.cantidad === 1) {
      try {
        await eliminarDelCarrito(id);
        setCarrito(carrito.filter((p) => p.id !== id));
      } catch {
        alert("❌ No se pudo eliminar el producto.");
      }
    } else {
      const actualizado = carrito.map((p) =>
        p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p
      );
      setCarrito(actualizado);
    }
  };

  const eliminarProducto = async (id: number) => {
    try {
      await eliminarDelCarrito(id);
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
              <button className={styles.vaciarBtn} onClick={() => confirmar(vaciar)}>
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

export default CarritoPage;
