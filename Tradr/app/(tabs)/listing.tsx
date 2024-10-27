import { View, TextInput, Button, StyleSheet, Image, Modal, TouchableOpacity, Text } from "react-native";
import React, { useEffect, useState } from 'react'
import { useRouter } from "expo-router";
import * as ImagePicker from 'expo-image-picker';
import { FIREBASE_STORAGE } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getDatabase, ref as dbRef, set, onValue } from 'firebase/database';
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



  const DisplayCard = ({ id, image, title, description }) => {
    const [settingModal, setSettingModal] = useState(false);
    return (
      <SafeAreaView>
        <TouchableOpacity style={styles.card} onPress={() => setSettingModal(true)}>
          <Text>{title}</Text>
          <Image source={{ uri: image }} style={styles.cardImage} />
          <Text style={styles.cardDescriptionBox}>{description}</Text>
        </TouchableOpacity>
        <Modal visible={settingModal}>
          <TouchableOpacity onPress={() => setSettingModal(false)}>
            <Text> {title} </Text>
          </TouchableOpacity>
        </Modal>
      </SafeAreaView>
    );
  };


  const retrieveData = () => {
    if (user != null) {
      const userRef = dbRef(db, `users/${userUID}/listings`);
      const cardSet = [];

      onValue(userRef, (snapshot) => {
        const storedListing = snapshot.val();

        if (storedListing) {
          for (let listingID in storedListing) {
            const listing = storedListing[listingID];

            if (listing.imageUrl) {
              cardSet.push({
                id: listingID,
                image: listing.imageUrl,
                title: listing.title,
                description: listing.description,

              });
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


  useEffect(() => {
    retrieveData();
  }, [])

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.container}>
        <View style={{ height: '90%', alignContent: 'center' }}>

          <FlatList data={userListings} style={{ rowGap: 2, }} numColumns={2} renderItem={({ item }) => <DisplayCard {...item} />}>

          </FlatList>

          <Modal style={{ alignContent: 'center', alignSelf: 'center' }} visible={listingModalVisible} animationType='slide' onRequestClose={() => setListingModalVisible(false)}>
            <View style={{ width: '80%', height: '60%', borderWidth: 2, borderColor: 'blue', flex: 1 }}>
              <Button title="Pick an image from camera roll" onPress={pickImage} />
              <Button title="Take a picture" onPress={takePicture} />
              {image && <Image source={{ uri: image }} style={styles.image} />}

            </View>



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

            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={styles.modalButton} onPress={handleSubmit}>
                <Text style={styles.modalButtonText}> Submit </Text>
              </TouchableOpacity >

              <TouchableOpacity style={styles.modalButton} onPress={() => setListingModalVisible(false)}>
                <Text style={styles.modalButtonText}> Cancel </Text>
              </TouchableOpacity>

            </View>
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
    alignSelf: 'center'


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
    width: 150,
    height: 280,
    alignContent: 'center',
    borderWidth: 2,
    borderBlockColor: 'black',
    borderRadius: 5
  },
  cardImage: {
    width: 120,
    height: 180
  },
  cardDescriptionBox: {
    borderWidth: 2,
    borderBlockColor: 'black',
    borderRadius: 5,
    backgroundColor: 'lightblue'
  },
  cardTitle: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold'
  }

});

