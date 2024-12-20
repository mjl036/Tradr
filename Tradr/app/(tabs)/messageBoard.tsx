import { Text, View, Button, SafeAreaView, StyleSheet, Modal, TouchableOpacity, Image, Pressable, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import React, { useEffect, useState } from 'react';
import ChatWindow from '../../chatWindow'
import { FIREBASE_STORAGE } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getDatabase, ref as dbRef, set, onValue, get, DatabaseReference, remove } from 'firebase/database';
import { getAuth } from "firebase/auth";
import { Rating } from 'react-native-ratings';



export default function MessageBoard() {
  const router = useRouter();
  const [userMatches, setUserMatches] = useState([]);

  const auth = getAuth();
  const user = auth.currentUser;
  const db = getDatabase();
  const refDB = dbRef(getDatabase());
  const userUID = user?.uid;
  const retrieveData = () => {

    if (user != null) {
      const matchRef = dbRef(db, `users/${userUID}/matches`);
      const matchSet = [];

      setUserMatches([]);

      onValue(matchRef, async (snapshot) => {
        const matches = snapshot.val();
        if (matches) {
          for (let currentMatch in matches) {
            const data = matches[currentMatch];

            let matchedWithUID = data.listerUserID

            const cardRef = dbRef(db, `users/${userUID}/rightSwipes/${matchedWithUID}`);

            const cardRef2 = dbRef(db, `users/${matchedWithUID}/rightSwipes/${userUID}`);

            const swipeSnapshot = await get(cardRef)
            const swipeSnapshot2 = await get(cardRef2)

            matchSet.push({
              UID: userUID,
              matchUID: matchedWithUID,
              userWant: swipeSnapshot2.val().listingID,
              matchWant: swipeSnapshot.val().listingID
            });
          }
        }
        setUserMatches(matchSet);
      })


    }
  }

  const DisplayCard = ({ UID, matchUID, userWant, matchWant }) => {
    const [settingModal, setSettingModal] = useState(false);
    const [chatModal, setChatModal] = useState(false);
    const [reportModal, setReportModal] = useState(false);
    const [ratingModal, setRatingModal] = useState(false);
    const [rating, setRating] = useState(0)
    const [reportReason, setReportReason] = useState(0)


    const [wantImage, setWantImage] = useState('https://firebasestorage.googleapis.com/v0/b/tradr-app-c2b3a.appspot.com/o/images%2FPlaceHolderTest_1729802771133?alt=media&token=a5539da7-ede6-49ad-a517-970583b92c9d');
    const [wantTitle, setWantTitle] = useState('broken');
    const [wantDesc, setWantDesc] = useState('broken');
    const [offerImage, setOfferImage] = useState('https://firebasestorage.googleapis.com/v0/b/tradr-app-c2b3a.appspot.com/o/images%2FPlaceHolderTest_1729802771133?alt=media&token=a5539da7-ede6-49ad-a517-970583b92c9d');


    const deleteMatch = (matchID) => {

      alert(`users/${UID}/matches/${matchID}`)


      const userRef = dbRef(db, `users/${UID}/matches/${matchID}`);
      const userRef2 = dbRef(db, `users/${matchID}/matches/${UID}`);

      remove(userRef)
      remove(userRef2)

      retrieveData
    }

    useEffect(() => {
      const fetchCardData = async () => {
        const userCardID = dbRef(db, `users/${matchUID}/listings/${userWant}`);
        const matchCardID = dbRef(db, `users/${UID}/listings/${matchWant}`);

        const userWantSnapshot = await get(matchCardID);
        setOfferImage(userWantSnapshot.val()?.imageUrl);

        const matchCardSnapshot = await get(userCardID);
        setWantImage(matchCardSnapshot.val()?.imageUrl);
        setWantTitle(matchCardSnapshot.val()?.title);
        setWantDesc(matchCardSnapshot.val()?.description);

      };
      fetchCardData();
    }, []);

    const report = async (reportReason: string) => {
      alert('Report Submitted');
      /*if (user != null) {
        updateProfile(user, { reports: reportReason });
        update(dbRef(db, `users/${userUID}/profileInfo`), {
            reports: reportReason
        })
        getUserData;
      }*/
      setReportModal(false);
    }

    return (
      <SafeAreaView style={{ padding: 5, alignContent: "center" }}>
        {/* Clickable Card */}
        <TouchableOpacity style={styles.card} onPress={() => setSettingModal(true)}>
          <Text style={styles.cardTitle}>{wantTitle}</Text>
          <Image source={{ uri: wantImage }} style={styles.cardImage} />
          <Text style={styles.cardDescriptionBox}>{wantDesc}</Text>
        </TouchableOpacity>

        {/* Management Screen */}
        <Modal visible={settingModal} animationType="slide">
          <TouchableOpacity style={{ width: 80, height: 25, backgroundColor: 'red', alignSelf: 'baseline', padding: 5 }}
            onPress={() => setSettingModal(false)}>
            <Text> Back Arrow </Text>
          </TouchableOpacity>
          <View style={{ height: '70%' }}>
            <Text style={{ alignSelf: "center", fontSize: 50 }}> OFFER</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'nowrap', flex: 1 }}>
              <Image source={{ uri: wantImage }} style={styles.cardTradeImage} />
              <Text style={{ alignSelf: 'center', fontSize: 25, fontWeight: 'bold' }}>FOR</Text>
              <Image source={{ uri: offerImage }} style={styles.cardTradeImage} />
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={() => setChatModal(true)}>
            <Text style={styles.buttonText}> Open Chat </Text>
          </TouchableOpacity>

          <View style={{ flexDirection: 'column' }}>
            <TouchableOpacity style={styles.button} onPress={() => { deleteMatch(matchUID); setSettingModal(false); setRatingModal(true) }}>
              <Text style={styles.buttonText}> Accept Trade</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => { deleteMatch(matchUID); setSettingModal(false) }}>
              <Text style={styles.buttonText}> Cancel Trade</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setReportModal(true)}>
              <Text style={styles.buttonText}> Report </Text>
            </TouchableOpacity>
          </View>

        </Modal>

        {/* Chat Screen */}
        <Modal visible={chatModal} animationType="slide">
          <TouchableOpacity style={{ width: 50, height: 25, backgroundColor: 'red', alignSelf: 'baseline' }}
            onPress={() => setChatModal(false)}>
            <Text> Close </Text>
          </TouchableOpacity>
          <ChatWindow user={ UID } target={ matchUID }></ChatWindow>
        </Modal>

        {/* Rating Screen */}
        <Modal visible={ratingModal} animationType="slide">
          <TouchableOpacity style={{ width: 50, height: 25, backgroundColor: 'red', alignSelf: 'baseline' }}
            onPress={() => setRatingModal(false)}>
            <Text> Close </Text>
          </TouchableOpacity>
          <View>
            <Rating
              type='star'
              ratingCount={5}
              imageSize={40}
              onFinishRating={(rating) => setRating(rating)}
              style={{ paddingVertical: 10 }}
            />
          <Text>Rating: {rating}</Text>
        </View>
        <TouchableOpacity style={{ width: 92, height: 25, backgroundColor: 'lightblue', alignSelf: 'center' }}
          onPress={() => setRatingModal(false)}>
          <Text> Submit Rating </Text>
        </TouchableOpacity>
        </Modal>

        {/* Reporting Screen */}
        <Modal visible={reportModal} animationType="slide">
          <TouchableOpacity style={{ width: 50, height: 25, backgroundColor: 'red', alignSelf: 'baseline' }}
            onPress={() => setReportModal(false)}>
            <Text> Close </Text>
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Reason for Report"
            onChangeText={setReportReason}
            />
            <TouchableOpacity style={styles.button} onPress={() => report(reportReason)}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </Modal>

      </SafeAreaView>
    );
  };

  useEffect(() => {
    retrieveData();
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'lightblue' }}>
      <View>
        <Text style={{ alignSelf: "center", fontSize: 60, fontWeight: 'bold', borderColor: 'black', borderWidth: 4, alignItems: "center", padding: 10, borderRadius: 20, backgroundColor: 'white' }}>
          MATCHES
        </Text>
      </View>
      <GestureHandlerRootView>
        <SafeAreaView>
          <FlatList data={userMatches} renderItem={({ item }) => <DisplayCard {...item} numColumns={2} />}>

          </FlatList>
        </SafeAreaView>
      </GestureHandlerRootView>
    </SafeAreaView>
  );

}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderWidth: 5,
    borderColor: 'black',
    alignSelf: 'center',
    backgroundColor: 'lightblue'
  },
  image: {
    width: '100%',
    height: '100%',
    flex: 1,
    alignSelf: 'auto',
    borderWidth: 5,
    borderColor: 'black',
  },
  button: {
    backgroundColor: 'white',
    borderColor: 'black',
    width: '80%',
    height: 45,
    borderRadius: 5,
    borderWidth: 2,
    padding: 2,
    alignSelf: 'center',
    marginTop: 10


  },
  buttonText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black'
  },
  modalButton: {
    backgroundColor: 'white',
    borderColor: 'black',
    width: '50%',
    height: 40,
    borderRadius: 5,
    borderWidth: 2,
    padding: 4,
    alignSelf: 'center',
    paddingRight: 5
  },
  modalButtonText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  },
  card: {
    backgroundColor: 'blue',
    padding: 10,
    width: 200,
    height: 350,
    alignContent: 'center',
    borderWidth: 2,
    borderBlockColor: 'black',
    borderRadius: 5
  },
  cardImage: {
    width: '100%',
    height: '75%',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'black',
    padding: 4,
    alignSelf: 'center',
    marginBottom: 4
  },
  cardTradeImage: {
    width: '40%',
    height: '60%',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'black',
    padding: 4,
    alignSelf: 'center',
    marginBottom: 4,
    marginRight: 10,
    marginLeft: 10
  },
  cardDescriptionBox: {
    borderWidth: 2,
    borderBlockColor: 'black',
    borderRadius: 5,
    backgroundColor: 'lightblue',
    width: '100%',
    height: 60,
    fontSize: 10,
    padding: 2

  },
  cardTitle: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 2

  },
  managementButton: {
    backgroundColor: 'white',
    borderColor: 'black',
    width: '50%',
    height: 60,
    borderRadius: 5,
    borderWidth: 2,
    padding: 2,
    alignSelf: 'center'
  },
  fullScreenDescBox: {
    borderWidth: 4,
    borderBlockColor: 'black',
    borderRadius: 5,
    backgroundColor: 'lightblue',
    width: '80%',
    height: 120,
    fontSize: 20,
    padding: 4,
  },
  textInput: {
    height: 50,
    width: "100%",
    borderColor: 'black',
    borderWidth: 3,
    padding: 5,
    backgroundColor: 'lightblue',
    fontSize: 30,
    textAlignVertical: 'top',
    marginTop: 10,
    borderRadius: 5,
    color: 'black',
    fontWeight: 'bold',
  },
});




