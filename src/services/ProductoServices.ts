import { ProductoDTO } from "@/app/interfaces/productoDTO";
import axiosInstance from "../../axiosConfig";



export async function obtenerProductos(): Promise<ProductoDTO[]> {
  const response = await axiosInstance.get("/api/Producto");
  return response.data;
}

export async function obtenerProductoPorId(id: number): Promise<ProductoDTO> {
  const response = await axiosInstance.get(`/api/Producto/${id}`);
  return response.data;
}
