"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "./producto.module.css";

type Producto = {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  imagenUrl?: string;
};

export default function DetalleProductoPage() {
  const { id } = useParams();
  const [producto, setProducto] = useState<Producto | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const res = await fetch(`/api/product/${id}`);
        if (!res.ok) throw new Error("No se pudo obtener el producto");
        const data = await res.json();
        setProducto(data);
      } catch (err) {
        setError("Error al cargar el producto.");
      } 
    };

    if (id) fetchProducto();
  }, [id]);

  if (error) return <p className={styles.error}>{error}</p>;
  if (!producto) return <p className={styles.cargando}>Cargando producto...</p>;

  return (
    <div className={styles.contenedor}>
      <h1 className={styles.titulo}>{producto.nombre}</h1>
      {producto.imagenUrl && (
        <img
          className={styles.imagen}
          src={producto.imagenUrl}
          alt={`Imagen de ${producto.nombre}`}
        />
      )}
      <p className={styles.descripcion}>{producto.descripcion}</p>
      <p className={styles.precio}>Precio: ${producto.precio.toFixed(2)}</p>
    </div>
  );
}
