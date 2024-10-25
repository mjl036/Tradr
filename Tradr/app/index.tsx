import { View, Text } from 'react-native';
import React from 'react';
import { Redirect } from 'expo-router';


//Eventually we'll make this conditional on login status.
//If not logged in -> login screen.
//if logged in -> home.
export default function Index() {
  return <Redirect href="/loginScreen" />;
}