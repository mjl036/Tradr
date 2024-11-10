import { Text, Button } from "react-native";
import React , { Component } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';
import Slider from '@react-native-community/slider';
import SelectDropdown from 'react-native-select-dropdown';
 

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
        minimumValue={1}
        maximumValue={500}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        renderStepNumber='true'
      />
      <Text style={theme === 'dark' ? styles.darkText : styles.lightText}>
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
      <Text style={theme === 'dark' ? styles.darkText : styles.lightText}>
        Example Text
      </Text>
      <Button title="Toggle Dark/Light Mode" onPress={toggleTheme} />
    </SafeAreaView>
  );
}

const Demo = () => {
  const emojisWithIcons = [
    {title: 'happy', icon: 'emoticon-happy-outline'},
    {title: 'cool', icon: 'emoticon-cool-outline'},
    {title: 'lol', icon: 'emoticon-lol-outline'},
    {title: 'sad', icon: 'emoticon-sad-outline'},
    {title: 'cry', icon: 'emoticon-cry-outline'},
    {title: 'angry', icon: 'emoticon-angry-outline'},
    {title: 'confused', icon: 'emoticon-confused-outline'},
    {title: 'excited', icon: 'emoticon-excited-outline'},
    {title: 'kiss', icon: 'emoticon-kiss-outline'},
    {title: 'devil', icon: 'emoticon-devil-outline'},
    {title: 'dead', icon: 'emoticon-dead-outline'},
    {title: 'wink', icon: 'emoticon-wink-outline'},
    {title: 'sick', icon: 'emoticon-sick-outline'},
    {title: 'frown', icon: 'emoticon-frown-outline'},
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTxt}>Demo</Text>
      </View>
      <SelectDropdown
        data={emojisWithIcons}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
        renderButton={(selectedItem, isOpen) => {
          return (
            <View style={styles.dropdownButtonStyle}>
              {selectedItem && <Icon name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />}
              <Text style={styles.dropdownButtonTxtStyle}>
                {(selectedItem && selectedItem.title) || 'Select your mood'}
              </Text>
              <Icon name={isOpen ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
            </View>
          );
        }}
        renderItem={(item, index, isSelected) => {
          return (
            <View
              style={{
                ...styles.dropdownItemStyle,
                ...(isSelected && {backgroundColor: '#D2D9DF'}),
              }}>
              <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
              <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
      />
    </View>
  );
};

export default Demo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 100,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingTop: 90,
  },
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 90,
    backgroundColor: '#E9ECEF',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 16,
  },
  headerTxt: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#151E26',
  },
  dropdownButtonStyle: {
    width: 200,
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});

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
