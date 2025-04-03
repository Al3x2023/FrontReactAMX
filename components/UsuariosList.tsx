import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, TextInput, Alert } from "react-native";
import { getUsers, createUser, updateUser, deleteUser } from "../services/userService";
import { FontAwesome5 } from "@expo/vector-icons";

const UsuariosList = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [rol, setRol] = useState("");

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await getUsers();
        setUsuarios(data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsuarios();
  }, []);

  const handleCreate = async () => {
    if (nombre && correo && rol) {
      try {
        const newUser = { nombre, correoElectronico: correo, rol };
        await createUser(newUser);
        setUsuarios([...usuarios, newUser]);
        setNombre("");
        setCorreo("");
        setRol("");
        Alert.alert("Éxito", "Usuario creado correctamente");
      } catch (error) {
        Alert.alert("Error", "No se pudo crear el usuario");
      }
    } else {
      Alert.alert("Campos incompletos", "Por favor, llena todos los campos.");
    }
  };

  const handleEdit = (user) => {
    setIsEditing(true);
    setEditUser(user);
    setNombre(user.nombre);
    setCorreo(user.correoElectronico);
    setRol(user.rol);
  };

  const handleUpdate = async () => {
    if (nombre && correo && rol) {
      try {
        const updatedUser = { nombre, correoElectronico: correo, rol };
        await updateUser(editUser.idUsuario, updatedUser);
        setUsuarios(usuarios.map((user) => (user.idUsuario === editUser.idUsuario ? updatedUser : user)));
        setIsEditing(false);
        setEditUser(null);
        setNombre("");
        setCorreo("");
        setRol("");
        Alert.alert("Éxito", "Usuario actualizado correctamente");
      } catch (error) {
        Alert.alert("Error", "No se pudo actualizar el usuario");
      }
    } else {
      Alert.alert("Campos incompletos", "Por favor, llena todos los campos.");
    }
  };

  const handleDelete = async (idUsuario) => {
    Alert.alert(
      "Confirmación",
      "¿Estás seguro de que deseas eliminar este usuario?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", onPress: async () => {
          try {
            await deleteUser(idUsuario);
            setUsuarios(usuarios.filter((user) => user.idUsuario !== idUsuario));
            Alert.alert("Éxito", "Usuario eliminado correctamente");
          } catch (error) {
            Alert.alert("Error", "No se pudo eliminar el usuario");
          }
        }},
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Usuarios</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" style={styles.loader} />
      ) : (
        <>
<FlatList
  data={usuarios}
  keyExtractor={(item) => (item.idUsuario ? item.idUsuario.toString() : 'no-id')}
  renderItem={({ item }) => (
    <View style={styles.userCard}>
      <Text style={styles.userText}>Nombre: {item.nombre}</Text>
      <Text style={styles.userText}>Correo: {item.correoElectronico}</Text>
      <Text style={styles.userText}>Rol: {item.rol}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item)}>
          <FontAwesome5 name="edit" size={16} color="#fff" />
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.idUsuario)}>
          <FontAwesome5 name="trash" size={16} color="#fff" />
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )}
/>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Introduce el nombre del usuario"
              value={nombre}
              onChangeText={setNombre}
            />
            <TextInput
              style={styles.input}
              placeholder="Introduce el correo electrónico"
              value={correo}
              onChangeText={setCorreo}
            />
            <TextInput
              style={styles.input}
              placeholder="Introduce el rol"
              value={rol}
              onChangeText={setRol}
            />
            <TouchableOpacity
              style={isEditing ? styles.updateButton : styles.createButton}
              onPress={isEditing ? handleUpdate : handleCreate}
            >
              <Text style={styles.buttonText}>{isEditing ? "Actualizar Usuario" : "Crear Usuario"}</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  userCard: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  userText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  editButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButton: {
    backgroundColor: "#FF4B5C",
    padding: 10,
    borderRadius: 5,
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 5,
  },
  form: {
    marginTop: 20,
    width: "100%",
  },
  input: {
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  createButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  updateButton: {
    backgroundColor: "#FFC107",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
});

export default UsuariosList;
