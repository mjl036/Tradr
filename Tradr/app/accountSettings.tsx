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

    {/* This function is to set up all the data from the uploaded user information */ }
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

    {/* Only works if user isnt null, otherwise should redirect to login screen theoretically not possible anymore though*/ }
    if (user != null) {
        useEffect(() => { getUserData(); })
        //updateProfile(auth.currentUser, { displayName: 'test', null});

        {/* Working Example to update items*/ }
        const handlePress = () => {
            update(dbRef(db, `users/${userID}/profileInfo`), {
                name: 'VICTORY!'
            })
        }

        return (
            <SafeAreaView style={styles.container}>

                <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white', alignSelf: 'center', }}>ACCOUNT SETTINGS</Text>
                {/* This is to create the top bar with all the current set user info, colors still a wip*/}
                <View style={{ flexDirection: "row", height: 130, backgroundColor: '#0094C6', borderColor: 'black', borderRadius: 10, borderWidth: 5, padding: 10 }}>
                    <Image source={{ uri: profilePic }} style={styles.profileImageArea} />
                    <View style={{ flexDirection: 'column', flex: 1 }}>
                        <Text style={styles.userInfoText}>User Name: {userName} </Text>
                        <Text style={styles.userInfoText}>Email:  {userEmail}: </Text>
                        <Text style={styles.userInfoText}>Password:  NICKNAME: </Text>
                        <Text style={styles.userInfoText}>Rating:  NICKNAME: </Text>
                    </View>

                </View>

                <View style={{ flex: 1, padding: 5 }}>

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Change Username</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Change Password</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => setUserNameModalVisible(true)}>
                        <Text style={styles.buttonText}>Modal Test</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handlePress}>
                        <Text style={styles.buttonText}>Change Test</Text>
                    </TouchableOpacity>

                </View>

                <Modal style={{ alignContent: 'center' }} visible={userNameModalVisible} animationType='slide' onRequestClose={() => setUserNameModalVisible(false)}>
                    <SafeAreaView style={{ backgroundColor: 'blue', width: '100%', height: '100%', alignContent: 'center', alignSelf: 'center' }}>

                        <Text style={{ fontSize: 50, fontWeight: 'condensedBold', alignContent: 'center' }}>This is a test</Text>

                        <TouchableOpacity style={styles.quitButton} onPress={handlePress}>
                            <Text style={styles.buttonText} onPress={() => setUserNameModalVisible(false)}>Close Modal</Text>
                        </TouchableOpacity>

                    </SafeAreaView>
                </Modal>
            </SafeAreaView>
        )
    }
}

{/* The Style Sheet*/ }
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
    quitButton: {
        backgroundColor: 'red',
        padding: 2,
        justifyContent: 'center',
        height: 50,
        borderColor: '000022',
        borderWidth: 3,
        margin: 5,
        borderRadius: 10

    },
    buttonText: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white'
    },
    profileImageArea: {
        width: 100,
        height: 100,
        borderColor: 'black',
        borderWidth: 2,
        borderCurve: 'circular',
        borderRadius: 50,
    },
    userInfoText: {
        paddingLeft: 15,
        alignSelf: 'flex-start',
        color: 'white',
        textAlignVertical: 'auto',
        textAlign: 'left',
        flex: 1
    }

});

