import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
           <Tabs.Screen name="home" options={{ title: 'Home', tabBarIcon: ({ color }) => <FontAwesome size = {28} name='home' color={color}/>,
           }} 
        />
            <Tabs.Screen name="settings" options={{ title: 'Settings', tabBarIcon: ({ color }) => <FontAwesome size = {28} name='cog' color={color}/>,
           }} 
           />
           <Tabs.Screen name="listing" options={{ title: 'Listings', tabBarIcon: ({ color }) => <FontAwesome size = {28} name='list' color={color}/>,
           }} 
           />
           <Tabs.Screen name="loginScreen" options={{ href: null, tabBarStyle: {display: 'none'} }}
            />
            <Tabs.Screen name="messageBoard" options={{ title: 'Message Board', tabBarIcon: ({ color }) => <FontAwesome size = {28} name='comments' color={color}/>,
           }} 
           />
           <Tabs.Screen name="accountSettings" options={{ title: 'Account Settings', tabBarIcon: ({ color }) => <FontAwesome size = {28} name='user' color={color}/>,
           }} 
           />
        </Tabs>
    )
}