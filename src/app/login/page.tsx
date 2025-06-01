"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
      router.push("/");
    } else {
      let errorMsg = "Login fallido";

      try {
        const data = await res.json();
        if (data?.message) errorMsg = data.message;
      } catch (err) {
        // La respuesta no era JSON
      }

      setError(errorMsg);
    }
  };

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Ingresar</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p>
        ¿No tenés cuenta?{" "}
        <button
          onClick={() => router.push("/register")}
          style={{ color: "blue" }}
        >
          Registrarse
        </button>
      </p>
    </main>
  );
}
