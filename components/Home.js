import { StyleSheet, Text, View,Button, TextInput, TouchableOpacity, Dimensions, FlatList } from 'react-native'
import React,{useEffect, useState} from 'react'
import * as ImagePicker from 'expo-image-picker'
import { Card ,Avatar,Badge } from '@rneui/themed';
import { MaterialIcons, MaterialCommunityIcons} from 'react-native-vector-icons';

const windowHeight = Dimensions.get('window').height 
const windowWidth = Dimensions.get('window').width

const myFontSize = windowHeight*0.01 + windowWidth*0.05


const Home = ({navigation, route}) => {
    
  const [authorName, setAuthorName] = useState('')
  const [authorId, setAuthorId] = useState('')
  const [info,setInfo] = useState([])
  const [image, setImage] = useState(null);
  const [users, setUsers] = useState([])
  const [noteReceived, setNoteReceived] = useState([])
  const noteArr = []
  
  /*const validateNoteId = () => {
    if(authorId)
  }*/

  const addingNotes = () => {
    let temp = {name:authorName ,id:authorId}
    let findAuth = users.find((x)=> x.authorId == temp.id && x.authorName != temp.name)
    let allowAddNote = users.find((x)=> x.authorName == temp.name && x.authorName == temp.name)

    if (findAuth){
        alert("An author with the same ID already exists!")
        return

    }


    setInfo(temp)
    navigation.navigate("Notes",temp)

  }

 

  useEffect(() => { 
    
        if(route.params?.data){
          const{noteData} = route.params;
            let tempArr = [...users]
            //let tempArrOfObj = {...noteData}
            let tempNoteArr = [...noteData]
            //let notesReceived = setStupidJSNote(note)
            //let noteObj = setNoteReceived({ noteId: id ,note: stupidJSNote, authId: authId})

            let obj = {
                note: tempNoteArr,
                authorName: authorName,
                authorId: authorId,
                avatar: image
                
            }

            

            if (tempArr.length >= 1){
                let findExistingAuthId = tempArr.findIndex((x) => route.params.authId == x.id)

                if(findExistingAuthId){
                    tempArr[findExistingAuthId].note.push(obj)

                }

                else{
                    tempArr.push(obj)
                }
            }

            if(tempArr.length < 1){
              

                tempArr.push(obj)
            }
            
            
            setUsers([...tempArr])
            navigation.setParams({note: null})
        }
    
    

    
    },[route.params?.data?.note])

  const pickImage = async () => {
        
    let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    });
    if (!result.canceled) {
        setImage(result.assets[0].uri);
    }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'space-evenly'}}>
            <View style = {{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                <TextInput placeholder='Author Name' style = {styles.textInputStyle} onChangeText={text=> setAuthorName(text)} /*onFocus={() => setInfo({id:authorId, name:authorName})}*//>
                
                <TextInput placeholder='Author ID' style = {styles.textInputStyle} onChangeText={text=> setAuthorId(text)}/>
            </View>

            <View style={{ alignItems: 'center'}}>
                <TouchableOpacity onPress={pickImage} > 
                    <Text style={styles.txtStyle}> Upload Photo </Text> 
                </TouchableOpacity>

                <TouchableOpacity onPress={addingNotes} > 
                    <Text style={styles.txtStyle}> Add Notes </Text> 
                </TouchableOpacity>

            </View>
            <View style={{flexDirection : 'row' , alignSelf : 'auto'}}>
                <TouchableOpacity style={{backgroundColor: 'blue', borderRadius:12, width: windowHeight*0.09}}  onPress={()=> console.log(users)}>
                    <Text style={{color:'white'}}> Show All</Text>
                </TouchableOpacity>
            </View>

            <View style={{borderWidth: 1, height: windowHeight*0.3, width: windowHeight*0.45, alignSelf: 'center'}}>
               {/* <FlatList 
                ItemSeparatorComponent={() => <Text></Text>}
                data={users}
                renderItem={({ item }) => (
                <View style={{ flexDirection: 'row', justifyContent: "space-evenly"}}>
                    {item.note.map((x) => {

                        <View style={{flexDirection: 'row'}}>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.text}>
                            {x.note}
                        </Text>
                    
                    
                            <MaterialCommunityIcons
                            name='magnify-plus'
                            size={20}/>

                            <MaterialCommunityIcons
                            name='delete-circle'
                            size={20}/>

                            <MaterialCommunityIcons
                             name='update'
                                size={20}/>
                                
                      </View>
                    }

                        
                    
                    )}
                    
                    </View>
                  )}/>*/}
            </View>
                
            <View>
            <Card>
                <Card.Title>Author's Note</Card.Title>
                <Card.Divider />
                <FlatList 
                ItemSeparatorComponent={() => <Text></Text>}
                data={users}
                renderItem={({ item }) => (
                    <View style={{
                        flexDirection: 'row', justifyContent: "space-between"}} key={item.id}>
                            <Avatar rounded source={{ uri: item.image }} size='medium' />
                                <Text style={{ alignSelf: 'center' }}>{item.authorName}</Text>
                                <Text style={{ alignSelf: 'center' }}>{item.authorId}</Text>

                        </View>
                )
                
                }/>
            </Card>
            </View>
           
            
        </View>
        )
  
}

export default Home

const styles = StyleSheet.create({

    textInputStyle : {
        borderWidth : 1,
        width: windowWidth*0.3,
        height: windowHeight*0.05
        
    },

    txtStyle: {
        color: 'blue',
        fontSize : myFontSize/1.7
    },

})