"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./cssComponents/NavBar.module.css";
import { useAuthContext } from "@/app/contexts/authContexts";
import { cerrarSesion } from "@/services/inOutServices";

export default function Navbar() {
  const router = useRouter();
  const { logout, isAuthenticated } = useAuthContext();

  const handleLogout = () => {
    cerrarSesion();
    logout();
    router.push("/login");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>🛒 Mi E-commerce</div>
      <div className={styles.navLinks}>
        <Link href="/productos" className={styles.link}>
          Productos
        </Link>
        <Link href="/carrito" className={styles.link}>
          Carrito
        </Link>
        <Link href="/perfil" className={styles.link}>
          Perfil
        </Link>
      </div>
      <div>
        {isAuthenticated ? (
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Cerrar sesión
          </button>
        ) : (
          <button
            onClick={() => router.push("/login")}
            className={styles.loginBtn}
          >
            Iniciar sesión
          </button>
        )}
      </div>
    </nav>
  );
}
