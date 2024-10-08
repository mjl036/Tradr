import { Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

export default function RootLayout() {
  return (
  <Stack>
    <Stack.Screen name="(tabs)" options ={{headerShown: false}} />
    <Stack.Screen name="index" options={{ title: "Home Screen", headerShown: false }} />
    <Stack.Screen name="messageBoard" options={{ title: "Message Board", gestureEnabled: true, headerShown: false }} />
  </Stack>
  )
}

