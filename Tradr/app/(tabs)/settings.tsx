import { Text, Button } from "react-native";
import React , { Component } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';
import Slider from '@react-native-community/slider';
import { Dropdown } from 'react-native-material-dropdown-v2-fixed';
 

// This will most likely be updated in the future to be able to change colors of the light and dark mode and texts
function darkModeUI() {
  
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = React.useState<'light' | 'dark'>(systemColorScheme === 'dark' ? 'dark' : 'light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };
  
  return (

    <SafeAreaView style={theme === 'dark' ? styles.darkContainer : styles.lightContainer}>
        
      <Button title="Toggle Notifications">

      </Button>
      <Text style={theme === 'dark' ? styles.darkText : styles.lightText}>
      How far out would you like to see listings?
      </Text>
      <Slider
        style={{width: 350, height: 50}}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />
      <Text style={theme === 'dark' ? styles.darkText : styles.lightText}>
      What minimum rating would you like potential matches to be?
      </Text>
      <Slider
        style={{width: 350, height: 50}}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        step={20}
      />
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
