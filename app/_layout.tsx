import { Stack } from "expo-router";

import "../global.css";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShadowVisible: false, headerStyle: {} }}>
      <Stack.Screen name="index" options={{ headerTitle: "" }} />
    </Stack>
  );
}
