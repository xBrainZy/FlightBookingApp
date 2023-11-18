import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Assignment4 from './components/Assignment4';
import LoginScreen from './components/LoginScreen';



const Stack = createNativeStackNavigator();

export default function App() {

    
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={LoginScreen} 
        />
        <Stack.Screen name='Assignment4' component={Assignment4} 
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}


