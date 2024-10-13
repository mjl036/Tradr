import React, { useState, useCallback, useEffect } from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { GiftedChat, Bubble, InputToolbar, Send } from "react-native-gifted-chat";
import { FIREBASE_AUTH } from '@/firebase.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const { windowHeight } = Dimensions.get('window');

const ChatWindow = ({ user, target }) => {
    const [messages, setMessages] = useState([]);
    const [senderID, setSenderID] = useState(null);
    const [recieverID, setRecieverID] = useState(null);
    const auth = getAuth();

    const GetUser = async () => {
        var user = auth.currentUser;
        var userID = await user?.getIdToken();
    }

    // Notes to self for future implementation
    // Assaign ID when account is created so its always accessable
    // Assign name to email, or whatever user changes it to in settings
    // Have an assignable Avatar
    // Change Later 
    const setUsers = (sender, reciever) => {
        setSenderID(1);
        setRecieverID(2);
    }
    // https://github.com/FaridSafi/react-native-gifted-chat Docs for code example
    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello, I would like to trade.',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'Trade User',
                    avatar: null,
                },
            },
        ])
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, messages)
        );
    }, []);

    return (

        <GiftedChat
            messages={messages}
            onSend={(messages) => onSend(messages)}
            user={{ _id: user._userID, }}
            renderUsernameOnMessage={true}
        />

    )
}


export default ChatWindow;