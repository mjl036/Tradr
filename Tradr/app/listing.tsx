import { Text, View, TextInput, Button, StyleSheet, Image, ImageBackground, TouchableOpacity } from "react-native";
import React, { useState } from 'react'
import { useRouter } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as ImagePicker from 'expo-image-picker';
import { FIREBASE_STORAGE } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getDatabase, ref as dbRef, set } from 'firebase/database';
import { getAuth } from "firebase/auth";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function listing() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const auth = getAuth();


  const ListingSeriesDropdown = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    
    const listingSeries = ['Option 1', 'Option 2', 'Option 3']; // Your dropdown options

    const toggleDropdown = () => {
      setDropdownVisible((prev) => !prev);
    };

    const handleSelect = (item) => {
      setSelectedItem(item);
      setDropdownVisible(false); // Close dropdown after selection
    };

    return (
      <View style={styles.container}>
        <Button title="Open Dropdown" onPress={toggleDropdown} />
        
        {dropdownVisible && (
          <View style={styles.dropdown}>
            {listingSeries.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => handleSelect(item)} style={styles.option}>
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        
        {selectedItem && (
          <Text style={styles.selectedText}>Selected: {selectedItem}</Text>
        )}
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    dropdown: {
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      position: 'absolute',
      top: 50, // Adjust as needed
      backgroundColor: 'white',
      zIndex: 1000,
    },
    option: {
      padding: 10,
    },
    optionText: {
      color: 'black',
    },
    selectedText: {
      marginTop: 10,
      fontSize: 16,
    },
  });

export default ListingSeriesDropdown;


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


    await uploadBytes(storageRef, blob,);
    const imageUrl = await getDownloadURL(storageRef);
    const cardData = { userUID, title, description, imageUrl };
    resetFields();
    await set(listingRef, cardData);

    alert('Listing submitted!');
    router.push("../");
  }

  return (

    <View style={styles.container}>
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


