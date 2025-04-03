import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface LoginRequest {
  correoElectronico: string;
  contrasena: string;
}

interface SessionData {
  idUsuario: number;
  idSucursal: number;
  rol: string;
  access_token: string;
  token_type: string;
}

const API_URL = 'http://192.168.1.77:8000/auth/login/';

export const login = async (credentials: LoginRequest): Promise<SessionData | null> => {
  try {
    const response = await axios.post<SessionData>(API_URL, credentials);
    
    if (response.status === 200) {
      await AsyncStorage.setItem('sessionData', JSON.stringify(response.data));
      return response.data;
    }

    return null;
  } catch (error) {
    console.error('Error en el login:', error);
    return null;
  }
};

export const getSession = async (): Promise<SessionData | null> => {
  try {
    const session = await AsyncStorage.getItem('sessionData');
    return session ? JSON.parse(session) : null;
  } catch (error) {
    console.error('Error obteniendo la sesión:', error);
    return null;
  }
};

export const logout = async () => {
  await AsyncStorage.removeItem('sessionData');
};
export default LoginRequest;