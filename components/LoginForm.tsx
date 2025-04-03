import React, { useState } from "react";
import { View, TextInput, Alert, StyleSheet, Text, TouchableOpacity, ScrollView, useWindowDimensions, ActivityIndicator } from "react-native";

// Definimos la interfaz de las propiedades (Props)
interface LoginData {
  correoElectronico: string;
  contrasena: string;
}

interface Props {
  onLogin: (data: LoginData) => void;
}

const LoginForm: React.FC<Props> = ({ onLogin }) => {
  const { width } = useWindowDimensions(); // Obtenemos el ancho de la pantalla
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [loading, setLoading] = useState(false); // Estado para manejar la carga
  const [isValid, setIsValid] = useState(true); // Estado para la validación de los campos

  const handleLogin = () => {
    if (!correoElectronico || !contrasena) {
      Alert.alert("Error", "Por favor ingrese el correo y la contraseña");
      return;
    }
    setLoading(true); // Activar el estado de carga
    onLogin({ correoElectronico, contrasena });
    setLoading(false); // Desactivar la carga después de la llamada
  };

  // Validación en tiempo real
  const handleEmailChange = (text: string) => {
    setCorreoElectronico(text);
    setIsValid(text.includes("@") && text.length > 0); // Verificar que el correo contenga "@" y no esté vacío
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Iniciar sesión</Text>

      <TextInput
        style={[styles.input, { 
          width: width > 600 ? "50%" : "100%", 
          borderColor: isValid ? "#ddd" : "red" 
        }]} // Validación dinámica de borde
        placeholder="Correo Electrónico"
        keyboardType="email-address"
        value={correoElectronico}
        onChangeText={handleEmailChange}
        placeholderTextColor="#aaa"
      />
      
      <TextInput
        style={[styles.input, { 
          width: width > 600 ? "50%" : "100%" 
        }]} 
        placeholder="Contraseña"
        secureTextEntry
        value={contrasena}
        onChangeText={setContrasena}
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" /> // Indicador de carga
        ) : (
          <Text style={styles.buttonText}>Ingresar</Text>
        )}
      </TouchableOpacity>

      <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={styles.footerText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.footerText}>Crear una cuenta</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
    textAlign: "center",
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#007BFF",
    width: "100%",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  footerText: {
    color: "#007BFF",
    fontSize: 14,
    marginBottom: 10,
  },
});

export default LoginForm;
