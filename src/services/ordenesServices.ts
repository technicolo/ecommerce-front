
import axiosInstance from "../../axiosConfig";

export async function confirmarOrden(productos: { id: number; cantidad: number }[]) {
  const res = await axiosInstance.post("/api/ordenes/confirmar", {
    productos,
  });

  return res.data;
}

export const obtenerOrdenes = async () => {
  const res = await axiosInstance.get("/api/ordenes");
  return res.data;
};

export const obtenerOrdenPorId = async (id: number) => {
  const res = await axiosInstance.get(`/api/ordenes/${id}`);
  return res.data;
};
