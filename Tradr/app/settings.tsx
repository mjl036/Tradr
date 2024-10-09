import { Text, View, Button } from "react-native";
import { useRouter } from "expo-router";
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';

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
      <Button title="Toggle Dark Mode" onPress={toggleTheme} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  lightContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  darkContainer: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightText: {
    color: 'black',
  },
  darkText: {
    color: 'white',
  },
});

export default MyComponent;
