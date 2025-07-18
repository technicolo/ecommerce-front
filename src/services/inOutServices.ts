import Cookies from "js-cookie";

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Usuarios`;

export async function loginUsuario(email: string, password: string) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  let data;
  try {
    data = await response.json();
  } catch (_) {
    data = {};
  }

  return {
    ok: response.ok,
    data,
  };
}

export async function registrarUsuario(
  nombre: string,
  email: string,
  password: string
) {
  const response = await fetch(`${API_URL}/registro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ nombre, email, password }),
  });

  let data;
  try {
    data = await response.json();
  } catch (_) {
    data = {};
  }

  return {
    ok: response.ok,
    data,
  };
}

export function cerrarSesion() {
  Cookies.remove("NEXT_JS_AUTH");
}
