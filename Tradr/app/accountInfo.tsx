import React, { useState } from 'react'
import { Alert, Text, TextInput, View, KeyboardAvoidingView, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from 'expo-router';
import { FIREBASE_AUTH } from '@/firebase.js';


const accountInfo = () => {
  const auth = FIREBASE_AUTH;

  /*const updatePass = async () => {
    if (password) {
      try {
        const response = await updatePassword(auth, email, password)
        console.log(response)
        if(response.user) {
          router.push("/loginScreen")
        }
  
      } catch (e: any) {
        console.log(e)
        Alert.alert('Registration failed', e.message)
      }
    }
  }
  */
  const router = useRouter();
  return (
    <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
    >
          <TextInput
            placeholder="New Password"
            value={''}
            onChangeText={() => { }}
            style={styles.input}
            secureTextEntry
          />
        <View>
          <TouchableOpacity
          onPress={() => { }}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Change Password</Text>
        </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
)
}

export default accountInfo

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