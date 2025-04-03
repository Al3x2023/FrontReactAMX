import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import UsuariosScreen from "../screens/UsuariosScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Tab = createBottomTabNavigator();

// Componente para la barra de tabs
export function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 70,
          backgroundColor: "#0066cc",
          borderTopWidth: 0,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#d3d3d3",
        tabBarLabelStyle: { fontSize: 14, fontWeight: "600" },
        tabBarIconStyle: { marginTop: 5 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome5 name="home" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Usuarios"
        component={UsuariosScreen}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome5 name="users" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome5 name="user" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome5 name="cogs" size={24} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
