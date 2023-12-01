import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome} from 'react-native-vector-icons';
import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect, useState} from 'react'
import HomePage from './Home';
import Account from './Account';
import Bookings from './Bookings';

const Tab = createBottomTabNavigator();

const MyTabs = ({navigation, route}) => {

    let {user} = route.params

    //console.log(user)
    useEffect(()=>
    {
        navigation.setOptions(
            {
                headerLeft: ()=> <MaterialIcons name='arrow-back-ios' 
       onPress={()=> navigation.replace('Login')} size={30} color={'white'}/>
            })
        
    navigation.navigate('Home',{user: user})
            
         
},[]
)

return (
<Tab.Navigator screenOptions={{
tabBarActiveTintColor: '#00D23B',
//tabBarStyle : {display: 'none'}
headerShown: false,
tabBarHideOnKeyboard: true
}}
>
<Tab.Screen
name="Home"
component={HomePage}
options={{
tabBarIcon: ({ color, size }) => (
<MaterialCommunityIcons name="home" color={color} size={size} />
),
}}
/>
<Tab.Screen
name="Bookings"
component={Bookings}
options={{
tabBarLabel: 'Bookings',
tabBarIcon: ({ color, size }) => (
<MaterialCommunityIcons name="road-variant" color={color} size={size} />
),
}}
/>
<Tab.Screen
name="Account"
component={Account}
options={{
tabBarLabel: 'Account',
tabBarIcon: ({ color, size }) => (
<MaterialIcons name="person" color={color} size={size} />
),
}}
/>
</Tab.Navigator>
)
}

export default MyTabs

const styles = StyleSheet.create({})
