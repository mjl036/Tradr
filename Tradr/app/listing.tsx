import { Text, View, TextInput, Button, StyleSheet, Image, ImageBackground } from "react-native";
import React, { useState } from 'react'
import { useRouter } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as ImagePicker from 'expo-image-picker';
import { FIREBASE_STORAGE } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getDatabase, ref as dbRef, set } from 'firebase/database';
import { getAuth } from "firebase/auth";

export default function listing() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [userID, setUserID] = useState('');
  const auth = getAuth();



  // Example code from https://docs.expo.dev/versions/latest/sdk/imagepicker
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
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

  const handleSubmit = async () => {
    if (!image || !title || !description) {
      alert('Missing Image, Title, or Description');
      return;
    }

    var user = auth.currentUser;
    var userID = await user?.getIdToken();
    alert(userID);

    const response = await fetch(image);
    const blob = await response.blob();
    const imageFileName = `${title}`;
    const storageRef = ref(FIREBASE_STORAGE, `images/${imageFileName}`)  // title.replace(/\s+/g, '')}${Date.now(); this is name scheme, currently testing
    const db = getDatabase();
    const listingRef = dbRef(db, 'listings/' + imageFileName)


    await uploadBytes(storageRef, blob,)
    const imageUrl = await getDownloadURL(storageRef)
    const cardData = { userID, title, description, imageUrl };
    resetFields();
    await set(listingRef, cardData);

    alert('Listing submitted!');
    router.push("../");
  }

  return (
    <View style={styles.container}>
      <View style={{ width: '80%', height: '60%', borderWidth: 2, borderColor: 'blue', flex: 1 }}>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
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

      <Button
        title="submit"
        onPress={handleSubmit}
        color='black'
      />
    </View>
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
});


