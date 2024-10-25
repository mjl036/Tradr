import { Text, View, Button } from "react-native";
import { useRouter } from "expo-router";
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';


// This will most likely be updated in the future to be able to change colors of the light and dark mode and texts
function darkModeUI() {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = React.useState<'light' | 'dark'>(systemColorScheme === 'dark' ? 'dark' : 'light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    
    <SafeAreaView style={theme === 'dark' ? styles.darkContainer : styles.lightContainer}>
      <Text style={theme === 'dark' ? styles.darkText : styles.lightText}>
        Example Text
      </Text>
      <Button title="Toggle Dark/Light Mode" onPress={toggleTheme} />
    </SafeAreaView>
  );
}
// This is the style sheet for the dark and light modes (above), so don't touch really
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

export default darkModeUI;
