import { Text, View, StyleSheet, Image, TouchableOpacity, Modal, StatusBar, Alert, TextInput } from "react-native";
import React, { useEffect, useState } from 'react'
import { getDatabase, ref as dbRef, onValue, update } from 'firebase/database';
import { getAuth, signOut, updateCurrentUser, updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";
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
    const [userNameTemp, setUserNameTemp] = useState('PlaceHolderName');
    const [profilePic, setProfilePic] = useState('https://firebasestorage.googleapis.com/v0/b/tradr-app-c2b3a.appspot.com/o/images%2FPlaceHolderTest_1729802771133?alt=media&token=a5539da7-ede6-49ad-a517-970583b92c9d');

    const [userEmail, setUserEmail] = useState('PlaceHolderEmail');
    const [userEmailTemp, setUserEmailTemp] = useState('PlaceHolderEmail');

    const [userPassword, setNewUserPassword] = useState('');
    const [userRating, setUserRating] = useState(0);
    const [tradedCards, setTradedCards] = useState(0);
    const [imageModalVisible, setImageModalVisible] = useState(false);
    const [PasswordModalVisable, setPasswordModalVisable] = useState(false);
    const [userNameModalVisible, setUserModalVisable] = useState(false);
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

    const changeEmail = async (newEmail: string) => {
        try {
            const user = auth.currentUser;
      
            if (user) {
                await updateEmail(user, newEmail);
                alert('Email updated successfully!');
                console.log('Email updated successfully!');
            } else {
                console.log('User not logged in.'); //Shouldn't be feasible, but just in case.
            }
        } catch (error) {
            alert('Error updating email:' + error);
            console.error('Error updating email:', error);
        }
    };

    const changePassword = async (newPassword: string) => {
        try {
            const user = auth.currentUser;
      
            if (user) {
                await updatePassword(user, newPassword);
                alert('Password updated successfully!');
                console.log('Password updated successfully!');
          } else {
                console.log('User not logged in.'); //Shouldn't be feasible, but just in case.
          }
        } catch (error) {
            alert('Error updating password:' + error);
            console.error('Error updating password:', error);
        }
    };

    const changeUserName = (input: string) => {
        if (user != null) {
            updateProfile(user, { displayName: input });
            update(dbRef(db, `users/${userUID}/profileInfo`), {
                name: input
            })
            getUserData;
        }

    }

    {/* This function is to set up all the data from the uploaded user information */ }
    const getUserData = () => {
        if (user != null) {
            const userRef = dbRef(db, `users/${userUID}/profileInfo`);
            loaded = true;

            onValue(userRef, (snapshot) => {
                const data = snapshot.val();
                // Sets data for the account info in the database
                setUserName(data.name);
                setUserEmail(data.email);
                setProfilePic(data.Profile_Picture);

                // Sets data for the AUTH dataset
            })
        }


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

                <View style={{ flex: 1, padding: 10 }}>

                    {/* Username Box */}
                    <View style={styles.inputBox}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white', alignSelf: 'center', }}>USERNAME</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter Username"
                            onChangeText={setUserNameTemp}
                        />
                        <TouchableOpacity style={styles.button} onPress={() => changeUserName(userNameTemp)}>
                            <Text style={styles.buttonText}>Change Username</Text>
                        </TouchableOpacity>
                    </View>


                    {/* Password Box */}
                    <View style={styles.inputBox}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white', alignSelf: 'center', }}>PASSWORD</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter New Password"
                            onChangeText={setNewUserPassword}
                        />
                        <TouchableOpacity style={styles.button} onPress={() => changePassword(userPassword)}>
                            <Text style={styles.buttonText}>Change Password</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Email Box */}
                    <View style={styles.inputBox}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white', alignSelf: 'center', }}>EMAIL</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter New Email"
                            onChangeText={setUserEmailTemp}
                        />

                        <TouchableOpacity style={styles.button} onPress={() => changeEmail(userEmailTemp)}>
                            <Text style={styles.buttonText}>Change Email</Text>
                        </TouchableOpacity>
                    </View>

                </View>

                <TouchableOpacity style={styles.logOutButton} onPress={handleLogout}>
                    <Text style={styles.buttonText}>Log Out</Text>
                </TouchableOpacity>


                {/* CHANGE PROFILE IMAGE SCREEN*/}
                <Modal style={{ alignContent: 'center' }} visible={imageModalVisible} animationType='slide' onRequestClose={() => setImageModalVisible(false)}>
                    <SafeAreaView style={{ backgroundColor: '#001242', width: '100%', height: '100%', alignContent: 'center', alignSelf: 'center' }}>

                        <View style={{ flex: 1, }}>

                            <Text style={{ fontSize: 25, fontWeight: 'condensedBold', color: 'white', alignSelf: 'center', padding: 5 }}>Change Profile Picture</Text>

                            <View style={{ height: '40%', width: '80%', alignSelf: 'center', borderColor: 'black', borderRadius: 5, borderWidth: 2 }}>
                                {tempImage && <Image source={{ uri: tempImage }} style={styles.displayPicChange} />}
                            </View>

                            <View style={{ flexDirection: 'row', alignSelf: 'center', padding: 5 }}>
                                <TouchableOpacity style={styles.modalButton} onPress={takePicture}>
                                    <Text style={styles.buttonText} >Take Picture</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalButton} onPress={pickImage}>
                                    <Text style={styles.buttonText} >Select From Folder</Text>
                                </TouchableOpacity>

                            </View>



                        </View>

                        <View style={{ flexDirection: 'row', borderColor: 'black', borderRadius: 5, borderWidth: 2 }}>
                            <TouchableOpacity style={styles.quitButton} onPress={() => setImageModalVisible(false)}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.quitButton} onPress={() => { changeProfilePic(); }}>
                                <Text style={styles.buttonText} >Confirm Change</Text>
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
        height: 40,
        borderColor: '000022',
        borderWidth: 3,
        margin: 5,
        borderRadius: 5,
        width: '100%',
        alignSelf: 'center'

    },
    modalButton: {
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
        color: 'black'
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
        height: 38,
        borderColor: '000022',
        borderWidth: 3,
        margin: 2,
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
    },
    inputBox: {
        width: '100%',
        borderColor: '#0094C6',
        borderWidth: 2,
        borderCurve: 'circular',
        borderRadius: 10,
        alignSelf: 'center',
        backgroundColor: '#0094C6',
        padding: 2,
        marginBottom: 10

    },
    textInput: {
        height: 50,
        width: "100%",
        borderColor: 'black',
        borderWidth: 3,
        padding: 5,
        backgroundColor: 'lightblue',
        fontSize: 30,
        textAlignVertical: 'top',
        marginTop: 10,
        borderRadius: 5,
        color: 'black',
        fontWeight: 'bold',




    }

});

