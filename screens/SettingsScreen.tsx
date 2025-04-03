import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Configuración</Text>
      <Text style={styles.text}>Aquí puedes ajustar las configuraciones de la app.</Text>

      {/* Ejemplo de un botón */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Cambiar contraseña</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#0066cc",
  },
  text: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#0066cc",
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginBottom: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default SettingsScreen;
