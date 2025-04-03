import axios from "axios";

// URL base de la API
const API_URL = "http://192.168.1.77:8000/usuarios";

// Obtener usuarios con filtros opcionales
const getUsers = async (filtros?: { idUsuario?: BigInt; idSucursal?: BigInt; nombre?: string; correoElectronico?: string; rol?: string }) => {
  try {
    const response = await axios.get(API_URL, {
      params: filtros, // Pasar los filtros como parámetros de la URL
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw new Error("No se pudo obtener la lista de usuarios");
  }
};

const createUser = async (usuario: { idSucursal?: number; nombre: string; correoElectronico: string; contrasena: string; rol: string }) => {
  try {
    const response = await axios.post(API_URL, usuario);
    return response.data;
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw new Error("No se pudo crear el usuario");
  }
};

const updateUser = async (idUsuario: number, usuario: { idSucursal?: number; nombre?: string; correoElectronico?: string; contrasena?: string; rol?: string }) => {
  try {
    const response = await axios.put(`${API_URL}/${idUsuario}`, usuario);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    throw new Error("No se pudo actualizar el usuario");
  }
};

const deleteUser = async (idUsuario: number) => {
  try {
    await axios.delete(`${API_URL}/${idUsuario}`);
    return { message: "Usuario eliminado correctamente" };
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    throw new Error("No se pudo eliminar el usuario");
  }
};

// Exportar todas las funciones
export { getUsers, createUser, updateUser, deleteUser };
