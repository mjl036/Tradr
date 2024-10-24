import React, { useState } from 'react'
import { Alert, Text, TextInput, View, KeyboardAvoidingView, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from 'expo-router';
import { FIREBASE_AUTH } from '@/firebase.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
//import { NativeStackNavigationProp } from '@react-navigation/native-stack';


const loginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  //const [loading, setLoading] = useState(false)
  const auth = FIREBASE_AUTH;

  //const nav = useNavigation<NativeStackNavigationProp<any>>();
  const router = useRouter();

  const handleLogin = async () => {
    if (email && password) {
      try {
        const response = await signInWithEmailAndPassword(auth, email, password)
        console.log(response)
        if (response.user) {
          alert('Login Successful!');
          router.push("./index");
        }
      } catch (e: any) {
        console.log(e)
        Alert.alert('Login failed', e.message)
      }
    }
  }

  const handleSignUp = async () => {
    if (email && password) {
      try {
        const response = await createUserWithEmailAndPassword(auth, email, password)
        // console.log(response)
        if (response.user) {
          alert("Registration Successful!")
        }

      } catch (e: any) {
        console.log(e)
        Alert.alert('Registration failed', e.message)
      }
    }
  }

  const handleLogout = async () => {
    if (!email && !password) {
      try {
        signOut(auth)
        // Sign-out success
        //console.log("Logged Out");
        alert("Logged Out");
        router.push("/loginScreen")
      } catch (e: any) {
        console.log(e)
        Alert.alert('Log Out failed', e.message)
      }
    }
  }

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
        <TouchableOpacity
          onPress={handleLogout}
          style={styles.buttonRed}
        >
          <Text style={styles.buttonText}>Sign Out</Text>
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
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
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