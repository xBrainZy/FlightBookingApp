import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView, Dimensions, Image, SafeAreaView } from 'react-native'

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import React, {useEffect, useState} from 'react'

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { MaterialIcons, MaterialCommunityIcons, FontAwesome5} from 'react-native-vector-icons';

import {doc, setDoc,getDocs, collection,deleteDoc, getDoc, updateDoc, arrayUnion, query, where, onSnapshot} from "firebase/firestore";

import { db } from './config'
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const myFontSize = height*0.01 + width*0.05


const TransactionDetails = ({navigation, route}) => {
    let {id, numOfTravellers} = route.params
    console.log(id)
    useEffect(() => {
      
      readOne(id)
          
      
  }, []
  )
  const readOne = async (id) => {
    
    const docRef = doc(db, 'Bookings', id);
    const docSnap = (await getDoc(docRef)).data()
    
    setObj(docSnap)
    
    //console.log(obj)

    }
  const [obj, setObj] = useState({})
  console.log(obj)


  return (
    <SafeAreaProvider>
        <View style={{ height: hp(90), margin:hp(3)}}>
            <Text></Text>
        <MaterialIcons name='arrow-back-ios' 
            onPress={()=> navigation.goBack()} size={30} color={'black'}/>
          <Text style={{fontSize: myFontSize * 0.8 , marginTop: hp(4)}}>Transaction Details</Text>
            <View style= {styles.miniContainer}>
                    <View style={styles.CardView}>
                        <View>
                            <Text style={{fontSize: myFontSize * 0.5}}> {obj.airline }</Text>
                        </View>
                        <View>
                            <Text style={{fontSize: myFontSize * 0.4, color: 'grey'}}> {obj.flightClass} </Text>
                        </View>
                    </View>
                    <View style={styles.CardView}>
                      <View>
                            <Text style={{fontSize: myFontSize * 0.7}}> {obj.fromAirPort }</Text>
                            <Text style={{fontSize: myFontSize * 0.4, color: 'grey'}}> {obj.sourceTime} AM </Text>
                      </View>

                      <View>
                            <FontAwesome5 name ={'plane'} size={wp(5)} color='#00D23B' style={{alignSelf: 'center'}} />
                      </View>

                      <View>
                            <Text style={{fontSize: myFontSize * 0.7}}> {obj.toAirPort }</Text>
                            <Text style={{fontSize: myFontSize * 0.4, color: 'grey'}}> {obj.destinationTime} PM </Text>
                      </View>
                        

                    </View>
                    <View style={styles.CardView}> 
                        <View style={{flexDirection: 'row'}}>
                        <MaterialIcons name={'person'}  size={wp(1)} color='#00D23B'/>
                            <Text style={{fontSize: myFontSize * 0.4}}> {numOfTravellers}  Person(s) </Text>
                        </View>
                        <Text style={{fontSize: myFontSize * 0.4}}> {obj.price}  QAR </Text>
                        </View>
                        <View>
                        
                        </View>
                        
                       
               
               
                
            </View>
            <View style={styles.CardView}> 
                        <Text style={{fontSize: myFontSize * 0.4, color: 'grey'}}>
                          Status
                        </Text>
                        <Text style={{fontSize: myFontSize * 0.4, color: '#00D23B'}}>
                          Success
                        </Text>
                        </View>
            <View style={styles.CardView}> 
                      <Text style={{fontSize: myFontSize * 0.4, color: 'grey'}}>
                          Invoice
                        </Text>
                        <Text style={{fontSize: myFontSize * 0.4}}>
                          INV1221414313533153
                        </Text>  
            </View>
            <View style={styles.CardView}> 
                      <Text style={{fontSize: myFontSize * 0.4, color: 'grey'}}>
                          Status
                        </Text>
                        <Text style={{fontSize: myFontSize * 0.4, color: '#00D23B'}}>
                          Success
                        </Text>  
            </View>
                        <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.buttonOutLine]}
                  onPress={()=> navigation.navigate('Bookings')}  
                >
                    <Text style={styles.buttonText} > Enter </Text>
                </TouchableOpacity>
                        
                    
          </View>
        </View>
    </SafeAreaProvider>
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
        marginTop: wp(2),
        backgroundColor: 'white',
        width: wp(90),
        height: hp(30),
        borderRadius: hp(1),
        borderColor: 'black',
        marginBottom: wp(2)
    },

    CardView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: hp(2)


    },
    button: {
      width: wp(75),
      alignItems: 'center',
      backgroundColor: '#00D23B',
      borderRadius: 10,
      padding: 15,
      marginBottom: hp(10),
      marginTop: hp(4),
      //marginLeft: wp(12)

  },
  buttonText: {
      fontWeight: 'bold',
      color: 'white',
      fontSize: 16
  },
  buttonContainer:{
    marginTop: hp(16),
    alignSelf: 'center'
  }
})