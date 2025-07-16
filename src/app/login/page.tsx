"use client";

import Cookies from "js-cookie";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";
import { useAuthContext } from "../contexts/authContexts";
import { loginUsuario } from "@/services/inOutServices";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { ok, data } = await loginUsuario(email, password);
      if (!ok) {
        setError(data.message || "Login fallido");
        return;
      }

      if (data.token) {
        // 👇 Guardamos el token en cookies para que el middleware lo detecte
        Cookies.set("authTokens", data.token, { expires: 7 });

        // (opcional) mantener el contexto también
        login({
          token: data.token,
          refresh_token: data.refresh_token,
        });

        router.push("/productos");
      } else {
        setError("Respuesta inválida del servidor");
      }
    } catch (err) {
      console.error("Error inesperado:", err);
      setError("Error inesperado");
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
        <button onClick={() => router.push("/register")}>Registrarse</button>
      </div>
    </main>
  );
}
