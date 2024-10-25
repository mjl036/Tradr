import { Text, View, StyleSheet, Image, TouchableOpacity, Modal } from "react-native";
import React, { useEffect, useState } from 'react'
import { getDatabase, ref as dbRef, onValue, update } from 'firebase/database';
import { getAuth } from "firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";

// https://firebase.google.com/docs/database/web/read-and-write
let loaded = false; // ensures that it only gets the user data when desired

export default function accountSettings() {
    const auth = getAuth();
    const user = auth.currentUser;
    const db = getDatabase();
    const refDB = dbRef(getDatabase());
    const userID = user?.uid;

    const [userName, setUserName] = useState('PlaceHolderName');
    const [profilePic, setProfilePic] = useState('https://firebasestorage.googleapis.com/v0/b/tradr-app-c2b3a.appspot.com/o/images%2FPlaceHolderTest_1729802771133?alt=media&token=a5539da7-ede6-49ad-a517-970583b92c9d');
    const [userEmail, setUserEmail] = useState('PlaceHolderEmail');
    const [userNameModalVisible, setUserNameModalVisible] = useState(false);

    function getUserData() {
        const userRef = dbRef(db, `users/${userID}/profileInfo`);
        loaded = true;
        onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            setUserName(data.name);
            setUserEmail(data.email);
            setProfilePic(data.Profile_Picture);
        })

    }


    if (user != null) {
        useEffect(() => { getUserData(); })
        //updateProfile(auth.currentUser, { displayName: 'test', null});

        const handlePress = () => {
            update(dbRef(db, `users/${userID}/profileInfo`), {
                name: 'hahaha!'
            })
        }

        return (
            <SafeAreaView style={styles.container}>
                <View style={{ flexDirection: "row", height: 110, backgroundColor: 'red', borderColor: 'black', borderRadius: 10, borderWidth: 5 }}>
                    <Image source={{ uri: profilePic }} style={styles.profileImageArea} />
                    <View style={{ flexDirection: 'column', flex: 1 }}>
                        <Text style={{ alignSelf: "center", color: 'white', textAlignVertical: 'auto', textAlign: 'left', flex: 1 }}>User Name: {userName} </Text>
                        <Text style={{ alignSelf: "center", color: 'white', textAlignVertical: 'auto', textAlign: 'left', flex: 1 }}>Email:  {userEmail}: </Text>
                        <Text style={{ alignSelf: "center", color: 'white', textAlignVertical: 'auto', textAlign: 'left', flex: 1 }}>Password:  NICKNAME: </Text>
                        <Text style={{ alignSelf: "center", color: 'white', textAlignVertical: 'auto', textAlign: 'left', flex: 1 }}>Other Stuff:  NICKNAME: </Text>
                    </View>

                </View>

                <View style={{ flex: 1 }}>


                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.title}>Change Username</Text>

                    </TouchableOpacity>


                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.title}>Change Password</Text>
                    </TouchableOpacity>



                    <TouchableOpacity style={styles.button} onPress={() => setUserNameModalVisible(true)}>
                        <Text style={styles.title}>Modal Test</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handlePress}>
                        <Text style={styles.title}>Change Test</Text>
                    </TouchableOpacity>

                </View>
                <Modal style={{ alignContent: 'center' }} visible={userNameModalVisible} animationType='slide' onRequestClose={() => setUserNameModalVisible(false)}>
                    <View style={{ backgroundColor: '#05E7C', width: '85%', height: '85%', alignContent: 'center', alignSelf: 'center' }}>
                        <Text>This is a test</Text>
                    </View>
                </Modal>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#001242',
        padding: 5,
        flex: 1,
        justifyContent: 'flex-start'
    },
    button: {
        backgroundColor: 'lightblue',
        padding: 2,
        justifyContent: 'center',
        height: 50,
        borderColor: '000022',
        borderWidth: 3,
        margin: 5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5

    },
    title: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white'
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 20
    },
    profileImageArea: {
        width: 100,
        height: 100,
        borderColor: 'black',
        borderWidth: 2,
        borderCurve: 'circular',
        borderRadius: 50
    }
});

