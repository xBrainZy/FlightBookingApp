import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView, Dimensions, Image, SafeAreaView } from 'react-native'

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import React, {useEffect, useState} from 'react'

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome5} from 'react-native-vector-icons';

import {doc, setDoc,getDocs, collection,deleteDoc, getDoc, updateDoc, arrayUnion, query, where, onSnapshot} from "firebase/firestore";

import { db } from './config'

const windowHeight = Dimensions.get('window').height 
const windowWidth = Dimensions.get('window').width

const myFontSize = windowHeight*0.01 + windowWidth*0.05


const Bookings = ({navigation, route}) => {
  let {user} = route.params
  console.log(user)
    //const [user, setUser] = useState()
   // const [x, setX] = useState(false)
    const [initialRender,setInitialRender] = useState(true)
    const[filteredData, setFilteredData] = useState([])
    const[data, setData] = useState([])
    useEffect(() => {
      /* const x = async () => {
          const q = query(collection(db, "Users"), where("signedIn", "==", true));
          const docs = await getDocs(q);
          docs.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data().user);
              username = doc.data().user
              setUser(username)
  
              });
      } */

  //const userCollection = collection(db, 'Users')

  /* const unsub2 = onSnapshot(userCollection, (snapshot) => {
    const userData = snapshot.docs.map((doc) => doc.data());
    console.log('USERDATA: ', userData);
    if (userData[0].signedIn == true){
      setUser(userData[0].user);
    }

    userData.forEach((x)=>{
      if (x.signedIn == true){
        setUser(x.user)
      }
    })
  }) */

  const collectionRef = collection(db, 'Bookings')
  
  const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const newData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

  //   const newData = snapshot.docs.map((doc) => doc.data());
  //                       )
  //                       let temp = []
  //                     data.forEach(element => {
  //                     if(element.user == user){
  //                         temp.push(element) 
  //                     }\

    
      setData(newData)
      console.log(data)


      const filterData = newData.filter((x) => x.user === user);
      console.log(filterData)
      setFilteredData(filterData);
      //setFilteredData(filterData);

          console.log('RENDER 1')
               }) 
  
              /* if (initialRender){
                   console.log('RENDER 1')
                   setInitialRender(false)
                   //setInitialRender(!initialRender)
                   
                  
               } */

               
          
          
                return () =>{
                   
                    
                  unsubscribe();
                  //unsub2();
                 
                  //setInitialRender(!initialRender)
                } 
      
  }, []  
  )
    
    //setInitialRender(true)

    const delDoc = async (id) =>{

    }

    

    // const findUserNameFromCollection = async () => {
        
    //     const q = query(collection(db, "Users"), where("signedIn", "==", true));
    //     const docs = await getDocs(q);
    //     docs.forEach((doc) => {
    //         // doc.data() is never undefined for query doc snapshots
    //         console.log(doc.id, " => ", doc.data().user);
    //         username = doc.data().user
    //         setUser(username)

    //         });
        
        
    
    //     }
    
  return (
    
      <SafeAreaView style={{ height: hp(100),}}>
        <View style={styles.upContainer}>
        <Text style={{fontSize: myFontSize * 0.7, color: 'white', fontWeight: 'bold',alignSelf:'flex-start', margin: wp(6)}}>
          My Bookings
        </Text>

        

      </View>
        <View style={{backgroundColor: 'white', margin: wp(5), marginTop: wp(1), borderRadius: wp(6)
        }}>
            {filteredData. length > 0 ? filteredData.map((x) => {
                return(
                    <View style={styles.CardView} key={x.id}>
                    <View>
                            <Text style={{fontSize: myFontSize * 0.7}}> {x.fromAirPort }</Text>
                            <Text style={{fontSize: myFontSize * 0.4, color: 'grey'}}> {x.from} </Text>
                        </View>
                        
                        <FontAwesome5 name ={'plane'} size={wp(5)} color='#00D23B' style={{alignSelf: 'center'}} />
                    

                    <View>
                            <Text style={{fontSize: myFontSize * 0.7}}> {x.toAirPort }</Text>
                            <Text style={{fontSize: myFontSize * 0.4, color: 'grey'}}> {x.to} </Text>
                        </View>
                    <TouchableOpacity onPress={delDoc(x.id)}>
                        <Text style={{fontSize: myFontSize * 0.7, color:'#00D23B'  }}> Cancel </Text>   
                    </TouchableOpacity>
                </View>
                )
            }) : null}
        </View>  
      </SafeAreaView>
    
  )
}

export default Bookings

const styles = StyleSheet.create({
    CardView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: hp(2)
        


    },
    upContainer: {
      backgroundColor:'#00D23B',
      height: hp(25),
      borderBottomRightRadius: wp(15),
      borderBottomLeftRadius: wp(15),
      alignItems:'center',
      justifyContent: 'center'
    },

})
