import { StyleSheet, TextInput, View,TouchableOpacity,Text,KeyboardAvoidingView,Dimensions, SafeAreaView, Button} from 'react-native'
import { MaterialIcons, MaterialCommunityIcons, FontAwesome5, AntDesign} from 'react-native-vector-icons';
import React,{useEffect, useState} from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {doc, setDoc,getDocs, collection,deleteDoc, getDoc, updateDoc, arrayUnion, query, where, onSnapshot} from "firebase/firestore";
import { db } from './Config'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const myFontSize = height*0.01 + width*0.05


const PayMethod = ({navigation, route}) => {
    let {id, city, numOfTravellers} = route.params
    let cityId = city+id
    const [price, setprice] = useState()
    const [user, setuser] = useState()
    console.log(id)
    console.log(numOfTravellers)
    console.log(cityId)

    useEffect(() => {
        readOne(cityId)
        //findUserNameFromCollection()
       
    }, []);
 

    const readOne = async (id) => {
    
        const docRef = doc(db, 'SearchedFlights', cityId);
        const docSnap = (await getDoc(docRef)).data()
        
        setprice(docSnap.price)
        
    
        }

    const findUserNameFromCollection = async () => {
    
        const q = query(collection(db, "Users"), where("signedIn", "==", true));
        const docs = await getDocs(q);
        docs.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            });
            
            
        
    
        }
    
  return (
    <SafeAreaProvider>
        <View style={{ height: hp(90), margin:hp(2)}}>
            <Text></Text>
        <MaterialIcons name='arrow-back-ios' 
            onPress={()=> navigation.goBack()} size={30} color={'black'}/>
      <Text style={{fontSize: myFontSize * 0.8 , marginTop: hp(4)}}>Digital payment method(s)</Text>
      <Text style={{fontSize: myFontSize * 0.48 , marginTop: hp(1.5), marginBottom: hp(2), color: 'grey'}}>Choose your preferred method</Text>
      <Text style={{fontSize: myFontSize * 0.8 , marginTop: hp(4)}}> Add methods</Text>
      <View style={styles.CardView}>
        <AntDesign name={'creditcard'} size={wp(8)} color='#00D23B'/>
        <View>
            <Text style={{fontSize: myFontSize * 0.8}} >
                Credit or Debit
            </Text>
            <Text style={{fontSize: myFontSize * 0.48, color: 'grey'}}>
                Visa, Mastercard, AMEX, and JCB
            </Text>
        </View>
        
        <Text style={{ fontWeight: 'bold',color: '#00D23B',fontSize: myFontSize * 0.6}}> ADD</Text> 
      </View>
      <View style={[styles.CardView, {marginTop: hp(48)}]}>
        <View>
        <View style={{flexDirection: 'row', marginTop: hp(3.5)}}>
            <Text>
                Subtotal
            </Text>
            <AntDesign name={'down'} size={20} color='#00D23B'/>

        </View>
        <Text style={{fontSize: myFontSize * 0.8 }}>$ {price} </Text>
        
        </View>
        <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText} onPress={() => navigation.navigate('Bank', {id: cityId, numOfTravellers: numOfTravellers, price: price})}> Proceed To Payment </Text>
        </TouchableOpacity>
      </View>
        </View>
    </SafeAreaProvider>
  )
}

export default PayMethod

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
        alignItems: 'baseline',
        backgroundColor: 'white',
        //marginTop: hp(2)
    },
    CardView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: hp(2)


    },button: {
        width: wp(55),
        alignItems: 'center',
        backgroundColor: '#00D23B',
        borderRadius: 10,
        padding: 15,
        marginBottom: hp(10),
        marginTop: hp(4),
        marginLeft: wp(12)

    },
    buttonText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 16
    }
})
