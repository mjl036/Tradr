import { View, TextInput, Button, StyleSheet, Image, Modal, TouchableOpacity, Text } from "react-native";
import React, { useEffect, useState } from 'react'
import { useRouter } from "expo-router";
import * as ImagePicker from 'expo-image-picker';
import { FIREBASE_STORAGE } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getDatabase, ref as dbRef, set, onValue, remove } from 'firebase/database';
import { getAuth } from "firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";

export default function listing() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [userListings, setUserListings] = useState([]);
  const [listingModalVisible, setListingModalVisible] = useState(false);

  const auth = getAuth();
  const user = auth.currentUser;
  const db = getDatabase();
  const refDB = dbRef(getDatabase());
  const userUID = user?.uid;



  // documentation https://docs.expo.dev/versions/latest/sdk/imagepicker
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: false,
      aspect: [9, 16],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: false,
      cameraType: ImagePicker.CameraType.front,
      aspect: [9, 16],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const resetFields = () => {
    setTitle('');
    setDescription('');
    setImage(null);
  }



  const DisplayCard = ({ cardName, image, title, description }) => {
    const [settingModal, setSettingModal] = useState(false);
    const cardID = cardName;
    return (
      <SafeAreaView style={{ padding: 5, alignContent: "center" }}>

        <TouchableOpacity style={styles.card} onPress={() => setSettingModal(true)}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Image source={{ uri: image }} style={styles.cardImage} />
          <Text style={styles.cardDescriptionBox}>{description}</Text>
        </TouchableOpacity>

        <Modal visible={settingModal} animationType="slide">

          <SafeAreaView style={{ backgroundColor: 'blue' }}>
            <View style={{ height: '90%', alignItems: 'center' }}>
              <Text style={{ fontSize: 90, color: 'white' }}>{title}</Text>
              <Image source={{ uri: image }} style={{ width: '80%', height: '70%', marginBottom: 20, borderColor: 'black', borderWidth: 6, borderRadius: 20 }} />
              <Text style={styles.fullScreenDescBox}>{description}</Text>
            </View>


            <View style={{ flexDirection: 'row', height: '10%' }}>
              <TouchableOpacity onPress={() => setSettingModal(false)} style={styles.managementButton}>
                <Text style={styles.buttonText}> Exit </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { DeleteCard(cardID); setSettingModal(false) }} style={styles.managementButton}>
                <Text style={styles.buttonText}>Delete Card</Text>
              </TouchableOpacity>
            </View>

          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    );
  };

  const DeleteCard = (cardName) => {
    const userRef = dbRef(db, `users/${userUID}/listings/${cardName}`);
    remove(userRef);
    retrieveData();
  }

  const retrieveData = () => {
    if (user != null) {
      const userRef = dbRef(db, `users/${userUID}/listings`);
      const cardSet = [];
      setUserListings([]);

      onValue(userRef, (snapshot) => {
        const storedListing = snapshot.val();

        if (storedListing) {
          for (let listingID in storedListing) {
            const listing = storedListing[listingID];

            if (listing.imageUrl) {

              cardSet.push({

                cardName: listingID,
                image: listing.imageUrl,
                title: listing.title,
                description: listing.description,

              });
              console.log('ListingID:', listingID);
            }
          }
        }
        setUserListings(cardSet);
      })
    }
  }

  const handleSubmit = async () => {
    if (!image || !title || !description) {
      alert('Missing Image, Title, or Description');
      return;
    }

    var user = auth.currentUser;
    var userUID = user?.uid
    var userEmail = user?.email;


    if (userUID == null) {
      alert('Not Logged In, cant submit');
      return;
    }

    const response = await fetch(image);
    const blob = await response.blob();
    const imageFileName = `${title}${'_'}${Date.now()}`; // title.replace(/\s+/g, '')}${Date.now(); this is name scheme, currently testing with simple name as to link it to an account instead
    const storageRef = ref(FIREBASE_STORAGE, `images/${imageFileName}`);
    const db = getDatabase();
    const listingRef = dbRef(db, `users/${userUID}/listings/` + imageFileName);
    const globalListingRef = dbRef(db, `activeListings/` + imageFileName)


    await uploadBytes(storageRef, blob,);
    const imageUrl = await getDownloadURL(storageRef);
    const cardData = { userUID, title, description, imageUrl };

    resetFields();
    await set(listingRef, cardData);
    //await set(globalListingRef, cardData);

    alert('Listing submitted!');
    retrieveData();
    setListingModalVisible(false);
  }


  useEffect(() => { retrieveData(); }, [])

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.container}>
        <View style={{ height: '90%', width: '100%', alignContent: 'center' }}>

          <FlatList data={userListings} style={{ rowGap: 10, borderWidth: 5, borderRadius: 5, borderColor: 'black', padding: 3, width: '100%', alignContent: 'center' }}
            numColumns={2} renderItem={({ item }) => <DisplayCard {...item} />}>

          </FlatList>

          <Modal style={{}} visible={listingModalVisible} animationType='slide' onRequestClose={() => setListingModalVisible(false)}>

            <SafeAreaView style={{ alignItems: 'center', backgroundColor: 'lightblue', height: '100%' }}>

              <View style={{ width: '95%', height: '60%', alignSelf: 'center', alignItems: "center", borderColor: 'black', borderWidth: 6, marginTop: 10, marginBottom: 60, borderRadius: 20, backgroundColor: 'blue' }}>
                <Image source={{ uri: image }} style={{ width: '80%', height: '90%', marginBottom: 10, borderColor: 'black', borderWidth: 6, borderRadius: 20 }} />
                <View style={{ flexDirection: 'row', }}>
                  <TouchableOpacity style={styles.modalButton} onPress={pickImage}>
                    <Text style={styles.modalButtonText}> Pick from storage </Text>
                  </TouchableOpacity >

                  <TouchableOpacity style={styles.modalButton} onPress={takePicture}>
                    <Text style={styles.modalButtonText}> Take a picture </Text>
                  </TouchableOpacity >
                </View>
              </View>
              <Text style={styles.cardTitle}>ENTER INPUTS</Text>
              <TextInput
                style={{ height: 40, width: "60%", borderColor: 'gray', borderWidth: 5, padding: 5, backgroundColor: 'lightgrey', fontSize: 24, marginTop: 10 }}
                onChangeText={setTitle}
                value={title}
                placeholder="Enter Title"

              />

              <TextInput
                style={{ height: 120, width: "60%", borderColor: 'gray', borderWidth: 5, padding: 5, backgroundColor: 'lightgrey', fontSize: 12, textAlignVertical: 'top', marginTop: 10 }}
                onChangeText={setDescription}
                value={description}
                placeholder="Enter Description"
                multiline={true}
              />

              <View style={{ flexDirection: 'row', height: '10%' }}>
                <TouchableOpacity style={styles.modalButton} onPress={handleSubmit}>
                  <Text style={styles.modalButtonText}> Submit </Text>
                </TouchableOpacity >

                <TouchableOpacity style={styles.modalButton} onPress={() => setListingModalVisible(false)}>
                  <Text style={styles.modalButtonText}> Cancel </Text>
                </TouchableOpacity>

              </View>
            </SafeAreaView>
          </Modal>

        </View>
        <View style={{ flex: 1, alignSelf: 'center', width: '100%' }}>
          <TouchableOpacity style={styles.button} onPress={() => setListingModalVisible(true)}>
            <Text style={styles.buttonText}>Create New Listing</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>


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
    height: 60,
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


});

