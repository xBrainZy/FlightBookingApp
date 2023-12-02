import { StyleSheet, TextInput, View,TouchableOpacity,Text,KeyboardAvoidingView,Dimensions, SafeAreaView, Button} from 'react-native'
import { MaterialIcons, MaterialCommunityIcons, FontAwesome5, AntDesign} from 'react-native-vector-icons';
import React,{useEffect, useState} from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {doc, setDoc,getDocs, collection,deleteDoc, getDoc, updateDoc, arrayUnion, query, where, onSnapshot} from "firebase/firestore";
import { db } from './config'

const windowHeight = Dimensions.get('window').height 
const windowWidth = Dimensions.get('window').width

const myFontSize = windowHeight*0.01 + windowWidth*0.05

const Bank = ({navigation, route}) => {
    let {id, numOfTravellers, price, user} = route.params
    console.log(id)
    console.log(numOfTravellers)
    console.log(price)
    console.log(user) 
    
     

const [cardNum, setcardNum] = useState()
const [cardName, setcardName] = useState()
const [cardCSC, setcardCSC] = useState()
const [obj, setObj] = useState()
//const [user, setUser] = useState()

useEffect(() => {
    readOne(id)
   // findUserNameFromCollection()
   
}, []); 

const readOne = async (id) => {
    
    const docRef = doc(db, 'SearchedFlights', id);
    const docSnap = (await getDoc(docRef)).data()
    
    //setprice(docSnap.price)
    
    setObj({airline: docSnap.airline, destinationTime: docSnap.destinationTime, flightClass: docSnap.flightClass,
        from: docSnap.from, to : docSnap.to, fromAirPort: docSnap.fromAirPort, sourceTime: docSnap.sourceTime,
        toAirPort: docSnap.toAirPort, price: price * numOfTravellers,user: user})

    //console.log(obj)
    
    

    }

    const findUserNameFromCollection = async () => {
        
        const q = query(collection(db, "Users"), where("signedIn", "==", true));
        const docs = await getDocs(q);
        docs.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data().user);
            username = doc.data().user
            //setUser(username)
            
            });
            
           
        
    
        }

    

    
    let userBookId = id + " " + user
    
    console.log(userBookId)
    const set = async () => {
        

        const docRef = doc(db, "Bookings", userBookId)
        await setDoc(docRef, {...obj},{merge:true} )
            .then(() => { 
                if(cardNum == undefined && cardName == undefined && cardCSC == undefined){
                    alert("Invalid bank credentials")
                    return ;
                }
        
                if(cardNum.length < 16 || cardNum.length > 16){
                    alert("Invalid card number")
                    return ;
                }
        
                if(cardCSC.length < 3 || cardCSC.length > 3){
                    alert("Invalid CSC")
                    return ;
                }
        
                if(cardName.length < 7){
                    alert("Name must be atleast 7 characters")
                    return ;
                }
                
            console.log('data submitted')
             
            //store()
            navigation.navigate('Sucess', {id: userBookId, numOfTravellers: numOfTravellers, user: user})
        })
            .catch((error) => { console.log(error.message) })
    
      };



  return (
    
      <KeyboardAvoidingView style={styles.container}>
        <View style={{alignSelf: 'flex-start', marginLeft: wp(7), marginBottom:hp(27)}}>
        <MaterialIcons name='arrow-back-ios' 
            onPress={()=> navigation.goBack()} size={30} color={'black'}/>
  
        </View>
            <View style={styles.inputContainer}>
            <Text style={styles.headingStyle}>
                Bank Credentials
                </Text>
                <Text style={{fontSize: myFontSize * 0.5, color: 'grey'}}>
                Enter Your Bank Credentials to Proceed the Payment
                </Text>

                <TextInput
                    placeholder='Enter Your Card Number'
                    value={cardNum}
                    onChangeText={text =>  setcardNum(text) }
                    style={styles.input}
                    autoCorrect={false}
                    autoCapitalize='none'
                />
                <TextInput
                    placeholder='Enter Your Card Name'
                    value={cardName}
                    onChangeText={text =>  setcardName(text)}
                    style={styles.input}
                    autoCapitalize='none'
                    
                />
                <TextInput
                    placeholder='Enter Your Card CSC'
                    value={cardCSC}
                    onChangeText={text =>  setcardCSC(text)}
                    style={styles.input}
                    autoCapitalize='none'
                    
                />
                
            </View>
            <View>
                
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.buttonOutLine]}
                    
                >
                    <Text style={styles.buttonText} onPress={set}> Pay </Text>
                </TouchableOpacity>
               
               
                
            </View>
        </KeyboardAvoidingView>

    
  )
}

export default Bank

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        
        alignItems: 'center',
        backgroundColor: 'white'
    },
    headingStyle:{
        fontSize: wp(9)
    },
    input: {
        fontSize: wp(5),
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 10,
        borderBottomColor: 'lightgrey',
        borderBottomWidth: wp(0.05),
        marginTop: 5
    },
    inputContainer: {
        width: wp(80)
    },
    CardView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: hp(2)


    },button: {
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
    }
})
