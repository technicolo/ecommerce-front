'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ProductoPorIdDTO } from '@/app/interfaces/productoPorIDDTO';
import { obtenerProductoPorId } from '@/services/productoServices';
import { agregarAlCarrito } from '@/services/carritoService';

export default function DetalleProductoPage() {
  const { id } = useParams();
  const [producto, setProducto] = useState<ProductoPorIdDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchProducto = async () => {
      try {
        const data = await obtenerProductoPorId(Number(id));
        setProducto(data);
      } catch (error) {
        console.error('❌ Error al obtener producto:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducto();
  }, [id]);

  const handleAgregarAlCarrito = async () => {
    if (!producto) return;
    try {
      await agregarAlCarrito(producto.id, 1);
      alert(`🛒 "${producto.nombre}" agregado al carrito.`);
    } catch (error) {
      alert('❌ No se pudo agregar al carrito.');
      console.error('Error al agregar al carrito:', error);
    }
  };

  if (loading) return <p style={{ padding: 20 }}>Cargando producto...</p>;
  if (!producto) return <p style={{ padding: 20 }}>Producto no encontrado.</p>;

  const sinStock = producto.stock <= 0;

  return (
    <div
      style={{
        padding: '2rem',
        maxWidth: '600px',
        margin: '2rem auto',
        boxShadow: '0 0 20px rgba(0,0,0,0.1)',
        borderRadius: '10px',
        backgroundColor: '#fff',
      }}
    >
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#111' }}>
        {producto.nombre}
      </h1>

      {producto.imagenUrl && (
        <img
          src={producto.imagenUrl}
          alt={producto.nombre}
          style={{
            width: '100%',
            height: 'auto',
            marginBottom: '1rem',
            borderRadius: '10px',
            objectFit: 'cover',
          }}
        />
      )}

      <p style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#333' }}>
        ${producto.precio}
      </p>

      <p
        style={{
          fontSize: '1rem',
          marginBottom: '0.5rem',
          color: sinStock ? 'red' : '#333',
        }}
      >
        {sinStock ? 'Sin stock disponible' : `Stock: ${producto.stock}`}
      </p>

      <p style={{ fontSize: '1rem', marginBottom: '1.5rem', color: '#444' }}>
        {producto.descripcion}
      </p>

      <button
        onClick={handleAgregarAlCarrito}
        disabled={sinStock}
        style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: sinStock ? '#999' : '#0070f3',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: sinStock ? 'not-allowed' : 'pointer',
          fontSize: '1rem',
          transition: 'background-color 0.2s',
        }}
      >
        {sinStock ? 'No disponible' : 'Agregar al carrito'}
      </button>
    </div>
  );
}
