// app/page.tsx
import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/login");
  return null; // Importante para cumplir con el contrato de componente
}
