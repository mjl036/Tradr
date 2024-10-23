import { Text, View, TextInput, Button, StyleSheet, Image, ImageBackground } from "react-native";
import React, { useState } from 'react'
import { useRouter } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as ImagePicker from 'expo-image-picker';
import { FIREBASE_STORAGE } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getDatabase, ref as dbRef, set } from 'firebase/database';
import { getAuth, setPersistence, updateProfile } from "firebase/auth";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function accountSettings() {
    const auth = getAuth();
    const user = auth.currentUser;
    const userID = user?.getIdToken();
    const userName = user?.displayName;
    const userUID = user?.uid;
    //updateProfile(auth.currentUser, { displayName: 'test', null});



    return (
        <View style={styles.container}>
            <View style={{ height: '40%' }}>
                <View style={styles.containerSettings}>
                    <Text>Username {userName}</Text>

                </View>
                <View style={styles.containerSettings}>
                    <Text>UID {userUID}</Text>
                </View>
                <View style={styles.containerSettings}>

                </View>
                <View style={styles.containerSettings}>

                </View>
            </View>
            <View style={{ height: '60%' }}>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lightblue',
        padding: 20,
        flex: 1,
        justifyContent: 'center'
    },
    containerSettings: {
        backgroundColor: 'grey',
        padding: 2,
        flex: 2,
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 6,
        margin: 5

    }
});

