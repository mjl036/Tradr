import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home Screen" }} />
      <Stack.Screen name="messageBoard" options={{ title: "Message Board" }} />
      <Stack.Screen name="signIn" options={{ title: "Sign In" }} />
      <Stack.Screen name="settings" options={{ title: "Settings" }} />
      <Stack.Screen name="accountInfo" options={{ title: "Account Information" }} />
    </Stack>
  );
}
