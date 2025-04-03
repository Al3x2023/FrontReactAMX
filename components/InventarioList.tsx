import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet } from "react-native";
import { getInventarios, actualizarStock } from "../services/inventarioService"
interface InventarioItem {
  idProducto: number;
  idSucursal: number;
  stock: number;
}

interface Props {
  idSucursal: number;
}

const InventarioList: React.FC<Props> = ({ idSucursal }) => {
  const [inventarios, setInventarios] = useState<InventarioItem[]>([]);
  const [cantidad, setCantidad] = useState<string>("");

  useEffect(() => {
    const fetchInventarios = async () => {
      try {
        const data = await getInventarios(idSucursal);
        setInventarios(data);
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    };
    fetchInventarios();
  }, [idSucursal]);

  const handleUpdateStock = async (idProducto: number) => {
    if (!cantidad || isNaN(Number(cantidad))) {
      Alert.alert("Error", "La cantidad debe ser un número válido.");
      return;
    }

    try {
      const data = await actualizarStock(idProducto, idSucursal, Number(cantidad));
      Alert.alert("Éxito", "Stock actualizado correctamente.");
      setInventarios((prev) =>
        prev.map((item) =>
          item.idProducto === idProducto ? { ...item, stock: item.stock + Number(cantidad) } : item
        )
      );
      setCantidad("");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={inventarios}
        keyExtractor={(item) => item.idProducto.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>Producto ID: {item.idProducto}</Text>
            <Text style={styles.text}>Stock actual: {item.stock}</Text>
            <TextInput
              style={styles.input}
              placeholder="Cantidad a actualizar"
              keyboardType="numeric"
              value={cantidad}
              onChangeText={setCantidad}
            />
            <Button title="Actualizar Stock" onPress={() => handleUpdateStock(item.idProducto)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  item: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default InventarioList;
