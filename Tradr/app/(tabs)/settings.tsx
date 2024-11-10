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

const Demo2 = () => {
  const [feelings, setFeelings] = useState([]);
  const [moods, setMoods] = useState([]);

  const moodDropdownRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      setFeelings([
        {title: 'positive', moods: [{title: 'Happy'}, {title: 'lol'}]},
        {title: 'negative', moods: [{title: 'Sad'}, {title: 'Angry'}]},
      ]);
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTxt}>Demo 2</Text>
      </View>
      <View style={{width: 16}} />
      <SelectDropdown
        data={feelings}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
          moodDropdownRef.current.reset();
          setMoods([]);
          setMoods(selectedItem.moods);
          // setTimeout(() => {
          //   moodDropdownRef.current.selectIndex(1);
          // }, 250);
        }}
        renderButton={(selectedItem, isOpen) => {
          return (
            <View style={styles.dropdownButtonStyle}>
              <Text style={styles.dropdownButtonTxtStyle}>{selectedItem?.title || 'Select a feeling'}</Text>
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
              <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
            </View>
          );
        }}
        dropdownStyle={styles.dropdownMenuStyle}
      />
      <View style={{width: 8}} />
      <SelectDropdown
        ref={moodDropdownRef}
        data={moods}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
        renderButton={(selectedItem, isOpen) => {
          return (
            <View style={styles.dropdownButtonStyle}>
              <Text style={styles.dropdownButtonTxtStyle}>{selectedItem?.title || 'Select a mood'}</Text>
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
              <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
            </View>
          );
        }}
        dropdownStyle={styles.dropdownMenuStyle}
      />
      <View style={{width: 16}} />
    </View>
  );
};

export default Demo2;


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
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
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
      flex: 1,
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
      textAlign: 'center',
    },
    dropdownMenuStyle: {
      backgroundColor: '#E9ECEF',
      borderRadius: 8,
      height: 100,
    },
    dropdownItemStyle: {
      width: '100%',
      height: 50,
      flexDirection: 'row',
      paddingHorizontal: 12,
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#B1BDC8',
    },
    dropdownItemTxtStyle: {
      flex: 1,
      fontSize: 18,
      fontWeight: '500',
      color: '#151E26',
      textAlign: 'center',
    },
    dropdownItemIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
});

export default darkModeUI;