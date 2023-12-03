import { StyleSheet, TextInput, View,TouchableOpacity,Text,KeyboardAvoidingView,Dimensions, SafeAreaView, Button,Animated} from 'react-native'
import { MaterialIcons, MaterialCommunityIcons, FontAwesome5, AntDesign} from 'react-native-vector-icons';
import React,{useEffect, useState} from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Avatar } from "@rneui/base";

const windowHeight = Dimensions.get('window').height 
const windowWidth = Dimensions.get('window').width

const myFontSize = windowHeight*0.01 + windowWidth*0.05
const StarAnimation = () => {
    const [animation] = useState(new Animated.Value(0));
  
    useEffect(() => {
      animateStars();
    }, []);
  
    const animateStars = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(animation, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    };
  
    const starStyle = {
      transform: [
        {
          translateY: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 5], // Adjust the vertical movement as needed
          }),
        },
      ],
    };
    return (
        <Animated.View style={[styles.star, starStyle]}>
          <AntDesign name={'star'} size={wp(20)} color='white' />
        </Animated.View>
      );
    };
const PaySucess = ({navigation, route}) => {
    let {id, numOfTravellers} = route.params
    console.log(id)
    
  return (
    <SafeAreaView style={styles.container}>
        
        <View style={styles.ball}>
        {/* <AntDesign name={'check'} size={wp(30)} color='white'/> */}
        </View>
        <View style={styles.starsContainer}>
        <StarAnimation />
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
    starsContainer: {
        position: 'absolute',
       // top: hp(20),
        flexDirection: 'row',
        //backgroundColor:'white'
      },
      star: {
        marginRight: wp(1),
        marginTop: wp(7)
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