import { Text, View, TextInput, Button, StyleSheet, Image, ImageBackground, Pressable, Alert } from "react-native";
import React, { useState } from 'react'
import { useRouter } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as ImagePicker from 'expo-image-picker';
import { FIREBASE_STORAGE } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getDatabase, ref as dbRef, set, child, get, onValue, update } from 'firebase/database';
import { getAuth, setPersistence, updateProfile } from "firebase/auth";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { setNativeProps } from "react-native-reanimated";

// https://firebase.google.com/docs/database/web/read-and-write
let loaded = false; // ensures that it only gets the user data when desired

export default function accountSettings() {
    const auth = getAuth();
    const user = auth.currentUser;
    const db = getDatabase();
    const refDB = dbRef(getDatabase());
    const userID = user?.uid;

    const [userName, setUserName] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [userEmail, setUserEmail] = useState('');


    function getUserData() {
        const userRef = dbRef(db, `users/${userID}/profileInfo`);
        loaded = true;
        onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            setUserName(data.name);
            setUserEmail(data.email);
            setProfilePic(data.Profile_Picture);
        })

    }


    if (user != null) {
        if (loaded == false) {
            getUserData();
        }
        //updateProfile(auth.currentUser, { displayName: 'test', null});

        const handlePress = () => {
            alert('test');
            update(dbRef(db, `users/${userID}/profileInfo`), {
                name: 'Victory!'
            })
        }

        return (
            <View style={styles.container}>
                <View style={{ height: '40%' }}>
                    <View>
                        <Text style={styles.title}>Change Username</Text>
                    </View>

                    <Pressable style={styles.button}>
                        <Text>Username: {userName}</Text>

                    </Pressable>

                    <View>
                        <Text style={styles.title}>Change Password</Text>
                    </View>

                    <Pressable style={styles.button}>
                        <Text>Email: {userEmail}</Text>
                    </Pressable>

                    <View>
                        <Text style={styles.title}>Change Something</Text>
                    </View>

                    <Pressable style={styles.button}>

                    </Pressable>

                    <View>
                        <Text style={styles.title}>Change Test</Text>
                    </View>

                    <Pressable style={styles.button} onPress={handlePress}>
                        <Text> This is a test of Pressable</Text>
                    </Pressable>

                </View>
                <View style={{ height: '60%' }}>

                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'darkblue',
        padding: 20,
        flex: 1,
        justifyContent: 'center'
    },
    button: {
        backgroundColor: 'lightblue',
        padding: 2,
        flex: 2,
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 6,
        margin: 5

    },
    title: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white'
    }
});

