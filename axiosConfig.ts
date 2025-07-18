import axios from "axios";

// ✅ FUNCION CORREGIDA: extrae el token del objeto JSON de la cookie
function getClientToken(): string | undefined {
  if (typeof document === "undefined") return;

  const raw = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authTokens="));

  if (!raw) return;

  try {
    const jsonString = decodeURIComponent(raw.split("=")[1]);
    const parsed = JSON.parse(jsonString);
    return parsed.token;
  } catch (err) {
    console.error("❌ Error al parsear cookie:", err);
    return;
  }
}



const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 10000,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getClientToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);



axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("❌ Response error:", error.response.data);
    } else if (error.request) {
      console.error("❌ No response received:", error.request);
    } else {
      console.error("❌ Request setup error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
