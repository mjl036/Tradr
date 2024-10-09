import { Text, View, TextInput, Button, StyleSheet, Image } from "react-native";
import React, { useState } from 'react'
import { useRouter } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as ImagePicker from 'expo-image-picker';

//test
export default function listing() {
  const router = useRouter();
  // Constant Variables to change and store data
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string | null>(null);
  // Get Permission


  const setTitleChange = (input) => {
    setTitle(input);
  }
  const setDescriptionChange = (input) => {
    setDescription(input);
  }

  // Prints out the entered text
  const handleSubmit = () => {
    alert(`You entered: ${title} and ${description}`);
  }

  // Example code from https://docs.expo.dev/versions/latest/sdk/imagepicker/
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: '80%',
      height: '80%',
      borderWidth: 5,
      borderColor: 'black',
      alignSelf: 'center',
    },
    image: {
      width: '100%',
      height: '100%',
      alignSelf: 'auto',
      borderWidth: 5,
      borderColor: 'black',
    },

  });

  return (
    <View style={styles.container}>
      <View style={{ width: '80%', height: '60%', borderWidth: 2, borderColor: 'red', }}>
        {image && <Image source={{ uri: image }} style={styles.image} />}
      </View>
      <Button title="Pick an image from camera roll" onPress={pickImage} />

      <TextInput
        style={{ height: 40, width: "60%", borderColor: 'gray', borderWidth: 5, padding: 5 }}
        onChangeText={setTitleChange}
        value={title}
      />
      <Button
        title="submit"
        onPress={handleSubmit}
      />
    </View>
  );



}


