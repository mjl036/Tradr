import { Text, StyleSheet, View, Button, Appearance, useColorScheme } from "react-native";
import { useRouter } from "expo-router";
import { Link, Stack } from 'expo-router';
import getLocation from './location';
import MyComponent from './settings';

MyComponent();

export default function Index() {
  const router = useRouter();
  const { longitude, latitude, errorMsg } = getLocation();
  return (
    <SafeAreaView style={theme === 'dark' ? styles.darkContainer : styles.lightContainer}>
      <Text style={theme === 'dark' ? styles.darkText : styles.lightText}>
        Example Text
      </Text>
      <Button title="Toggle Dark/Light Mode" onPress={toggleTheme} />
    </SafeAreaView>
  );
  return (
    <View
    
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: useColorScheme,

        
      }}
    >
      <Text>This was the Index/Home Screen.</Text>
      <View
        style={{
          flex: 1,

        }}
      >

      </View>
      <View
        style={{
          flex: 1,
          width: "80%",
          height: "80%",
          backgroundColor: "black,"
        }}
      >
        <Button title="Go to Message Board" onPress={() => router.push("/messageBoard")} />
        <Button title="Go to Log In" onPress={() => router.push("/loginScreen")} />
        <Button title="Go to Settings" onPress={() => router.push("/settings")} />
        <Button title="Create Listing" onPress={() => router.push("/listing")} />
      </View>
    </View>

  );
}
