import { Stack } from "expo-router";
import { COLORS } from "../../../styles/constants";
import { View, Button } from "react-native";

export default function MainTabs() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: COLORS.dark,
        },
        headerTitleStyle: {
          color: COLORS.grey,
        },
        headerBackTitleVisible: false,
        headerTintColor: COLORS.grey,
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ title: "Products" }} />
      <Stack.Screen
        name="[id]"
        options={{ title: "Details", presentation: "modal" }}
      />
    </Stack>
  );
}
