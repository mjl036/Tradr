import React, { useState, useCallback, useEffect } from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { GiftedChat, Bubble, InputToolbar, Send } from "react-native-gifted-chat";
import { FIREBASE_AUTH } from '@/firebase.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getAuth } from "firebase/auth";
import Icon from "react-native-vector-icons/Feather"
const { windowHeight } = Dimensions.get('window');
import { getDatabase, ref as dbRef, set, push, onValue, get } from 'firebase/database';

const ChatWindow = ({ user, target }) => {
    const [messages, setMessages] = useState([]);
    const db = getDatabase();
    alert(target)
    const userMessagesRef = dbRef(db, `users/${user}/messages/`);
    const matchMessagesRef = dbRef(db, `users/${target}/messages/`);

    // https://github.com/FaridSafi/react-native-gifted-chat Docs for code example
    useEffect(() => {
        const setupEmpty = async () => {
            await set(userMessagesRef, 'test');
            alert(`users/${user}/messages/`)
            await set(matchMessagesRef, 'test');
        }
        setupEmpty();
    }, [user, target])

    const sendButtonStyle = (props) => {
        return (
            <Send {...props}>
                <View style={{ borderColor: 'black ', padding: 5 }}>
                    <Icon name='send' size={20} color='darkblue' />
                    <Text style={{ fontSize: 9 }}>Send</Text>
                </View>
            </Send>
        )
    }

    // Another setting for profile to customize? customizable features. Maybe in stretch 3
    const chatBubbleStyle = (props) => {
        return (
            <Bubble {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: 'lime',
                        borderColor: 'black',
                        borderWidth: 2,
                        fontSize: 12,
                    },
                    right: {
                        backgroundColor: 'darkblue',
                        borderColor: 'black',
                        borderWidth: 2,
                        fontSize: 12,
                    }
                }}


            />


        )
    }

    const onSend = useCallback((input = []) => {
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, input),
        );

        useEffect(() => {
            const sendToDatabase = async () => {
                await set(userMessagesRef, messages);
                await set(matchMessagesRef, messages);
            }

            sendToDatabase();
        }, [])

        // set the storage for messages under /users/{user}/messages /users/{target}/messages
    }, []);


    useEffect(() => {
        const getMessages = async () => {
            const userMessages = await get(userMessagesRef);
            setMessages(userMessages.val().messages);
        }

        getMessages();

    }, [user, target])


    return (
        <GiftedChat
            messages={messages}
            onSend={(messages) => onSend(messages)}
            user={{ _id: user }}
            renderUsernameOnMessage={true}
            placeholder='Type Message Here'
            renderAvatarOnTop={true}
            showUserAvatar={true}
            showAvatarForEveryMessage={false}
            renderSend={sendButtonStyle} // to render detals of chat follow this example
            renderBubble={chatBubbleStyle}

        />
    )
}


export default ChatWindow;