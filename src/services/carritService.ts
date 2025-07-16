import axiosInstance from "./api";

export async function agregarAlCarrito(productoId: number, cantidad = 1) {
  const response = await axiosInstance.post("/carrito", {
    productoId,
    cantidad,
  });
  return response.data;
}
