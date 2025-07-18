import axiosInstance from "../../axiosConfig";

export async function obtenerPerfil() {
  const response = await axiosInstance.get("/api/Usuarios/me");
  return response.data;
}
