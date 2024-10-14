import React, { useState, useCallback, useEffect } from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { GiftedChat, Bubble, InputToolbar, Send } from "react-native-gifted-chat";
import { FIREBASE_AUTH } from '@/firebase.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getAuth } from "firebase/auth";
import Icon from "react-native-vector-icons/Feather"
const { windowHeight } = Dimensions.get('window');


const ChatWindow = ({ user, target }) => {
    const [messages, setMessages] = useState([]);
    const [senderID, setSenderID] = useState(null);
    const [recieverID, setRecieverID] = useState(null);
    //const [targetAvatar, setTargetAvatar] = useState < String | (null) > (null);
    //setTargetAvatar('https://firebasestorage.googleapis.com/v0/b/tradr-app-c2b3a.appspot.com/o/images%2FHow%20about%20this%20one%3F?alt=media&token=b88190fa-8e99-41f4-8afc-5f0c0398ac8d');
    const auth = getAuth();

    const GetUser = async () => {
        var user = auth.currentUser;
        var userID = await user?.getIdToken();
    }

    // Notes to self for future implementation
    // Assaign ID when account is created so its always accessable
    // Assign name to email, or whatever user changes it to in settings
    // Store an avatar image in profile and display here for others

    const setUsers = (sender, reciever) => {
        setSenderID(1);
        setRecieverID(2);
    }
    // https://github.com/FaridSafi/react-native-gifted-chat Docs for code example
    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Why no response?',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'Trade User',
                    avatar: 'https://firebasestorage.googleapis.com/v0/b/tradr-app-c2b3a.appspot.com/o/images%2FAvatarTest?alt=media&token=e1913408-2723-4486-b816-1c01a93fb8a9',

                },
            },
            {
                _id: 2,
                text: 'Hello, I would like to trade.',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'Trade User',
                    avatar: 'https://firebasestorage.googleapis.com/v0/b/tradr-app-c2b3a.appspot.com/o/images%2FAvatarTest?alt=media&token=e1913408-2723-4486-b816-1c01a93fb8a9',

                },
            },

        ])
    }, [])



    const simulateResponse = () => {
    }

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

    const onSend = useCallback((messages = []) => {
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, messages),
        );

    }, []);

    return (
        <GiftedChat
            messages={messages}
            onSend={(messages) => onSend(messages)}
            user={{ _id: user._userID, }}
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