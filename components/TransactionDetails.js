import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView, Dimensions, Image, SafeAreaView } from 'react-native'

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import React, {useEffect, useState} from 'react'

import { MaterialIcons, MaterialCommunityIcons, FontAwesome5} from 'react-native-vector-icons';

import {doc, setDoc,getDocs, collection,deleteDoc, getDoc, updateDoc, arrayUnion, query, where, onSnapshot} from "firebase/firestore";

import { db } from './config'

const TransactionDetails = ({navigation, route}) => {
    let {id, numOfTravellers} = route.params
  return (
    <View>
      <Text>TransactionDetails</Text>
    </View>
  )
}

export default TransactionDetails

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#00D23B',
        padding: wp(15)
    },

    miniContainer: {
        marginTop: wp(7),
        backgroundColor: 'white',
        width: wp(90),
        height: hp(30),
        borderRadius: hp(3)
    },

    CardView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: hp(2)


    },
})