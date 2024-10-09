import { Text, View, TextInput, Button } from "react-native";
import React, { useState } from 'react'
import { useRouter } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as ImagePicker from 'expo-image-picker';

const InputExample = () => {
  const [text, setText] = useState('');

  const handleInputChange = (input) => {
    setText(input);
  }

  const handleSubmit = () => {
    alert(`You entered: ${text}`);
  }

  return (
    <View>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 5, padding: 5 }}
        onChangeText={handleInputChange}
        value={text}
      />
      <Button
        title="Submit"
        onPress={handleSubmit}
        
      />
    </View>
  );
};

export default function listing() {
    const router = useRouter();
    
    
    
    
    
    return (
      <View
        style={{
          padding: 10
        }}>
        
        <Text style={{
          backgroundColor: "red",
          fontSize: 48,
          textAlign: "center",
        }}>
          Listing Page 
        </Text>
        <View
        style={{
          padding: 10
        }}>
          <InputExample />
        </View>
      </View>

  );
  
}

