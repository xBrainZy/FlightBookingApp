import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView, Dimensions, Image, SafeAreaView, Modal} from 'react-native'

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import React, {useEffect, useState} from 'react'

import { MaterialIcons, MaterialCommunityIcons, FontAwesome5, AntDesign, Feather} from 'react-native-vector-icons';

import { Avatar } from "@rneui/base";
import { Overlay } from '@rneui/themed';

import {doc, setDoc,getDocs, collection,deleteDoc, getDoc, updateDoc, arrayUnion, query, where, onSnapshot} from "firebase/firestore";

import { db } from './config'

const windowHeight = Dimensions.get('window').height 
const windowWidth = Dimensions.get('window').width

const myFontSize = windowHeight*0.01 + windowWidth*0.05

const Account = ({navigation, route}) => {
  let {user} = route.params
  console.log(user)

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible); }
  //const [user, setUser] = useState()

  /* const findUserNameFromCollection = async () => {
        
    const q = query(collection(db, "Users"), where("signedIn", "==", true));
    const docs = await getDocs(q);
    docs.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data().user);
        username = doc.data().user
        setUser(username)
        setUser(username)
        console.log(user)
        
        
        });
        } */

  const update = async () => {
    //findUserNameFromCollection()
    //console.log(user)
    
    const docRef = doc(db, "Users", user)
        await updateDoc(docRef, {signedIn: false},{merge:true} )
            .then(() => { console.log('signed in false')
            
             
            //store()
            navigation.navigate('Login')
        })
            .catch((error) => { console.log(error.message) }) 
  }
  
  return (
    <SafeAreaView style={{height: hp(100), backgroundColor:'white'}}>
      <View style={styles.upContainer}>
        
      
        <MaterialIcons name ={'filter-list'} size={wp(7)} color='white' onPress={toggleModal}/>

        <Text style={{fontSize: myFontSize * 0.7, color: 'white', fontWeight: 'bold'}}>
          My Profile
        </Text>
        
        

      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        presentationStyle="overFullScreen"
        from="left"
        onRequestClose={() => {
          // Handle modal close event
          toggleModal();
        }}
      >
        <TouchableOpacity style={styles.modalContainer} onPressOut={toggleModal}>
          {/* Your overlay content goes here */}
          
          <View style={styles.overlayContent}>
          <TouchableOpacity style={styles.overlayItem}>
              <Text style={styles.overlayItemText}>Item 1</Text>
            </TouchableOpacity>
        </View>
        
        </TouchableOpacity>
      </Modal>
      <View>
      <TouchableOpacity style={styles.SomeView} onPress={() => navigation.navigate("Bookings")}>
        <View style={{flexDirection: 'row'}}>
        <AntDesign name ={'questioncircleo'} size={wp(7)} color='#00D23B' />
        <Text style={{fontSize: myFontSize * 0.7, marginLeft: wp(5)}}>
          My Bookings
        </Text>

        </View>
        <MaterialIcons name={'arrow-forward-ios'} size={wp(5)} color= {'grey'} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.SomeView}>
        <View style={{flexDirection: 'row'}}>
        <Feather name ={'settings'} size={wp(7)} color='#00D23B' />
        <Text style={{fontSize: myFontSize * 0.7, marginLeft: wp(5)}}>
          Settings
        </Text>

        </View>
        <MaterialIcons name={'arrow-forward-ios'} size={wp(5)} color= {'grey'} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.SomeView} onPress={update}>
        <View style={{flexDirection: 'row'}}>
        <MaterialIcons name ={'logout'} size={wp(7)} color='#00D23B' />
        <Text style={{fontSize: myFontSize * 0.7, marginLeft: wp(5)}}>
          Log out
        </Text>

        </View>
        <MaterialIcons name={'arrow-forward-ios'} size={wp(5)} color= {'grey'} />
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  )
}

export default Account

const styles = StyleSheet.create({
upContainer: {
  flexDirection: 'row',
  backgroundColor:'#00D23B',
  height: hp(25),
  borderBottomRightRadius: wp(15),
  borderBottomLeftRadius: wp(15),
  alignItems:'center',
  justifyContent: 'space-between',
  padding: wp(10)
},
CardView: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  margin: hp(1),
  //backgroundColor:'white',
  height: hp(8),
  width: wp(90)
  


},
SomeView: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  margin: hp(3),
  //backgroundColor:'white',
  //height: hp(8),
  //width: wp(90)
  


},
modalContainer: {
  flex: 1,
  //justifyContent: 'flex-end',
  alignItems: 'flex-start',
  backgroundColor: 'rgba(0,0,0,0.5)',
},
overlayContent: {
  backgroundColor: 'white',
  width: wp(55),
  height: hp(100),
  padding: 20,
  
  //borderTopLeftRadius: 20,
  //borderTopRightRadius: 20,
},overlayItem: {
  backgroundColor: 'lightblue', // Adjust the color to match your design
  padding: 10,
  marginVertical: 5,
  borderRadius: 5,
},
overlayItemText: {
  fontSize: 16,
  color: 'blue',
},

})