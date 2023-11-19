import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './components/LoginScreen';

import { ScreenStackHeaderBackButtonImage } from 'react-native-screens';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome} from 'react-native-vector-icons';
import MyTabs from './components/MyTabs';


const Stack = createNativeStackNavigator();

export default function App() {

    
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={LoginScreen} options={{headerShown: false} }
        />
        <Stack.Screen name='Home' component={MyTabs} options={{headerStyle: {
      backgroundColor: '#00D23B',
      
    }, 
           
          headerTitle: 'Search Flights',
          headerTitleAlign: 'center',
          headerTitleStyle: {color: 'white'},
          headerShadowVisible: false,
         
      }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}


