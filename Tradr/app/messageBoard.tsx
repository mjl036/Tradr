import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
      <Text>this should be the message board.</Text>
    </View>
  );
}