import { Text, StyleSheet, View, Button, Appearance, useColorScheme, Image } from "react-native";
//import { useRouter } from "expo-router";
//import { Link, Stack } from 'expo-router';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import getLocation from './location';
import MyComponent from './settings';

import Swiper from 'react-native-deck-swiper';
import data from './placeholderimage';
import React from 'react'


const Card = ({ card }) => { //creates my card item that takes the card image from the url listed in data array
  return (
    <View style={styles.card}>
      <Image source={{ uri: card.image }} style={styles.cardImage} />
    </View>
  );
};

function IndexScreen() {
  const navigation = useNavigation();
  const { longitude, latitude, errorMsg } = getLocation();
  const [index, setIndex] = React.useState(0);
  const onSwiped = () => { //Creates the swipe function and changes images in stack 
    setIndex((index + 1) % data.length);
  };
  return (
    <View style={styles.container}>
      <Swiper
        cards={data}
        cardIndex={index}
        renderCard={(card) => <Card card={card} />}
        onSwiper={onSwiped} //onSwiped?
        disableBottomSwipe
        disableTopSwipe
        animateOverlayLabelsOpacity //Syling for swipe
        infinite
        overlayLabels={{
          left:
          {
            title: 'Not interested',
            style: {
              label: {
                backgroundColor: 'red',
                color: 'white',
                fontSize: 18
              },
              wrapper: {
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
                marginTop: 20,
                marginLeft: -20
              }
            }
          },
          right: {
            title: 'Interested',
            style: {
              label: {
                backgroundColor: 'green',
                color: 'white',
                fontSize: 18
              },
              wrapper: {
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                marginTop: 20,
                marginLeft: 20
              }
            }

          }
        }}
        r />
      <>
        <View>
          <Text>This was the Index/Home Screen.</Text>
        </View>
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
          }}
        >
<<<<<<< HEAD
          <Button title="Go to Sign In" onPress={() => navigation.navigate('Login')} />
          <Button title="Go to Message Board" onPress={() => navigation.navigate('MessageBoard')} />
          <Button title="Create Listing" onPress={() => navigation.navigate('Listings')} />
          <Button title="Go to Settings" onPress={() => navigation.navigate('Settings')} />
=======
          <Button title="Go to Sign In" onPress={() => router.push("/loginScreen")} />
          <Button title="Go to Message Board" onPress={() => router.push("/messageBoard")} />
          <Button title="Create Listing" onPress={() => router.push("/listing")} />
          <Button title="Go to Settings" onPress={() => router.push("/settings")} />
          <Button title="Go to Account Settings" onPress={() => router.push("/accountSettings")} />
>>>>>>> 78f695865c71fa3f8b95bc4b1003a2e7a2d277c8
        </View>
      </>
    </View>

  );
}

export default IndexScreen;

const styles = StyleSheet.create({ //Styling to get the card to display on page
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    borderRadius: 8,
    shadowRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 0 },
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  cardImage: {
    width: '50%',
    height: '80%',
    resizeMode: 'contain'
  }

});
