import ProductCard from "@/components/ProductCard";
import { withAuth } from "@/lib/withAuth";
import { cookies } from "next/headers";
import styles from "./productos.module.css";

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
    <main className={styles.main}>
      <h1>Productos disponibles</h1>
      <div className={styles.grid}>
        {productos.map((p) => (
          <ProductCard key={p.id} producto={p} />
        ))}
      </div>
    </main>
  );
});
