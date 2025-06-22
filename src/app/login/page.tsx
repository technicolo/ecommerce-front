"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push("/productos");
    } else {
      let errorMsg = "Login fallido";

      try {
        const data = await res.json();
        if (data?.message) errorMsg = data.message;
      } catch (err) {
        console.error("Error al parsear respuesta:", err);
      }

      setError(errorMsg);
    }
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Iniciar sesión</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.input}
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className={styles.button} type="submit">
          Ingresar
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.registerLink}>
        <p>¿No tenés cuenta?</p>
        <button onClick={() => router.push("/productos")}>Registrarse</button>
      </div>
    </main>
  );
}
