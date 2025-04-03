import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Button, Alert } from 'react-native';
import { Camera } from 'lucide-react-native'; // Asegúrate de que esta librería esté instalada y configurada correctamente.

interface envios{
    codigoEscaneado:undefined

}
export default function Envios() {
  const [codigo, setCodigo] = useState(null);

  const handleScan = (codigoEscaneado) => {
    setCodigo(codigoEscaneado);
  };

  const handleEnviar = async () => {
    if (!codigo) {
      Alert.alert('Error', 'Por favor, escanea un código de barras.');
      return;
    }

    // Aquí puedes consumir la API para crear una entrada o lo que necesites.
    try {
      const response = await fetch('http://tu-api-url/entradas/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          codigo,
          // Agrega otros campos según sea necesario
        }),
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert('Éxito', 'Entrada creada correctamente');
      } else {
        Alert.alert('Error', 'Hubo un problema al crear la entrada');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Escanea el código de barras</Text>

      {/* Aquí deberías poner el componente de cámara que permita escanear el código de barras */}
      <Camera onScan={handleScan} />

      <Button title="Enviar" onPress={handleEnviar} />

      {codigo && <Text>Código escaneado: {codigo}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
