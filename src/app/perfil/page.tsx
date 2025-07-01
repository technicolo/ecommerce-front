"use client";

import { useEffect, useState } from "react";
import styles from "./perfil.module.css";
import { withAuthClient } from "@/lib/withAuthClient";

function PerfilPage() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [passwordActual, setPasswordActual] = useState("");
  const [passwordNueva, setPasswordNueva] = useState("");
  const [editandoPerfil, setEditandoPerfil] = useState(false);
  const [editandoPassword, setEditandoPassword] = useState(false);

  useEffect(() => {
    const cargarPerfil = async () => {
      const res = await fetch("/api/usuarios/perfil");
      if (res.ok) {
        const data = await res.json();
        setNombre(data.nombre || "");
        setEmail(data.email || "");
      }
    };

    cargarPerfil();
  }, []);

  const actualizarPerfil = async () => {
    const res = await fetch("/api/usuarios/editar", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email }),
    });

    if (res.ok) {
      alert("✅ Perfil actualizado");
      setEditandoPerfil(false);
    } else {
      const data = await res.json();
      alert("❌ Error: " + data.message);
    }
  };

  const cambiarPassword = async () => {
    const res = await fetch("/api/usuarios/cambiar-password", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        actual: passwordActual,
        nueva: passwordNueva,
      }),
    });

    if (res.ok) {
      alert("🔒 Contraseña actualizada");
      setPasswordActual("");
      setPasswordNueva("");
      setEditandoPassword(false);
    } else {
      const data = await res.json();
      alert("❌ Error: " + data.message);
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <div className={styles.profileIcon}>🧑‍💼</div>
        <h1 className={styles.title}>Mi Perfil</h1>
      </div>

      {!editandoPerfil ? (
        <div className={styles.section}>
          <p>
            <span className={styles.label}>Nombre:</span> {nombre}
          </p>
          <p>
            <span className={styles.label}>Email:</span> {email}
          </p>
          <button
            className={`${styles.button} ${styles.primary}`}
            onClick={() => setEditandoPerfil(true)}
          >
            ✏️ Editar perfil
          </button>
        </div>
      ) : (
        <div className={styles.section}>
          <h2>Editar Perfil</h2>
          <input
            className={styles.input}
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre"
          />
          <input
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <div className={styles.buttonGroup}>
            <button
              className={`${styles.button} ${styles.primary}`}
              onClick={actualizarPerfil}
            >
              💾 Guardar
            </button>
            <button
              className={`${styles.button} ${styles.secondary}`}
              onClick={() => setEditandoPerfil(false)}
            >
              ❌ Cancelar
            </button>
          </div>
        </div>
      )}

      {!editandoPassword ? (
        <div className={styles.section}>
          <button
            className={`${styles.button} ${styles.primary}`}
            onClick={() => setEditandoPassword(true)}
          >
            🔒 Cambiar contraseña
          </button>
        </div>
      ) : (
        <div className={styles.section}>
          <h2>Cambiar contraseña</h2>
          <input
            className={styles.input}
            type="password"
            value={passwordActual}
            onChange={(e) => setPasswordActual(e.target.value)}
            placeholder="Contraseña actual"
          />
          <input
            className={styles.input}
            type="password"
            value={passwordNueva}
            onChange={(e) => setPasswordNueva(e.target.value)}
            placeholder="Nueva contraseña"
          />
          <div className={styles.buttonGroup}>
            <button
              className={`${styles.button} ${styles.primary}`}
              onClick={cambiarPassword}
            >
              ✅ Actualizar
            </button>
            <button
              className={`${styles.button} ${styles.secondary}`}
              onClick={() => setEditandoPassword(false)}
            >
              ❌ Cancelar
            </button>
          </div>
        </div>
      )}
    </main>
  );
  
}
export default withAuthClient(PerfilPage);

