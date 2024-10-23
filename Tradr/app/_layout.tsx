import { Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home Screen" }} />
      <Stack.Screen name="messageBoard" options={{ title: "Message Board" }} />
      <Stack.Screen name="loginScreen" options={{ title: "Log In" }} />
      <Stack.Screen name="settings" options={{ title: "Settings" }} />
      <Stack.Screen name="accountInfo" options={{ title: "Account Information" }} />
      <Stack.Screen name="listing" options={{ title: "Create Listing" }} />
      <Stack.Screen name="accountSettings" options={{ title: "Account Settings" }} />
    </Stack>
  );
}

