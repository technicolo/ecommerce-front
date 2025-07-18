"use client";

import { useRouter } from "next/navigation";
import styles from "./cssComponents/ProductCard.module.css";
import { agregarAlCarrito } from "@/services/carritoService";
import { ProductoDTO } from "@/app/interfaces/productoDTO";
import { useState } from "react";

interface Props {
  producto: ProductoDTO;
}

export default function ProductCard({ producto }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleAgregarAlCarrito = async () => {
    setLoading(true);
    try {
      await agregarAlCarrito(producto.id, 1);
      alert(`🛒 "${producto.nombre}" agregado al carrito.`);
    } catch (err) {
      alert("❌ No se pudo agregar al carrito.");
      console.error("🧨 Error al agregar al carrito:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerDetalles = () => {
    router.push(`/detalle-producto/${producto.id}`);
  };

  return (
    <div className={styles.card}>
      <div>
        <div className={styles.nombre}>{producto.nombre}</div>
        <div className={styles.precio}>${producto.precio}</div>
        {producto.descripcion && (
          <div className={styles.descripcion}>{producto.descripcion}</div>
        )}
      </div>
      <div className={styles.botones}>
        <button
          className={styles.boton}
          onClick={handleAgregarAlCarrito}
          disabled={loading}
        >
          {loading ? "Agregando..." : "Agregar al carrito"}
        </button>
        <button className={styles.botonSecundario} onClick={handleVerDetalles}>
          Ver detalles
        </button>
      </div>
    </div>
  );
}
