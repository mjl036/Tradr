import { Text, View } from "react-native";

export default function SignIn() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>This Should become the default screen.</Text>
      <Text>And require a sign in, of course.</Text>
    </View>
  );
}