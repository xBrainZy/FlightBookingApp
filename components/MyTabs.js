import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome} from 'react-native-vector-icons';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomePage from './HomePage';
import Account from './Account';

const Tab = createBottomTabNavigator();

const MyTabs = () => {
return (
<Tab.Navigator screenOptions={{
tabBarActiveTintColor: '#00D23B',
}}
>
<Tab.Screen
name="Home"
component={HomePage}
options={{
tabBarLabel: 'Home',
tabBarIcon: ({ color, size }) => (
<MaterialCommunityIcons name="Home" color={color} size={size} />
),
}}
/>
<Tab.Screen
name="Account"
component={Account}
options={{
tabBarLabel: 'Account',
tabBarIcon: ({ color, size }) => (
<MaterialCommunityIcons name="person" color={color} size={size} />
),
}}
/>
</Tab.Navigator>
)
}

export default MyTabs

const styles = StyleSheet.create({})
