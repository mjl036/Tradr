import { Text, View, Button, SafeAreaView, StyleSheet, Modal, TouchableOpacity, Image, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React, { useState } from 'react';
import ChatWindow from '../../chatWindow'
import { FIREBASE_STORAGE } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getDatabase, ref as dbRef, set } from 'firebase/database';
import { getAuth } from "firebase/auth";


const DisplayCard = ({ cardName, image, title, description }) => {
    const [settingModal, setSettingModal] = useState(false);
    const [chatModal, setChatModal] = useState(false);
    const cardID = cardName;
    return (
        <SafeAreaView style={{ padding: 5, alignContent: "center" }}>
            {/* Clickable Card */}
            <TouchableOpacity style={styles.card} onPress={() => setSettingModal(true)}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Image source={{ uri: image }} style={styles.cardImage} />
            <Text style={styles.cardDescriptionBox}>{description}</Text>
            </TouchableOpacity>
            
            {/* Management Screen */}
            <Modal visible={settingModal} animationType="slide">
                <TouchableOpacity style = {{width: 80, height: 25, backgroundColor: 'red', alignSelf: 'baseline', padding: 5}}
                onPress = {() => setSettingModal(false)}>
                    <Text> Back Arrow </Text>
                </TouchableOpacity>

                <Image source={{ uri: image }} style={styles.cardImage} />

                <TouchableOpacity style={styles.button} onPress={() => setChatModal(true)}>
                    <Text style = {styles.buttonText}> Open Chat </Text>
                </TouchableOpacity>

                <View style = {{flexDirection: 'column'}}>
                    <TouchableOpacity style={styles.button}>
                        <Text style = {styles.buttonText}> Accept Trade</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style = {styles.buttonText}> Cancel Trade</Text>
                    </TouchableOpacity>
                </View>

            </Modal>

            {/* Chat Screen */}
            <Modal visible={chatModal} animationType="slide">
                <TouchableOpacity style = {{width:50, height: 25, backgroundColor: 'red', alignSelf: 'baseline'}}
                onPress = {() => setChatModal(false)}>
                    <Text> Close </Text>
                </TouchableOpacity>
                <ChatWindow user = {{}} target = {{}}></ChatWindow>
            </Modal>
        </SafeAreaView>
    );
};

const MessageBoard = () => {
    const auth = getAuth();

    const GetUser = async () => {
        var user = auth.currentUser;
        var userID = await user?.getIdToken();
    }


    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: 'lightblue' }}>
            <View>
                <Text style = {{alignSelf: "center", fontSize: 60, fontWeight: 'bold', borderColor: 'black', borderWidth: 4, alignItems: "center", padding: 10, borderRadius: 20, backgroundColor: 'white'}}>
                     MATCHES
                </Text>
            </View>
            <DisplayCard 
                cardName={"test"} 
                image = {"https://firebasestorage.googleapis.com/v0/b/tradr-app-c2b3a.appspot.com/o/images%2FPlaceHolderTest_1729802771133?alt=media&token=a5539da7-ede6-49ad-a517-970583b92c9d"} 
                title = {'test'} 
                description = {'Last Sent Message?'}>

            </DisplayCard>
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      borderWidth: 5,
      borderColor: 'black',
      alignSelf: 'center',
      backgroundColor: 'lightblue'
    },
    image: {
      width: '100%',
      height: '100%',
      flex: 1,
      alignSelf: 'auto',
      borderWidth: 5,
      borderColor: 'black',
    },
    button: {
      backgroundColor: 'white',
      borderColor: 'black',
      width: '80%',
      height: 60,
      borderRadius: 5,
      borderWidth: 2,
      padding: 2,
      alignSelf: 'center',
      marginTop: 10
  
  
    },
    buttonText: {
      textAlign: 'center',
      fontSize: 30,
      fontWeight: 'bold',
      color: 'black'
    },
    modalButton: {
      backgroundColor: 'white',
      borderColor: 'black',
      width: '50%',
      height: 40,
      borderRadius: 5,
      borderWidth: 2,
      padding: 4,
      alignSelf: 'center',
      paddingRight: 5
    },
    modalButtonText: {
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
      color: 'black'
    },
    card: {
      backgroundColor: 'blue',
      padding: 10,
      width: 200,
      height: 350,
      alignContent: 'center',
      borderWidth: 2,
      borderBlockColor: 'black',
      borderRadius: 5
    },
    cardImage: {
      width: '100%',
      height: '75%',
      borderRadius: 5,
      borderWidth: 2,
      borderColor: 'black',
      padding: 4,
      alignSelf: 'center',
      marginBottom: 4
    },
    cardDescriptionBox: {
      borderWidth: 2,
      borderBlockColor: 'black',
      borderRadius: 5,
      backgroundColor: 'lightblue',
      width: '100%',
      height: 60,
      fontSize: 10,
      padding: 2
  
    },
    cardTitle: {
      fontSize: 15,
      color: 'white',
      fontWeight: 'bold',
      marginBottom: 2
  
    },
    managementButton: {
      backgroundColor: 'white',
      borderColor: 'black',
      width: '50%',
      height: 60,
      borderRadius: 5,
      borderWidth: 2,
      padding: 2,
      alignSelf: 'center'
    },
    fullScreenDescBox: {
      borderWidth: 4,
      borderBlockColor: 'black',
      borderRadius: 5,
      backgroundColor: 'lightblue',
      width: '80%',
      height: 120,
      fontSize: 20,
      padding: 4,
    },
});


export default MessageBoard;

