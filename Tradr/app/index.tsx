import { Text, View, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  return ( 
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "blue",
      }}
    >
      <Text>This is the Index/Home Screen.</Text>
      <Button title="Go to Message Board" onPress={() => router.push("/messageBoard")} />
      <Button title="Go to Sign In" onPress={() => router.push("/signIn")} />
    </View>
    
  );
}
