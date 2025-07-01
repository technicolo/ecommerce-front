"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function withAuthClient(Component: React.ComponentType) {
  return function ProtectedComponent(props: any) {
    const router = useRouter();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
      const verificarSesion = async () => {
        try {
          const res = await fetch("/api/sessions", {
            method: "GET",
            credentials: "include", // importante para que mande la cookie
          });

          if (!res.ok) throw new Error("No autenticado");

          setChecking(false); // OK, seguimos
        } catch {
          router.push("/login");
        }
      };

      verificarSesion();
    }, []);

    if (checking) return null;

    return <Component {...props} />;
  };
}
