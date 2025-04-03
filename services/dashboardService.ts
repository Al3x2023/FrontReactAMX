import { apiClient } from "./sessionService";

export const obtenerResumen = async (idSucursal: number) => {
  const api = await apiClient();
  try {
    const response = await api.get(`/dashboard/resumen/${idSucursal}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener resumen:", error);
    return null;
  }
};

export const obtenerInventarioBajo = async (idSucursal: number) => {
  const api = await apiClient();
  try {
    const response = await api.get(`/dashboard/inventario_bajo/${idSucursal}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener inventario bajo:", error);
    return [];
  }
};

export const obtenerProductosMasVendidos = async (idSucursal: number) => {
  const api = await apiClient();
  try {
    const response = await api.get(`/dashboard/productos_mas_vendidos/${idSucursal}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener productos más vendidos:", error);
    return [];
  }
};

export const obtenerActividadReciente = async (idSucursal: number) => {
  const api = await apiClient();
  try {
    const response = await api.get(`/dashboard/actividad_reciente/${idSucursal}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener actividad reciente:", error);
    return { ultimas_entradas: [], ultimas_salidas: [] };
  }
};
