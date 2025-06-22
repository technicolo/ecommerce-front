import ProductCard from "@/components/ProductCard";
import { withAuth } from "@/lib/withAuth";
import { cookies } from "next/headers";


type Producto = {
  id: number;
  nombre: string;
  precio: number;
  descripcion?: string;
};

export default withAuth(async function ProductosPage() {
  const token = (await cookies()).get("token")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Producto`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const productos: Producto[] = await res.json();

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Productos disponibles</h1>
      <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
        {productos.map((p) => (
          <ProductCard key={p.id} producto={p} />
        ))}
      </div>
    </main>
  );
});
