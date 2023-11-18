import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './components/LoginScreen';
import Home from './components/Home';
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome} from 'react-native-vector-icons';


const Stack = createNativeStackNavigator();

export default function App() {

    
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={LoginScreen} options={{headerShown: false} }
        />
        <Stack.Screen name='Home' component={Home} options={{headerStyle: {
      backgroundColor: '#00D23B',
      
    }, 
           
          headerTitle: 'Search Flights',
          headerTitleAlign: 'center',
          headerTitleStyle: {color: 'white'},
          headerLeft: ()=> <MaterialIcons name='arrow-back-ios' 
       onPress={()=> navigation.replace('Login')} size={30} color={'white'}/>
      }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}


