import { Text, View, StyleSheet, Image, TouchableOpacity, Modal, StatusBar, Alert } from "react-native";
import React, { useEffect, useState } from 'react'
import { getDatabase, ref as dbRef, onValue, update } from 'firebase/database';
import { getAuth, signOut } from "firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import { Modal as modalTest } from '../../component/Modal'
import { router } from "expo-router";
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FIREBASE_STORAGE } from "@/firebase";

// https://firebase.google.com/docs/database/web/read-and-write
let loaded = false; // ensures that it only gets the user data when desired

export default function accountSettings() {
    const auth = getAuth();
    const user = auth.currentUser;
    const db = getDatabase();
    const refDB = dbRef(getDatabase());
    const userUID = user?.uid;


    const [userName, setUserName] = useState('PlaceHolderName');
    const [profilePic, setProfilePic] = useState('https://firebasestorage.googleapis.com/v0/b/tradr-app-c2b3a.appspot.com/o/images%2FPlaceHolderTest_1729802771133?alt=media&token=a5539da7-ede6-49ad-a517-970583b92c9d');
    const [userEmail, setUserEmail] = useState('PlaceHolderEmail');
    const [userRating, setUserRating] = useState(0);
    const [tradedCards, setTradedCards] = useState(0);
    const [userNameModalVisible, setImageModalVisible] = useState(false);
    const [tempImage, setTempImage] = useState<string | null>(null);


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            allowsMultipleSelection: false,
            aspect: [9, 9],
            quality: 1,
        });

        if (!result.canceled) {
            setTempImage(result.assets[0].uri);
        }

    };

    const takePicture = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            allowsMultipleSelection: false,
            cameraType: ImagePicker.CameraType.front,
            aspect: [9, 9],
            quality: 1,
        });

        if (!result.canceled) {
            setTempImage(result.assets[0].uri);

        }
    };

    const changeProfilePic = async () => {
        if (tempImage != null) {
            const response = await fetch(tempImage);
            const blob = await response.blob();
            const imageFileName = `${userUID}_ProfilePic_'${Date.now()}`; // title.replace(/\s+/g, '')}${Date.now(); this is name scheme, currently testing with simple name as to link it to an account instead
            const storageRef = ref(FIREBASE_STORAGE, `images/${imageFileName}`);
            const db = getDatabase();


            await uploadBytes(storageRef, blob,);
            const imageUrl = await getDownloadURL(storageRef);

            update(dbRef(db, `users/${userUID}/profileInfo`), {
                Profile_Picture: imageUrl
            })
            setImageModalVisible(false);
            getUserData();
        } else {
            alert("Must have profile pic to submit")
        }

    }


    {/* This function is to set up all the data from the uploaded user information */ }
    const getUserData = () => {
        const userRef = dbRef(db, `users/${userUID}/profileInfo`);
        loaded = true;
        onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            setUserName(data.name);
            setUserEmail(data.email);
            setProfilePic(data.Profile_Picture);
        })

    }

    const handleLogout = async () => {
        try {
            signOut(auth)
            // Sign-out success
            console.log("Logged Out");
            alert("Logged Out");
            router.replace("/loginScreen");

        } catch (e: any) {
            console.log(e);
            Alert.alert('Log Out failed', e.message);
        }
    }

    {/* Only works if user isnt null, otherwise should redirect to login screen theoretically not possible anymore though*/ }
    if (user != null) {
        useEffect(() => { getUserData(); })
        //updateProfile(auth.currentUser, { displayName: 'test', null});

        {/* Working Example to update items*/ }
        const handlePress = () => {
            update(dbRef(db, `users/${userUID}/profileInfo`), {
                name: 'test!'
            })
        }

        return (
            <SafeAreaView style={styles.container}>

                <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white', alignSelf: 'center', }}>ACCOUNT SETTINGS</Text>
                {/* This is to create the top bar with all the current set user info, colors still a wip*/}
                <View style={{ flexDirection: "row", height: 130, backgroundColor: '#0094C6', borderColor: 'black', borderRadius: 10, borderWidth: 5, padding: 10 }}>
                    <TouchableOpacity onPress={() => setImageModalVisible(true)}>
                        <Image source={{ uri: profilePic }} style={styles.profileImageArea} />
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'column', flex: 1 }}>
                        <Text style={styles.userInfoText}>User Name: {userName} </Text>
                        <Text style={styles.userInfoText}>Email:  {userEmail} </Text>
                        <Text style={styles.userInfoText}>Successful Trades:  {tradedCards} </Text>
                        <Text style={styles.userInfoText}>Rating:  {userRating} </Text>
                    </View>

                </View>

                <View style={{ flex: 1, padding: 5 }}>

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Change Username</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Change Password</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => setImageModalVisible(true)}>
                        <Text style={styles.buttonText}>Modal Test</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handlePress}>
                        <Text style={styles.buttonText}>Change Test</Text>
                    </TouchableOpacity>

                </View>

                <TouchableOpacity style={styles.logOutButton} onPress={handleLogout}>
                    <Text style={styles.buttonText}>Log Out</Text>
                </TouchableOpacity>

                <Modal style={{ alignContent: 'center' }} visible={userNameModalVisible} animationType='slide' onRequestClose={() => setImageModalVisible(false)}>
                    <SafeAreaView style={{ backgroundColor: 'blue', width: '100%', height: '100%', alignContent: 'center', alignSelf: 'center' }}>

                        <View style={{ flex: 1, }}>

                            <Text style={{ fontSize: 25, fontWeight: 'condensedBold', color: 'white', alignSelf: 'center', padding: 5 }}>Change Profile Picture</Text>

                            <View style={{ height: '40%', width: '80%', alignSelf: 'center', borderColor: 'black', borderRadius: 5, borderWidth: 2 }}>
                                {tempImage && <Image source={{ uri: tempImage }} style={styles.displayPicChange} />}
                            </View>

                            <View style={{ flexDirection: 'row', alignSelf: 'center', padding: 5 }}>
                                <TouchableOpacity style={styles.button} onPress={takePicture}>
                                    <Text style={styles.buttonText} >Take Picture</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={pickImage}>
                                    <Text style={styles.buttonText} >Select From Folder</Text>
                                </TouchableOpacity>

                            </View>



                        </View>

                        <View style={{ flexDirection: 'row', borderColor: 'black', borderRadius: 5, borderWidth: 2 }}>
                            <TouchableOpacity style={styles.quitButton} onPress={handlePress}>
                                <Text style={styles.buttonText} onPress={() => setImageModalVisible(false)}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.quitButton} onPress={handlePress}>
                                <Text style={styles.buttonText} onPress={() => { changeProfilePic(); }}>Confirm Image</Text>
                            </TouchableOpacity>


                        </View>
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
        borderRadius: 5,
        width: '50%',
        alignSelf: 'center'

    },
    quitButton: {
        backgroundColor: 'red',
        padding: 2,
        justifyContent: 'center',
        height: 50,
        borderColor: '000022',
        borderWidth: 3,
        margin: 5,
        borderRadius: 10,
        flex: 1

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
    },
    logOutButton: {
        backgroundColor: 'red',
        padding: 2,
        justifyContent: 'center',
        height: 50,
        borderColor: '000022',
        borderWidth: 3,
        margin: 5,
        borderRadius: 5

    },
    displayPicChange: {
        width: '100%',
        height: '100%',
        borderColor: 'black',
        borderWidth: 2,
        borderCurve: 'circular',
        borderRadius: 10,
        alignSelf: 'center'
    }

});

