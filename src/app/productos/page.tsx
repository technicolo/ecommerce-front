"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { obtenerProductos } from "@/services/ProductoServices";
import { ProductoDTO } from "../interfaces/productoDTO";

export default function ProductosPage() {
  const [productos, setProductos] = useState<ProductoDTO[]>([]); 

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await obtenerProductos();
        setProductos(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProductos();
  }, []);

  return (
    <main>
      <div>
        {productos.map((p) => (
          <ProductCard key={p.id} producto={p} />
        ))}
      </div>
    </main>
  );
}
