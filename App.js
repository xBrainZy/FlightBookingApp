import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './components/LoginScreen';

import { ScreenStackHeaderBackButtonImage } from 'react-native-screens';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome} from 'react-native-vector-icons';
import MyTabs from './components/MyTabs';
import Search from './components/Search';
import PayMethod from './components/PayMethod';
import Bank from './components/Bank';
import PaySucess from './components/PaySucess';


const Stack = createNativeStackNavigator();

export default function App() {

    
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={LoginScreen} options={{headerShown: false} }
        />
        <Stack.Screen name='Tabs' component={MyTabs} options={{headerShown: false}}
        />

        <Stack.Screen name='Search' component={Search} options={{headerStyle: {
      backgroundColor: '#00D23B',
      
    }, 
           
          headerTitle: 'Search Flights',
          headerTitleAlign: 'center',
          headerTitleStyle: {color: 'white'},
          headerShadowVisible: false,
          
         
      } }
        />
        <Stack.Screen name='Pay Methods' component={PayMethod} options={{headerShown: false}}/>
        <Stack.Screen name='Bank' component={Bank} options={{headerShown: false}}/>
        <Stack.Screen name='Sucess' component={PaySucess} options={{headerShown: false}}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}


