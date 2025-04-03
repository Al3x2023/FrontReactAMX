import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { MainDrawer } from "./components/MainDrawer";
import { TabsProvider } from "./components/TabsContext";
import LoginScreen from "./screens/LoginScreen";

const Stack = createStackNavigator();

// Componente principal de la aplicación
export default function App() {
  return (
    <TabsProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#0066cc" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          {/* Usamos el Drawer Navigator como componente principal */}
          <Stack.Screen name="Main" component={MainDrawer} />
        </Stack.Navigator>
      </NavigationContainer>
    </TabsProvider>
  );
}
