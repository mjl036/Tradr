import React, { useState } from 'react'
import { Alert, Text, TextInput, View, KeyboardAvoidingView, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter, Redirect } from 'expo-router';
import { FIREBASE_AUTH, FIREBASE_STORAGE } from '@/firebase.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { getDatabase, set, ref as refDatabase } from 'firebase/database';

//import { NativeStackNavigationProp } from '@react-navigation/native-stack';


const loginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  //const [loading, setLoading] = useState(false)
  const auth = FIREBASE_AUTH;




  //const nav = useNavigation<NativeStackNavigationProp<any>>();
  const router = useRouter();

  const setupData = async () => {
    const db = getDatabase();
    const imageUrl = "https://firebasestorage.googleapis.com/v0/b/tradr-app-c2b3a.appspot.com/o/images%2FPlaceHolderTest_1729802771133?alt=media&token=a5539da7-ede6-49ad-a517-970583b92c9d"


    const user = auth.currentUser;
    const UID = user?.uid;
    const userName = `New_User${Date.now()}`;
    const userEmail = user?.email
    const placeholderImage = imageUrl

    set(refDatabase(db, `users/${UID}/profileInfo`), {
      name: userName,
      UserID: UID,
      email: userEmail,
      Profile_Picture: placeholderImage
    });

  }

  const handleLogin = async () => {
    if (email && password) {
      try {
        const response = await signInWithEmailAndPassword(auth, email, password)
        console.log(response)
        if (response.user) {
          alert('Login Successful!');
          router.replace("/home");
        }
      } catch (e: any) {
        console.log(e);
        Alert.alert('Login failed', e.message);
      }
    }
  }

  const handleSignUp = async () => {
    if (email && password) {
      try {
        const response = await createUserWithEmailAndPassword(auth, email, password)
        // console.log(response)
        if (response.user) {
          alert('Creation Successful');
          setupData();
        }

      } catch (e: any) {
        console.log(e);
        Alert.alert('Registration failed', e.message);
      }
    }
  }

  /*const handleLogout = async () => {
    if (!email && !password) {
      try {
        signOut(auth)
        // Sign-out success
        //console.log("Logged Out");
        alert("Logged Out");
        router.replace("/loginScreen");
      } catch (e: any) {
        console.log(e);
        Alert.alert('Log Out failed', e.message);
      }
    }
  }*/

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default loginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'black',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782f9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonRed: {
    backgroundColor: '#FF0000',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782f9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782f9',
    fontWeight: '700',
    fontSize: 16,
  },
})