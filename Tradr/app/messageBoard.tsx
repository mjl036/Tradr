import { Text, View, Button, SafeAreaView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React from 'react';
import ChatWindow from '../chatWindow'


const MessageBoard = () => {
    return (

        <SafeAreaView style={{ flex: 1, }}>
            <ChatWindow user={{ _userID: 1 }} target={{ _userID: 1 }} />
        </SafeAreaView>
    );
}
export default MessageBoard;

