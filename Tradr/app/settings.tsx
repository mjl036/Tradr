import { Text, View, Button } from "react-native";
import { useRouter } from "expo-router";


export default function messageBoard() {
    const router = useRouter();
    return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>This Should become the settings tab.</Text>
      <Button title="Go to Account Info" onPress={() => router.push("/accountInfo")} />
      <Button title="Switch UI Mode (Dark/Light)" onPress={() => alert()} />
    </View>
  );
}