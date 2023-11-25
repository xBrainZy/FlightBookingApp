import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView, Dimensions, Image } from 'react-native'

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import React, {useEffect, useState} from 'react'

import { MaterialIcons, MaterialCommunityIcons, FontAwesome5} from 'react-native-vector-icons';

import {doc, setDoc,getDocs, collection,deleteDoc, getDoc, updateDoc, arrayUnion, query, where, onSnapshot} from "firebase/firestore";

import { db } from './config'

const windowHeight = Dimensions.get('window').height 
const windowWidth = Dimensions.get('window').width

const myFontSize = windowHeight*0.01 + windowWidth*0.05

const Search = ({navigation, route}) => {
    useEffect(() => {
        const unsub = onSnapshot(
                  collection(db, "SearchedFlights"),
                      (snapshot) => {
                        const loadedData = snapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                          }));
                          setdata(loadedData);
                            }
                          );
                      
                  return () => unsub();
            
        
    }, []
    )

    const [data, setdata] = useState([])
  return (
    <ScrollView>
        <View style={styles.container}>
      
            {data.length > 0 ? data.map((x, i) => {
                return(
                <View style= {styles.miniContainer} key={i}>
                    <View style={styles.CardView}>
                        <View>
                            <Text style={{fontSize: myFontSize * 0.7}}> {x.fromAirPort }</Text>
                            <Text style={{fontSize: myFontSize * 0.4, color: 'grey'}}> {x.from} </Text>
                        </View>
                        <View>
                            <FontAwesome5 name ={'plane'} size={wp(5)} color='#00D23B' style={{alignSelf: 'center'}} />
                            
                            <Text style={{fontSize: myFontSize * 0.35, padding: hp(1)}}> {x.flightDuration} : 00 hours </Text>
                        </View>
                        <View>
                            <Text style={{fontSize: myFontSize * 0.7}}> {x.toAirPort }</Text>
                            <Text style={{fontSize: myFontSize * 0.4, color: 'grey'}}> {x.to} </Text>
                        </View>

                    </View>
                    <View style={styles.CardView}> 
                        <Text style={{fontSize: myFontSize * 0.65}}> {x.sourceTime} AM </Text>
                        <Text style={{fontSize: myFontSize * 0.65}}> {x.destinationTime} PM </Text>
                    </View>
                    <View style={{ marginTop: hp(2),borderStyle: 'dashed',borderWidth: 1, borderColor: 'lightgrey'}}></View>
                    <View style={styles.CardView}> 
                        <Image style={{width: wp(4), height: hp(4)}} source={require('../assets/'+x.airline+'.png')}></Image>
                        <Text style={{fontSize: myFontSize * 0.65}}>  $ {x.price}  </Text>
                    </View>
                </View>
                )
            }) : null}
      
        </View>
    </ScrollView>
  )
}

export default Search

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