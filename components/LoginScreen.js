import { StyleSheet, TextInput, View,TouchableOpacity,Text,KeyboardAvoidingView,Dimensions } from 'react-native'
import React,{useEffect, useState} from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { auth, db, storage } from './config';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {doc, setDoc,getDocs, collection,deleteDoc, getDoc, updateDoc, arrayUnion, query, where, onSnapshot} from "firebase/firestore";


const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const myFontSize = height*0.01 + width*0.05

const LoginScreen = ({navigation, route}) => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword,setconfirmPassword] = useState()
    const [toogle, setToogle] = useState(false)
    const [signedIn, setSignedIn] = useState(false)

//useEffect(()=> setSignedIn(false),[])
const handleRegister = async () => {
    
    if (password!= confirmPassword){
        alert("Password Mismatch")
        return;
    }
    
        createUserWithEmailAndPassword(auth, email, password, confirmPassword)
        .then(() =>{ console.log("registered")
        set()
        setEmail()
        setPassword()
        setconfirmPassword()
        })
        .catch((error) => {

            if (error.message.includes("auth/admin-restricted-operation")){
                alert("Invalid credentials")
            }

            if (error.message.includes("auth/invalid-email")){
                alert("Invalid email")
            }
            if (error.message.includes("auth/weak-password")){
                alert("Password should be at least 6 characters")
            }
            if (error.message.includes("auth/missing-password")){
                alert("Password is missing")
            }
            
            console.log(error.message)
            
    })
  }

  const handleLogin = async () => {
    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
    console.log('Logged in')
    //setSignedIn(true)
    update()
    setEmail('')
    
    setPassword('')
    navigation.navigate('Tabs', {user: email})
    })
    .catch((error) => {
    console.log(error.message)
    setSignedIn(false)
    if (error.message.includes("auth/missing-email")){
        alert("Missing email")
    }
    if (error.message.includes("auth/invalid-email")){
        alert("Invalid email")
    }
    if (error.message.includes("auth/invalid-login-credentials")){
        alert("Invalid login credentials")
    }
    if (error.message.includes("auth/missing-password")){
        alert("Password is missing")
    }

})
    }
    //console.log(signedIn)

    const set = async () => {
        //setSignedIn(false)
        const docRef = doc(db, "Users", email)
        await setDoc(docRef, {user: email, signedIn: true},{merge:true} )
            .then(() => { console.log('data submitted')
            
             
            //store()
            //navigation.navigate('Sucess', {id: id, numOfTravellers: numOfTravellers})
        })
            .catch((error) => { console.log(error.message) })
    
      };

    const update = async () => {
        const docRef = doc(db, "Users", email)
        await updateDoc(docRef, {signedIn: true},{merge:true} )
            .then(() => { console.log('signed in true')
            
             
            //store()
            //navigation.navigate('Sucess', {id: id, numOfTravellers: numOfTravellers})
        })
            .catch((error) => { console.log(error.message) })
    }


  return (
    
    <KeyboardAvoidingView style={styles.container}>
            <View style={styles.inputContainer}>
            <Text style={styles.headingStyle}>
            { toogle? "Sign Up" : "Sign In"}
                </Text>
                <Text>
                    Start Your Journey
                </Text>

                <TextInput
                    placeholder='Email'
                    value={email}
                    onChangeText={text =>  setEmail(text) }
                    style={styles.input}
                    autoCorrect={false}
                    autoCapitalize='none'
                />
                <TextInput
                    placeholder='Password'
                    value={password}
                    onChangeText={text =>  setPassword(text)}
                    style={styles.input}
                    autoCapitalize='none'
                    secureTextEntry
                />
                {toogle ?  <TextInput
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChangeText={text =>  setconfirmPassword(text)}
                    style={styles.input}
                    autoCapitalize='none'
                    secureTextEntry
                /> : null}
            </View>
            <View>
                
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.buttonOutLine]}
                    onPress={ toogle ? handleRegister : handleLogin}
                >
                    <Text style={styles.buttonText}>{ toogle? "Sign Up" : "Sign In"}</Text>
                </TouchableOpacity>
                {/*<TouchableOpacity style={[styles.button, styles.buttonOutLine]}
                    onPress={handleRegister}
  >*/}
                <View style={{flexDirection: 'row'}}>
                    <Text>{ toogle? " Already Have an Account ? " : "Don't have an account ? "} </Text>
                    <Text style={[styles.buttonText, styles.buttonOutLineText]} onPress={() => setToogle(!toogle)}>{ toogle? "Sign In" : "Sign Up"}</Text>
                </View>
                
            </View>
        </KeyboardAvoidingView>

    

    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        
        alignItems: 'center',
        backgroundColor: 'white'
    },
    headingStyle:{
        fontSize: 35
    },
    input: {
        fontSize: 18,
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
    button: {
        width: wp(100),
        alignItems: 'center',
        backgroundColor: '#00D23B',
        borderRadius: 10,
        padding: 15,
        marginBottom: 35

    },
    buttonContainer: {

        width: wp(80),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        
        //backgroundColor: 'lightgreen'

    },
    buttonOutLine: {
        width: wp(80),
        alignItems: 'center',
        backgroundColor: '#00D23B',
        borderRadius: 10,
        padding: 15,
        marginTop: 5,
        borderColor: '#00D23B',
        borderWidth: 2
    },
    buttonText: {
        fontWeight: '700',
        color: 'white',
        fontSize: 16
    },
    buttonOutLineText: {
        fontWeight: '700',
        color: '#0782F9',
        fontSize: 16
    }

})
