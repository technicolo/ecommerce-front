import { ProductoDTO } from "@/app/interfaces/productoDTO";
import axiosInstance from "../../axiosConfig";
import { ProductoPorIdDTO } from "@/app/interfaces/productoPorIDDTO";



export async function obtenerProductos(): Promise<ProductoDTO[]> {
  const response = await axiosInstance.get("/api/Producto");
  return response.data;
}

export async function obtenerProductoPorId(id: number): Promise<ProductoPorIdDTO> {
  const response = await axiosInstance.get(`/api/Producto/${id}`);
  return response.data;
}
