import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.1.77:8000";

export const apiClient = async () => {
  const session = await AsyncStorage.getItem("sessionData");
  const token = session ? JSON.parse(session).access_token : null;

  return axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  });
};
