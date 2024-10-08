import { Text, View } from "react-native";
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
      <Text>This Should become the account info screen.</Text>
    </View>
  );
}