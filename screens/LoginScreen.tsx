// src/screens/LoginScreen.tsx
import React from "react";
import { View, Alert } from "react-native";
import LoginForm from "../components/LoginForm";
import { login} from "../services/authService";
import LoginRequest from "../services/authService";

const LoginScreen = ({ navigation }: any) => {
  const handleLogin = async (credentials: LoginRequest) => {
    try {
      const userData = await login(credentials);
      if (userData) {
        Alert.alert("Inicio de sesión exitoso");
        navigation.replace("Main");
      } else {
        Alert.alert("Error", "Credenciales incorrectas");
      }
    } catch (err) {
      Alert.alert("Error", "Ocurrió un problema al iniciar sesión");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <LoginForm onLogin={handleLogin} />
    </View>
  );
};

export default LoginScreen;
