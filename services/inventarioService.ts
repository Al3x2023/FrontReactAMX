import axios from "axios";

const API_URL = "httphttp://192.168.1.77:8000/inventarios/"; // Cambia esta URL por la de tu API

// Función para obtener el inventario de una sucursal
export const getInventarios = async (idSucursal: number) => {
  try {
    const response = await axios.get(`${API_URL}/${idSucursal}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Error al obtener inventarios");
  }
};

// Función para actualizar el stock de un producto
export const actualizarStock = async (idProducto: number, idSucursal: number, cantidad: number) => {
  try {
    const response = await axios.put(`${API_URL}/actualizar_stock`, {
      idProducto,
      idSucursal,
      cantidad,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Error al actualizar stock");
  }
};
