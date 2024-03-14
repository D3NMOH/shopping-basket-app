import { Stack } from "expo-router";
import { UserProvider } from "../context/UserProvider";
import { Platform } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import { CartProvider } from "../context/context";
{
  Platform.OS === "android" ? NavigationBar.setPositionAsync("absolute") : "";
}
{
  Platform.OS === "android"
    ? NavigationBar.setBackgroundColorAsync("transparent")
    : "";
}
{
  Platform.OS === "android" ? NavigationBar.setButtonStyleAsync("light") : "";
}

export default function RootStack() {
  return (
    <UserProvider>
      <CartProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="Login" options={{ presentation: "modal" }} />
          <Stack.Screen name="Camera" options={{ presentation: "modal" }} />
          <Stack.Screen name="Cart" options={{ presentation: "modal" }} />
        </Stack>
      </CartProvider>
      <StatusBar style="light" />
    </UserProvider>
  );
}
