import { StyleSheet, TextInput, View,TouchableOpacity,Text,KeyboardAvoidingView,Dimensions, SafeAreaView, Button} from 'react-native'
import { MaterialIcons, MaterialCommunityIcons, FontAwesome5, AntDesign} from 'react-native-vector-icons';
import React,{useEffect, useState} from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Avatar } from "@rneui/base";

const windowHeight = Dimensions.get('window').height 
const windowWidth = Dimensions.get('window').width

const myFontSize = windowHeight*0.01 + windowWidth*0.05

const PaySucess = ({navigation, route}) => {
    let {id, numOfTravellers} = route.params
    console.log(id)
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.ball}>
        <AntDesign name={'check'} size={wp(30)} color='white'/>
        </View>

        <View style={{alignItems: 'center'}}>
            <Text style={{color: 'white', fontSize: myFontSize * 0.9, margin: wp(3)}}>
                Order Confirmed
            </Text>
            <Text style={{color: 'white', fontSize: myFontSize * 0.5, margin: wp(3)}}>
            Thank you for your order. You will receive email confirmation shortly.
            </Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.buttonOutLine]}
                   onPress={()=> navigation.navigate('Details', {id: id, numOfTravellers: numOfTravellers})} 
                >
                    <Text style={styles.buttonText}> See Details </Text>
                </TouchableOpacity>
               
               
                
            </View>
        </View>
      
    </SafeAreaView>
  )
}

export default PaySucess

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#00D23B',
        //padding: wp(15)
    },

    ball : {
        height: hp(20),
        width: hp(20),
        borderRadius: 100,
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center'
    },button: {
        width: wp(75),
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginBottom: hp(10),
        marginTop: hp(4),
        //marginLeft: wp(12)

    },
    buttonText: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 16
    }
    
    
})