import { View, Text } from 'react-native';
import React from 'react';
import { Redirect } from 'expo-router';
import { getAuth } from "firebase/auth";


//Eventually we'll make this conditional on login status.
//If not logged in -> login screen.
//if logged in -> home.
export default function Index() {
    const auth = getAuth();
    const user = auth.currentUser;
    if ( user != null) {
        alert(user);
        alert('Logged in already!');
        return <Redirect href="/home" />;
    } else {
        alert(user);
        alert('Not logged in!');
        return <Redirect href="/loginScreen" />;
    }
}