import React, { useState } from 'react'
import { Alert, Text, TextInput, View, KeyboardAvoidingView, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from 'expo-router';
//import { NativeStackNavigationProp } from '@react-navigation/native-stack';
//import auth from '@react-native-firebase/auth'
//import db from '@react-native-firebase/database'

const loginScreen = () => {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

//const nav = useNavigation<NativeStackNavigationProp<any>>();
const router = useRouter();

const handleLogin = async () => {
  if (email && password) {
    try{
      const response = await auth().signInWithEmailAndPassword(
        email,
        password
      )

      if(response.user) {
        router.push("/loginScreen");
      }
    } catch (e) {
      Alert.alert("Oops", "Pplease check your form and try again")
    }
  }
}

const handleSignUp = async () => {
  if (email && password) {
    try {
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password
      )

      if(response.user) {
        router.push("/loginScreen")
      }


    } catch (e) {
      Alert.alert("Oops", "Please check your form and try again")
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
                onPress={() => { }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
              onPress={() => { }}
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