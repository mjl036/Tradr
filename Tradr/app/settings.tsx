import { Text, View, Button } from "react-native";
import { useRouter } from "expo-router";
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';
import {Picker} from '@react-native-picker/picker';

// Stuff for dark and light mode button
function MyComponent() {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = React.useState<'light' | 'dark'>(systemColorScheme === 'dark' ? 'dark' : 'light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <SafeAreaView style={theme === 'dark' ? styles.darkContainer : styles.lightContainer}>
      <Text style={theme === 'dark' ? styles.darkText : styles.lightText}>
        Hello, World!
      </Text>
      <Button title="Toggle Dark/Light Mode" onPress={toggleTheme} />
    </SafeAreaView>
  );
}
export default MyComponent;


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