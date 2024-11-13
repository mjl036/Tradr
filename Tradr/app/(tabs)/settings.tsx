import { Text, Button } from "react-native";
import React , { Component } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';
import Slider from '@react-native-community/slider';
import { Dropdown } from 'react-native-element-dropdown';
 


export default DropdownComponent;
// This will most likely be updated in the future to be able to change colors of the light and dark mode and texts
const App = () => {

  return (

    <SafeAreaView> 
      <Button 
        title="Toggle Notifications"
      />
      <Text>
      {"{"}slider.value{"}"}
      </Text>
      <Text>
      How far out would you like to see listings?
      </Text>
      <Slider
        style={{width: 350, height: 50}}
        minimumValue={1}
        maximumValue={500}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />
      <Text >
      What minimum rating would you like potential matches to be?
      </Text>
      <Slider
        style={{width: 350, height: 50}}
        minimumValue={0}
        maximumValue={1}
        lowerLimit={0.2}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        step={0.2}
        renderStepNumber='true'
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default App;