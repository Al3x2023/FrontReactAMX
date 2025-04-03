import React, { useEffect, useState } from "react";
import { 
  View, Text, ScrollView, ActivityIndicator, RefreshControl, StyleSheet, TouchableOpacity 
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { getSession } from "../services/authService";
import { obtenerResumen, obtenerInventarioBajo, obtenerProductosMasVendidos, obtenerActividadReciente } from "../services/dashboardService";

// Tarjeta con título
const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    {children}
  </View>
);

// Alerta de inventario bajo
const AlertText = ({ children }: { children: React.ReactNode }) => (
  <Text style={styles.alertText}>
    <FontAwesome5 name="exclamation-circle" size={16} color="#FF3B30" /> {children}
  </Text>
);

const HomeScreen = () => {
  const [idSucursal, setIdSucursal] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [resumen, setResumen] = useState<any>(null);
  const [inventarioBajo, setInventarioBajo] = useState([]);
  const [productosMasVendidos, setProductosMasVendidos] = useState([]);
  const [actividadReciente, setActividadReciente] = useState({ ultimas_entradas: [], ultimas_salidas: [] });
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const session = await getSession();
    if (session) {
      setIdSucursal(session.idSucursal);
      const [resumenData, inventarioData, productosData, actividadData] = await Promise.all([
        obtenerResumen(session.idSucursal),
        obtenerInventarioBajo(session.idSucursal),
        obtenerProductosMasVendidos(session.idSucursal),
        obtenerActividadReciente(session.idSucursal),
      ]);
      setResumen(resumenData);
      setInventarioBajo(inventarioData);
      setProductosMasVendidos(productosData);
      setActividadReciente(actividadData);
    }
    setLoading(false);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData().finally(() => setRefreshing(false));
  };

  return (
    <ScrollView 
      style={styles.container} 
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
      ) : (
        <>
          <Card title="📊 Resumen">
            <Text style={styles.resumenText}>Ventas Totales: ${resumen.ventas_totales}</Text>
            <Text style={styles.resumenText}>Ingresos: ${resumen.ingresos_totales}</Text>
            <Text style={styles.resumenText}>Egresos: ${resumen.egresos_totales}</Text>
            <Text style={styles.balanceText}>Balance: ${resumen.balance}</Text>
          </Card>

          <Card title="📦 Inventario Bajo">
            {inventarioBajo.length > 0 ? (
              inventarioBajo.map((item, index) => (
                <AlertText key={index}>
                  {item.nombre} - Stock: {item.stock < 0 ? "¡Agotado!" : item.stock}
                </AlertText>
              ))
            ) : (
              <Text style={styles.emptyText}>No hay productos con inventario bajo.</Text>
            )}
          </Card>

          <Card title="🔥 Productos Más Vendidos">
            {productosMasVendidos.length > 0 ? (
              productosMasVendidos.map((item, index) => (
                <View key={index} style={styles.productContainer}>
                  <FontAwesome5 name="shopping-cart" size={20} color="#007AFF" />
                  <Text style={styles.productText}>
                    {item.nombre} - Vendidos: {item.cantidad}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={styles.emptyText}>No hay productos más vendidos.</Text>
            )}
          </Card>

          <Card title="📅 Actividad Reciente">
            {actividadReciente.ultimas_entradas.length > 0 ? (
              <>
                <Text style={styles.activityTitle}>Últimas Entradas</Text>
                {actividadReciente.ultimas_entradas.map((item, index) => (
                  <Text key={index} style={styles.activityText}>
                    {item.producto} - Cantidad: {item.cantidad} - {item.fecha}
                  </Text>
                ))}
              </>
            ) : (
              <Text style={styles.emptyText}>No hay entradas recientes.</Text>
            )}

            {actividadReciente.ultimas_salidas.length > 0 ? (
              <>
                <Text style={styles.activityTitle}>Últimas Salidas</Text>
                {actividadReciente.ultimas_salidas.map((item, index) => (
                  <Text key={index} style={styles.activityText}>
                    {item.producto} - Cantidad: {item.cantidad} - {item.fecha}
                  </Text>
                ))}
              </>
            ) : (
              <Text style={styles.emptyText}>No hay salidas recientes.</Text>
            )}
          </Card>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
    padding: 20,
  },
  card: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    color: "#007AFF",
  },
  alertText: {
    color: "#FF3B30",
    fontSize: 16,
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  resumenText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  balanceText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#007AFF",
  },
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  productText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#444",
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
    color: "#007AFF",
  },
  activityText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
  emptyText: {
    fontSize: 16,
    color: "#8E8E93",
    marginBottom: 5,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
