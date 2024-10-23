/*import { Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home Screen" }} />
      <Stack.Screen name="messageBoard" options={{ title: "Message Board" }} />
      <Stack.Screen name="loginScreen" options={{ title: "Log In" }} />
      <Stack.Screen name="settings" options={{ title: "Settings" }} />
      <Stack.Screen name="accountInfo" options={{ title: "Account Information" }} />
      <Stack.Screen name="listing" options={{ title: "Create Listing" }} />
    </Stack>
  );
}
*/
// In App.js in a new project

import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MessageBoardScreen from './messageBoard';
import listingScreen from './listing';
import settingsScreen from './settings';
import IndexScreen from './index';
import loginScreen from './loginScreen';

function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Index">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Index" component={IndexScreen} />
        <Stack.Screen name="Login" component={loginScreen} />
        <Stack.Screen name="MessageBoard" component={MessageBoardScreen} />
        <Stack.Screen name="Listings" component={listingScreen} />
        <Stack.Screen name="Settings" component={settingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;