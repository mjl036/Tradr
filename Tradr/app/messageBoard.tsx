import { Text, View, Button, SafeAreaView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React from 'react';
import ChatWindow from '../chatWindow'
import { FIREBASE_STORAGE } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getDatabase, ref as dbRef, set } from 'firebase/database';
import { getAuth } from "firebase/auth";


const MessageBoardScreen = () => {
    const auth = getAuth();

    const GetUser = async () => {
        var user = auth.currentUser;
        var userID = await user?.getIdToken();
    }


    return (

        <SafeAreaView style={{ flex: 1, }}>
            <ChatWindow user={{ _userID: 1 }} target={{ _userID: 1 }} />
        </SafeAreaView>
    );
}
export default MessageBoardScreen;

