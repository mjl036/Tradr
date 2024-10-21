import { Text, StyleSheet, View, Button, Appearance, useColorScheme, Image } from "react-native";
import { useRouter } from "expo-router";
import { Link, Stack } from 'expo-router';
import getLocation from './location';
import MyComponent from './settings';
import Icon from 'react-native-vector-icons/Ionicons';

import Swiper from 'react-native-deck-swiper';
import data from './placeholderimage';
import React from 'react'
import Ionicons from "@expo/vector-icons/Ionicons";


const Card = ({ card }) => { //creates my card item that takes the card image from the url listed in data array
  return (
    <View style={styles.card}>
      <Image source={{ uri: card.image }} style={styles.cardImage} />
    </View>
  );
};

export default function Index() {
  const router = useRouter();
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
        onSwiper={onSwiped}
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
        <View
          style={{ //Maybe also button styles i didnt write these someone please verify that wrote it 
            flex: 1,
          }}
        >

        </View>
        <View
          style={{ //Button styles 
            flex: 0,
            width: "13%",
            height: "22%",
          }}
        >
          <Ionicons.Button name="person-outline" onPress={() => router.push("/loginScreen")} /> 
          <Ionicons.Button name="paper-plane-outline" onPress={() => router.push("/messageBoard")} />
          <Ionicons.Button name="bookmarks-outline" onPress={() => router.push("/listing")} />
          <Ionicons.Button name="cog-outline" onPress={() => router.push("/settings")} />
        </View> 
      </>
    </View> //First one is log in, second message, third listing, fourth settings 

  );
}

const styles = StyleSheet.create({ //Styling to get the card to display on page
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    borderRadius: 30,
    shadowRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 0 },
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  cardImage: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain'
  }

});
