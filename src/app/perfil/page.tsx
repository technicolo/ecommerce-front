"use client";

import { obtenerOrdenes, obtenerOrdenPorId } from "@/services/ordenesServices";
import { obtenerPerfil } from "@/services/perfil";

import { useEffect, useState } from "react";

type Perfil = { nombre: string; email: string };
type Orden = { id: number; fecha: string };
type DetalleOrden = {
  id: number;
  fecha: string;
  total: number;
  productos: {
    productoId: number;
    productoNombre: string;
    cantidad: number;
    precioUnitario: number;
  }[];
};

export default function PerfilUsuarioPage() {
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [ordenes, setOrdenes] = useState<Orden[]>([]);
  const [detalles, setDetalles] = useState<Record<number, DetalleOrden | null>>(
    {}
  );
  const [expandida, setExpandida] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [perfilData, ordenesData] = await Promise.all([
          obtenerPerfil(),
          obtenerOrdenes(),
        ]);
        setPerfil(perfilData);
        setOrdenes(ordenesData);
      } catch (err: any) {
        setError("Error al cargar datos: " + err.message);
      }
    };

    cargarDatos();
  }, []);

  const toggleDetalle = async (id: number) => {
    if (expandida === id) {
      setExpandida(null);
    } else {
      if (!detalles[id]) {
        const detalle = await obtenerOrdenPorId(id);
        setDetalles((prev) => ({ ...prev, [id]: detalle }));
      }
      setExpandida(id);
    }
  };

  if (error)
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
  if (!perfil) return <p style={{ textAlign: "center" }}>Cargando perfil...</p>;

  return (
    <main style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
      <h1 style={{ textAlign: "center" }}>👤 Mi Perfil</h1>
      <p>
        <strong>Nombre:</strong> {perfil.nombre}
      </p>
      <p>
        <strong>Email:</strong> {perfil.email}
      </p>

      <hr style={{ margin: "2rem 0" }} />
      <h2>🧾 Mis Órdenes</h2>
      {ordenes.length === 0 && <p>No tenés pedidos aún.</p>}
      {ordenes.map((orden) => (
        <div
          key={orden.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "6px",
            marginBottom: "1rem",
            padding: "1rem",
            transition: "all 0.3s ease",
          }}
        >
          <p>
            <strong>Orden #{orden.id}</strong>
          </p>
          <p>
            <strong>Fecha:</strong> {new Date(orden.fecha).toLocaleString()}
          </p>
          <button onClick={() => toggleDetalle(orden.id)}>
            {expandida === orden.id ? "Ocultar detalles" : "Ver más"}
          </button>

          {expandida === orden.id && detalles[orden.id] && (
            <div
              style={{
                marginTop: "1rem",
                animation: "fadeIn 0.3s ease-in-out",
              }}
            >
              <p>
                <strong>Total:</strong> ${detalles[orden.id]!.total}
              </p>
              <ul>
                {detalles[orden.id]!.productos.map((prod, idx) => (
                  <li key={idx}>
                    {prod.productoNombre} x{prod.cantidad} - $
                    {prod.precioUnitario * prod.cantidad}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </main>
  );
}
