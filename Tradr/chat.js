import React, { useState, useCallback, useEffect } from 'react'
import { Alert, Dimensions, Text, TextInput, View, KeyboardAvoidingView, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from 'expo-router';
import Icon from "react-native-vector-icons/Ionicons";
import { GiftedChat, Bubble, InputToolbar, Send } from "react-native-gifted-chat";
import { FIREBASE_AUTH } from '@/firebase.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const { height } = Dimensions.get('window');
// Chat Code Help https://medium.com/@huzefaabbasi6/how-to-create-a-chat-ui-in-react-native-using-gifted-chat-51fe05a9e6de


const Chat = ({ user }) => {
    const onSend = useCallback((messages = []) => {
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, messages)
        );
    }, []);

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://firebasestorage.googleapis.com/v0/b/tradr-app-c2b3a.appspot.com/o/images%2FTheLizard1728601289436?alt=media&token=42652af2-d919-43ed-8a90-74401e1bdb5e',
                },
            },
        ])
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.heading}>Text User Chat</Text>
            </View>

            <GiftedChat
                messages={messages}
                onSend={(messages) => onSend(messages)}
                user={{
                    _id: user._id,
                }}
                renderAvatar={null}
                renderUsernameOnMessage={false}
                renderBubble={renderBubble}
                renderInputToolbar={renderInputToolBar}
                renderSend={renderSend}
            />
        </View>
    );
};

const renderInputToolBar = (props) => {
    return (
        <InputToolbar
            {...props}
            containerStyle={{
                borderRadius: 16,
                backgroundColor: "white",
                marginHorizontal: 8,
                marginTop: 5,
                borderTopWidth: 0,
            }}
        />
    );
};

const renderSend = (props) => {
    return (
        <Send {...props}>
            <View style={{ marginBottom: 11 }}>
                <Icon name="send" size={24} color="#0075FD" />
            </View>
        </Send>
    );
};

const renderBubble = (props) => {
    return (
        <Bubble
            {...props}
            wrapperStyle={{
                left: {
                    backgroundColor: "lightgrey",
                },
                right: {
                    backgroundColor: "blue",
                },
            }}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "lightblue",
    },
    header: {
        paddingTop: height * 0.02,
        flexDirection: "row",
        paddingHorizontal: 2,
        borderBottomWidth: 1,
        borderBottomColor: "black",
        paddingVertical: 2,
        backgroundColor: "lightgrey",
        alignSelf: 'center',
        width: '100%',
    },
    heading: {
        fontWeight: "500",
        paddingLeft: '16',
        alignSelf: 'center',
        fontSize: 20,
    },
});

export default Chat;