import React,{useState} from "react";
import { View, StyleSheet, useWindowDimensions, Text, TouchableOpacity, Animated } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import UsuariosList from "../components/UsuariosList";

const UsuariosScreen = () => {
  const { width, height } = useWindowDimensions(); // Obtenemos las dimensiones de la pantalla
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const toggleHeader = () => {
    setIsHeaderVisible(!isHeaderVisible);
  };


  return (
    <View style={[styles.container, { padding: width > 600 ? 30 : 15 }]}>
           <UsuariosList />
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5", // Fondo más suave
    padding: 20,
    justifyContent: 'center', // Asegura que los elementos estén centrados en pantallas más grandes
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#0066cc",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  toggleButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default UsuariosScreen;