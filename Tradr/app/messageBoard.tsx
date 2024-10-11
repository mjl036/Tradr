import { Text, View, Button, SafeAreaView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React from 'react';
import Chat from '../chat'


const messageBoard = () => {
    return (
        <SafeAreaView style={{ flex: 1, }}>
            <Chat user={{ _id: 1 }} />
        </SafeAreaView>
    );
}
export default messageBoard;

