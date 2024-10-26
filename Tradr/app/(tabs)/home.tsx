import { Alert, Text, StyleSheet, View, Image, StatusBar } from "react-native";
import { useRouter } from "expo-router";
import getLocation from '../location';
import Swiper from 'react-native-deck-swiper';
import data from '../placeholderimage';
import React from 'react'
import { FIREBASE_AUTH } from '@/firebase.js';
import { SafeAreaView } from "react-native-safe-area-context";
import { getDatabase, ref as dbRef, onValue, update } from 'firebase/database';
import { getAuth } from "firebase/auth";

const Card = ({ card }) => { //creates my card item that takes the card image from the url listed in data array
  return (
    <View style={styles.card}>
      <Image source={{ uri: card.image }} style={styles.cardImage} />
    </View>
  );
};

const auth = getAuth();
const user = auth.currentUser;
const db = getDatabase();
const refDB = dbRef(getDatabase());
const userID = user?.uid;

const updateLocation = () => {
  update(dbRef(db, `users/${userID}/profileInfo`), {

  })
}


export default function Index() {
  const router = useRouter();
  const auth = FIREBASE_AUTH;
  const { longitude, latitude, errorMsg } = getLocation();
  const [index, setIndex] = React.useState(0);
  const onSwiped = () => { //Creates the swipe function and changes images in stack 
    setIndex((index + 1) % data.length);
  };

  const handleLogout = () => {
    try {
      signOut(auth)
      // Sign-out success
      //console.log("Logged Out");
      alert("Logged Out");
      router.replace("/loginScreen");
    } catch (e: any) {
      console.log(e);
      Alert.alert('Log Out failed', e.message);
    }
  }


  return (
    <SafeAreaView style={styles.container} >
      <StatusBar backgroundColor={'grey'} barStyle={'dark-content'} />
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

        </View>

      </>
    </SafeAreaView >

  );
}

const styles = StyleSheet.create({ //Styling to get the card to display on page
  container: {
    flex: 1,
    backgroundColor: 'black',
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
