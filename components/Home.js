import { StyleSheet, Text, View,Button, TextInput, TouchableOpacity, Dimensions, FlatList, SafeAreaView, KeyboardAvoidingView, ScrollView} from 'react-native'
import React,{useEffect, useState} from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as ImagePicker from 'expo-image-picker'
import { Card ,Avatar,Badge } from '@rneui/themed';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome} from 'react-native-vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DateTimePickerModal from '@react-native-community/datetimepicker';


const windowHeight = Dimensions.get('window').height 
const windowWidth = Dimensions.get('window').width

const myFontSize = windowHeight*0.01 + windowWidth*0.05

const Tab = createBottomTabNavigator();

/*useEffect(() => 
{
    navigation.setOptions(
        {
            headerLeft: ()=> <MaterialIcons name='arrow-back-ios' 
       onPress={()=> navigation.replace('Login')} size={30} color={'white'}/>
      
        })

},[]
)*/

const Home = ({navigation, route}) => {
  let{user} = route.params
  console.log(user)
    const [fromCity, setfromCity] = useState()
    const [toCity, settoCity] = useState()
    const [dateOfFlight, setdateOfFlight] = useState()
    const [numOfTravellers, setnumOfTravellers] = useState()
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    
    
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
      console.log(isDatePickerVisible)
    };
  
    const handleConfirm = (date) => {
      console.log("A date has been picked: ", date);
      
      cleanUpDate(date)
      hideDatePicker();
    };

    const cleanUpDate = (date) => {
      let currentDate = {...date}

      console.log(currentDate.nativeEvent.timestamp.toTimeString())
    }

    return (
        <ScrollView> 
          <SafeAreaView style={styles.container}> 
          <View style={{alignSelf: 'center', margin: wp(2)}}>
              <Text style={{color: 'white', fontSize: myFontSize * 0.7, paddingTop: wp(15)}}> Search Flights </Text>
          </View>
            <View style={{alignSelf: 'flex-start', margin: wp(6)}}> 
                 <Text style={{color: 'white', fontSize: myFontSize * 1.3 }}> Discover </Text>
                 <Text style={{color: 'white', fontSize: myFontSize * 1.3 }}> a New World </Text>
            </View>
            <View style={styles.semiContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}> From </Text>
                    <View style={styles.miniInputContainer}>
                        <MaterialIcons name= {'flight-takeoff'} size={22} color= '#00D23B' style={{width: wp(10), marginLeft: wp(2), marginTop: hp(2)}} />
                        <TextInput placeholder='Enter City, Country' style = {{width: wp(40)}} onChangeText={(text)=> setfromCity(text)}/>

                    </View>
                    {/* <Text style={styles.inputText}> To </Text>
                    <View style={styles.miniInputContainer}> 
                        <MaterialIcons name={'flight-land'}  size={22} color='#00D23B' style={{width: wp(10), marginLeft: wp(2), marginTop: hp(2)}}  />
                        <TextInput placeholder='Enter City, Country' style = {{width: wp(40)}} onChangeText={(text)=> settoCity(text)} />

                    </View>
                    <Text style={styles.inputText}> Departure Date </Text>
                    <TouchableOpacity style={styles.miniInputContainer} onPress={() => setDatePickerVisibility(true)}>
                        <MaterialCommunityIcons name={'calendar-month'}  size={22} color= '#00D23B' style={{width: wp(10), marginLeft: wp(2), marginTop: hp(2)}}  />
                        <TextInput placeholder='Enter Date' style = {{width: wp(40)}} editable={false} value={dateOfFlight}/>
                        { isDatePickerVisible ?  <DateTimePickerModal
                          //isVisible={isDatePickerVisible}
                          mode="date"
                          value={new Date()}
                          onChange={handleConfirm}
                          
                        />: null}
                    </TouchableOpacity> */}
                    <Text style={styles.inputText}> Travelers </Text>
                    <View style={styles.miniInputContainer}> 
                        <MaterialIcons name={'person'}  size={22} color='#00D23B' style={{width: wp(10), marginLeft: wp(2), marginTop: hp(2)}}  />
                        <TextInput placeholder='Enter no. of Travelers' style = {{width: wp(40)}} onChangeText={(text)=> setnumOfTravellers(text)}/>

                    </View>
                    
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText} onPress={() => navigation.navigate('Search', {from: fromCity, to: toCity, date: dateOfFlight, numOfTravellers: numOfTravellers, user: user})}> Search Flights </Text>
                    </TouchableOpacity>
                    
                </View>
                {/*<MyTabs/>*/}
            </View> 
             
            
        </SafeAreaView>
        </ScrollView>
        )
  
}


{/*function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#00D23B',
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="Home" color='#00D23B' size={20} />
          ),
        }}
      />
      {/*<Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarLabel: 'Updates',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
    />*/}
    {/*</Tab.Navigator>
  );
} */}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00D23B'
    },

    semiContainer :{
        backgroundColor: 'white',
        alignItems: 'center',
        width: wp(100),
        height: hp(70),
        borderTopRightRadius: hp(4) ,
        borderTopLeftRadius: hp(4)
    },

    inputContainer:{
        justifyContent: 'space-around',
        alignItems: 'center',
        
        width: wp(90),
        flex: 1,

    }, 

    miniInputContainer: {
        flexDirection: 'row',
        backgroundColor: '#F5F6F6',
        width: wp(75),
        height: hp(7),
        borderRadius: 13
        
    },

    inputText: {
        alignSelf: 'flex-start',
        fontSize: 12,
        marginTop:hp(12),
        marginLeft:wp(6)
        
    }, 

    button: {
        width: wp(75),
        alignItems: 'center',
        backgroundColor: '#00D23B',
        borderRadius: 10,
        padding: 15,
        marginBottom: hp(10),
        marginTop: hp(4)

    },
    buttonText: {
        fontWeight: '700',
        color: 'white',
        fontSize: 16
    }

})