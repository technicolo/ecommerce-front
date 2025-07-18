import axiosInstance from "../../axiosConfig";


export async function obtenerCarrito() {
  const res = await axiosInstance.get("/api/carrito");
  return res.data;
}

export async function agregarAlCarrito(productoId: number, cantidad: number = 1) {
  const res = await axiosInstance.post("/api/carrito", { productoId, cantidad });
  return res.data;
}

export async function eliminarDelCarrito(productoId: number) {
  const res = await axiosInstance.delete(`/api/carrito/${productoId}`);
  return res.data;
}

export async function vaciarCarrito() {
  const res = await axiosInstance.delete("/api/carrito/vaciar");
  return res.data;
}
