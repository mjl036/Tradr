import { Text, View, Button } from "react-native";
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
      <Text>this is the message board.</Text>
      <Button title="List a card" onPress={() => router.push("/listing")} />
    </View>
  );
}