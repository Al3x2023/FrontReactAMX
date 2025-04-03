import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Perfil</Text>
      <Text style={styles.text}>Aquí puedes ver y editar tu perfil.</Text>
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
  },
});

export default ProfileScreen;
