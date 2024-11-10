import { Alert, Text, StyleSheet, View, Image, ImageBackground, StatusBar, SafeAreaView , Button, Modal, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import getLocation from '../location';
import Swiper from 'react-native-deck-swiper';
import data from '../placeholderimage';
import React from 'react';
import { getDatabase, ref as dbRef, onValue, update } from 'firebase/database';
import { signOut, getAuth } from 'firebase/auth';
import { FIREBASE_AUTH } from '@/firebase.js';
import { useState, useEffect } from 'react';
import listing from "./listing";



const Card = ({ card }) => { //creates my card item that takes the card image from the url listed in data array
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <ImageBackground source={{ uri: card.image }} style={styles.cardImage}>
          <View style={styles.textOverlay}>
            <Text style={styles.cardTitle}>{card.title}</Text>
            <Text style={styles.cardDescription}>{card.description}</Text>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

const auth = getAuth();
const user = auth.currentUser;
const db = getDatabase();
const refDB = dbRef(getDatabase());
const userID = user?.uid;
const [profileModalVisible, setProfileModalVisible] = useState(false);

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

  const [allListings, setAllListings] = useState([]);

  function getAllListings() {
    const usersRef = dbRef(db, 'users');
    const currentUserID = auth.currentUser?.uid;
    const imageCards = [];

    onValue(usersRef, (snapshot) => {
      const usersData = snapshot.val();

      for (let userID in usersData) {
        if (userID === currentUserID) {
          // Skip the current user’s listings
          continue;
        }

        const userListings = usersData[userID].listings;
        if (userListings) {
          for (let listingID in userListings) {
            const listing = userListings[listingID];
            if (listing.imageUrl) {
              imageCards.push({
                image: listing.imageUrl,
                title: listing.title,
                description: listing.description,
              });
            }
          }
        }
      }

      setAllListings(imageCards);
    });
  }
  useEffect(() => {
    getAllListings();
  }, []);

  return (
    <SafeAreaView style={styles.container} >
      <Modal animationType="slide" transparent={true} visible={profileModalVisible} onRequestClose={() => {Alert.alert('Testing for purposes.'); setProfileModalVisible(!profileModalVisible);}}>
        <StatusBar backgroundColor={'grey'} barStyle={'dark-content'} />
        <Swiper
          cards={allListings}
          cardIndex={index}
          renderCard={(card) => card ? <Card card={card} /> : null}
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
          />
        <>
        <Button title="View Target Profile">
        </Button>
          <View
            style={{
              flex: 1,
            }}
          >
          </View>
        </>
      </Modal>
      <Button>
        onPress={() => setProfileModalVisible(true)}
        <Text>
          "Open Modal"
        </Text>
      </Button>
    </SafeAreaView >

  );
}

const styles = StyleSheet.create({ //Styling to get the card to display on page
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    width: '95%',
    height:'95%',
    borderRadius: 10,

    shadowRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.50,
    shadowOffset: { width: 0, height: 5 },
  
    elevation:30,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  textOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent overlay
    padding: 10,
    alignItems: 'flex-start',
  },
  cardTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
  },

});
