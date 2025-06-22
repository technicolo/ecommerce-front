"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./register.module.css";

export default function RegisterPage() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ nombre, email, password }),
    });

    if (res.ok) {
      router.push("/login");
    } else {
      let errorMsg = "Registro fallido";

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
      <h1 className={styles.title}>Registro</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.input}
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
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
        <button className={styles.button} type="submit">Registrarse</button>
      </form>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.loginLink}>
        <p>¿Ya tenés cuenta?</p>
        <button onClick={() => router.push("/login")}>Iniciar sesión</button>
      </div>
    </main>
  );
}
