import { Alert, Text, StyleSheet, View, Image, ImageBackground, StatusBar, SafeAreaView , Button, Modal, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import getLocation from '../location';
import Swiper from 'react-native-deck-swiper';
import data from '../placeholderimage';
import React from 'react';
import { getDatabase, ref as dbRef, onValue, update, set, get } from 'firebase/database';
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
const db = getDatabase();
const refDB = dbRef(getDatabase());




export default function Index() {
  const router = useRouter();
  const auth = FIREBASE_AUTH;
  const { longitude, latitude, errorMsg } = getLocation();
  const [index, setIndex] = React.useState(0);
  const onSwiped = () => { //Creates the swipe function and changes images in stack 
    setIndex((index + 1) % data.length);
  };
  const user = auth.currentUser;
  const userID = user?.uid;
  const [allListings, setAllListings] = useState([]);
  const [profileModalVisible, setProfileModalVisible] = useState(false);

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
              listingID: listingID,
              userID: userID
              });
            }
          }
        }
      }

      setAllListings(imageCards);
    }, (error) => { console.error("Error fetching listings:",error);
  });
}
useEffect(() => {
  if (user) { 
    getAllListings(); 
  } else { 
    console.log("User not authenticated"); 
  }
},[]);


const checkForMatch = (currentUserID, listerUserID, currentUserListingID, listerListingID) => {
  // Reference to currentUser's rightSwipes on lister's profile
  const currentUserSwipeRef = dbRef(db, `users/${currentUserID}/rightSwipes/${listerUserID}`);
  // Reference to lister's rightSwipes on currentUser's profile
  const listerSwipeRef = dbRef(db, `users/${listerUserID}/rightSwipes/${currentUserID}`);

  // Check if the current user has swiped right on the lister
  get(currentUserSwipeRef).then((snapshot) => {
    if (snapshot.exists()) {
      // Check if the lister has also swiped right on the current user
      get(listerSwipeRef).then((listerSnapshot) => {
        if (listerSnapshot.exists()) {
          // If both users have swiped right, create a match with listing IDs
          createMatch(currentUserID, currentUserListingID, listerUserID, listerListingID);
        } else {
          console.log("Lister has not swiped right on current user");
        }
      });
    } else {
      console.log("Current user has not swiped right on lister");
    }
  });
};
const createMatch = (currentUserID, currentUserListingID, listerUserID, listerListingID) => {
  // Create references for the match under both users
  const matchRefCurrentUser = dbRef(db, `users/${currentUserID}/matches/${listerUserID}`);
  const matchRefLister = dbRef(db, `users/${listerUserID}/matches/${currentUserID}`);

  // Define match data specifically for the current user
  const matchDataCurrentUser = {
    matchedAt: Date.now(),
    status: 'matched',
    currentUserID: currentUserID,            // Our ID (current user perspective)
    listerUserID: listerUserID,              // Other user's ID
  };

  // Define match data specifically for the lister user
  const matchDataLister = {
    matchedAt: Date.now(),
    status: 'matched',
    currentUserID: listerUserID,              // Lister's ID (from their perspective)
    listerUserID: currentUserID,              // Our ID from their perspective
  };

  // Save the match under the current user's node
  set(matchRefCurrentUser, matchDataCurrentUser)
    .then(() => {
      alert("Matched")
      console.log("Match created for current user!");
    })
    .catch((error) => {
      console.error("Error creating match for current user:", error);
    });

  // Save the match under the lister's node
  set(matchRefLister, matchDataLister)
    .then(() => {
      console.log("Match created for lister!");
    })
    .catch((error) => {
      console.error("Error creating match for lister:", error);
    });
};

const handleRightSwipe = (card) => {
  const currentUserID = user?.uid;
  if (!currentUserID) {
    console.error("User is not authenticated");
    return;
  }

  const swipeData = {
    swiperID: currentUserID,
    timestamp: Date.now(),
    listingID: card.listingID, // Store listing ID in data
  };

  // Set swipe under the lister's userID, not the listingID directly
  const swipeRef = dbRef(db, `users/${card.userID}/rightSwipes/${currentUserID}`);
  const currentUserListingRef = dbRef(db, `users/${currentUserID}/listings`);

  get(currentUserListingRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const currentUserListingID = snapshot.val();
        
        // Save the swipe data
        return set(swipeRef, swipeData)
          .then(() => {
            console.log("Right swipe saved successfully!");
            // Call checkForMatch with the retrieved listing ID
            checkForMatch(currentUserID, card.userID, currentUserListingID, card.listingID);
          });
      } else {
        console.error("Listing ID for current user not found.");
      }
    })
    .catch((error) => {
      console.error("Error retrieving current user's listing ID:", error);
    });
};

const onSwipedRight = (index) => {
  const card = allListings[index];
  handleRightSwipe(card);
  };

  return (
    <SafeAreaView style={styles.container} >
      <StatusBar backgroundColor={'grey'} barStyle={'dark-content'} />
          <Swiper
            cards={allListings}
            cardIndex={index}
            renderCard={(card) => card ? <Card card={card} /> : null}
            onSwipedRight={onSwipedRight}
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
        </>
        <View style = {styles.profileModal}>
          <Button
            onPress={() => setProfileModalVisible(true)}
            title="Profile"
          />
        </View>
      <Modal animationType="slide" transparent={false} visible={profileModalVisible} onRequestClose={() => {Alert.alert('Testing for future purposes'); setProfileModalVisible(!profileModalVisible);}}>
        <SafeAreaView style={{ backgroundColor: 'blue' , flex: 1}}>
          <Button
            onPress={() => setProfileModalVisible(!profileModalVisible)}
            title="Back"
          />
        </SafeAreaView>
      </Modal>
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
    height: '100%',
    width: '100%',
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
  profileModal: {
    position: 'absolute',
    top: 80,
    left: 40
  },
  profileModalBackground: {
    backgroundColor: '#ecf0f1'
  }
});


