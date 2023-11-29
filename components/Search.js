import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView, Dimensions, Image, SafeAreaView } from 'react-native'

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import React, {useEffect, useState} from 'react'

import { MaterialIcons, MaterialCommunityIcons, FontAwesome5} from 'react-native-vector-icons';

import {doc, setDoc,getDocs, collection,deleteDoc, getDoc, updateDoc, arrayUnion, query, where, onSnapshot} from "firebase/firestore";

import { db } from './config'

const windowHeight = Dimensions.get('window').height 
const windowWidth = Dimensions.get('window').width

const myFontSize = windowHeight*0.01 + windowWidth*0.05

const Search = ({navigation, route}) => {
    let { fromCity, toCity, date, numOfTravellers} = route.params
    useEffect(() => {
        navigation.setOptions(
          {
            headerLeft: ()=> <MaterialIcons name='arrow-back-ios' 
            onPress={()=> navigation.replace('Tabs')} size={30} color={'white'}/>})
    }, [navigation]);

    useEffect(() => {
        const unsub = onSnapshot(
                  collection(db, "SearchedFlights"),
                      (snapshot) => {
                        const loadedData = snapshot.docs.map((doc) => ({
                            id: doc.id,
                            from: fromCity,
                            to: toCity,
                            date: date,
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
    <SafeAreaView>
        <ScrollView>
        <View style={styles.container}>
            {console.log(data)}
      
            {data.length > 0 ? data.map((x, i) => {
                //let image = x.airline+'.png'
                return(
                    
                <TouchableOpacity style= {styles.miniContainer} key={i} onPress={()=> navigation.navigate('Pay Methods', {id: i+1, city: x.from, numOfTravellers: numOfTravellers})}>
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
                        <View>
                            <Text style={{fontSize: myFontSize * 0.65}}> {x.sourceTime} AM </Text>
                            <Text style={{fontSize: myFontSize * 0.4, color: 'grey'}}> {x.date}  </Text>
                        </View>
                        <View></View>
                        <View>
                            <Text style={{fontSize: myFontSize * 0.65, marginLeft: wp(7)}}> {x.destinationTime} PM </Text>
                            <Text style={{fontSize: myFontSize * 0.4, color: 'grey'}}> {x.date}  </Text>
                        </View>
                        
                    </View>
                    <View style={{ marginTop: hp(2),borderStyle: 'dashed',borderWidth: 1, borderColor: 'lightgrey'}}></View>
                    <View style={styles.CardView}> 
                        <View style={{flexDirection:'row'}}>
                            <Image style={{width: wp(15), height: hp(15)}} source={require('../assets/Qatar Airways.png')}></Image> 
                            <Text style={{fontSize: myFontSize * 0.5, color: 'grey'}}> Qatar Airways</Text>
                        </View>
                        {/*x.airline == 'Eithad Airways' ? <Image style={{width: wp(4), height: hp(4)}} source={require('../assets/Eitihad Airways.png')}></Image> : null*/}
                        {/*x.airline == 'Euro Line' ? <Image style={{width: wp(4), height: hp(4)}} source={require('../assets/Euro Line.png')}></Image> : null*/}
                        <Text style={{fontSize: myFontSize * 0.65}}>  $ {x.price}  </Text>
                    </View>
                </TouchableOpacity>
                )
            }) : null}
      
        </View>
        </ScrollView>
    </SafeAreaView>
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