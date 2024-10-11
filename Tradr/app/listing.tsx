import { Text, View, TextInput, Button, StyleSheet, Image, ImageBackground } from "react-native";
import React, { useState } from 'react'
import { useRouter } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as ImagePicker from 'expo-image-picker';
import { FIREBASE_STORAGE } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getDatabase, ref as dbRef, set } from 'firebase/database';

export default function listing() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const setTitleChange = (input) => {
    setTitle(input);
  }

  const setDescriptionChange = (input) => {
    setDescription(input);
  }


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

  const handleSubmit = async () => {
    if (!image || !title || !description) {
      alert('Missing Image, Title, or Description');
      return;
    }

    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const imageFileName = `${title.replace(/\s+/g, '')}${Date.now()}`;
      const storageRef = ref(FIREBASE_STORAGE, `images/${imageFileName}`)
      const db = getDatabase();
      const listingRef = dbRef(db, 'listings/' + imageFileName)

      await uploadBytes(storageRef, blob,)
      const imageUrl = await getDownloadURL(storageRef)

      const cardData = { title, description, imageUrl, };

      await set(listingRef, cardData);
      setTitle('');
      setDescription('');
      setImage(null);
      alert('Listing submitted successfully!');
    } catch (error) {
      console.error("Upload Failed:", error);
    }
  }
  return (
    <View style={styles.container}>
      <View style={{ width: '80%', height: '60%', borderWidth: 2, borderColor: 'red' }}>
        {image && <Image source={{ uri: image }} style={styles.image} />}
      </View>
      <Button title="Pick an image from camera roll" onPress={pickImage} />

      <TextInput
        style={{ height: 40, width: "60%", borderColor: 'gray', borderWidth: 5, padding: 5, backgroundColor: 'lightgrey', fontSize: 24 }}
        onChangeText={setTitleChange}
        value={title}
        placeholder="Enter Title"
      />
      <TextInput
        style={{ height: 120, width: "60%", borderColor: 'gray', borderWidth: 5, padding: 5, backgroundColor: 'lightgrey', fontSize: 12 }}
        onChangeText={setDescription}
        value={description}
        placeholder="Enter Description"
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
    backgroundColor: 'blue'
  },
  image: {
    width: '100%',
    height: '100%',
    alignSelf: 'auto',
    borderWidth: 5,
    borderColor: 'black',
  },
  button: {
    width: 20,
    height: 20,
    backgroundColor: 'white',
  }

});


