import { Text, StyleSheet, View, Button, Appearance, useColorScheme } from "react-native";
import { useRouter } from "expo-router";
import getLocation from './location';

export default function Index() {
  const router = useRouter(); 
  const { longitude, latitude, errorMsg} = getLocation();
  return ( 
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: useColorScheme,
      }}
    >
      <Text>This is the Index/Home Screen.</Text>
      <Button title="Go to Message Board" onPress={() => router.push("/messageBoard")} />
      <Button title="Go to Sign In" onPress={() => router.push("/signIn")} />
      <Button title="Go to Settings" onPress={() => router.push("/settings")} />
    </View>
    
  );
}
