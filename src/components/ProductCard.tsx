'use client';

import { useRouter } from 'next/navigation';
import styles from './cssComponents/ProductCard.module.css';

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

      if (!res.ok) throw new Error("Error al agregar al carrito");

      alert(`🛒 "${producto.nombre}" agregado al carrito.`);
    } catch (err) {
      alert("❌ No se pudo agregar al carrito.");
      console.error("🧨 Error en fetch:", err);
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
        <button className={styles.boton} onClick={handleAgregarAlCarrito}>
          Agregar al carrito
        </button>
        <button className={styles.botonSecundario} onClick={handleVerDetalles}>
          Ver detalles
        </button>
      </div>
    </div>
  );
}
