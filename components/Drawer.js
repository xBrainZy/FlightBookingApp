import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './Home';
import Account from './Account';

const Drawerr = createDrawerNavigator();


const Drawer = () => {
  return (
    <Drawerr.Navigator>
    <Drawerr.Screen name="Home" component={Home} />
    <Drawerr.Screen name="Account" component={Account} />
  </Drawerr.Navigator>
  )
}

export default Drawer

const styles = StyleSheet.create({})