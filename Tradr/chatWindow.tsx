@ -0,0 +1,122 @@
import React, { useState, useCallback, useEffect } from 'react'
import { Text, View, StyleSheet, Dimensions, Button, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble, InputToolbar, Send, IMessage } from "react-native-gifted-chat";
import { FIREBASE_AUTH } from '@/firebase.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getAuth } from "firebase/auth";
import Icon from "react-native-vector-icons/Feather"
import { getDatabase, ref as dbRef, set, push, onValue, get } from 'firebase/database';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const ChatWindow = ({ user, target }) => {
    const [messages, setMessages] = useState<IMessage[]>([{
        _id: user,
        text: 'Lets Trade',
        createdAt: new Date(),
        user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
        },
    },]);



    const db = getDatabase();
    const userMessagesRef = dbRef(db, `users/${user}/messages/`);
    const matchMessagesRef = dbRef(db, `users/${target}/messages/`);

    // https://github.com/FaridSafi/react-native-gifted-chat Docs for code example
    useEffect(() => {
        const getChat = async () => {
            const userMessagesSnapshot = await get(userMessagesRef);
            const userMessages = userMessagesSnapshot.val() || messages;
            setMessages(userMessages as IMessage[]);
        };

        getChat();
    }, []);

    const sendButtonStyle = (props) => {
        return (
            <Send {...props}>

                <View style={{ borderColor: 'black ', padding: 5, zIndex: 100000, }}>

                    <Icon name='send' size={15} color='darkblue' />
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
                        borderColor: 'blue',
                        borderWidth: 2,
                        fontSize: 12,
                    }
                }}
            />
        )
    }

    const onSend = useCallback((messages) => {
        alert("Test")
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
        )

        push(userMessagesRef, messages);
        push(matchMessagesRef, messages);

    }, [])


    return (
        <View style={{ height: '100%' }}>
            <KeyboardAvoidingView style={{ height: '90%' }}>
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
                    keyboardShouldPersistTaps='always'


                />
            </KeyboardAvoidingView>
            <TouchableOpacity style={{ width: '100%', height: 50, backgroundColor: 'grey' }}>
                <Text style={{ alignSelf: 'center', fontSize: 30, }}>Send Test</Text>
            </TouchableOpacity>
        </View>
    )
}


export default ChatWindow;