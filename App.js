import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginForm from './screens/LoginForm';
import Home from './screens/Home';

const Stack = createStackNavigator();

export default function App(){
    return (
    <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginForm} options={{headerShown:false}}/>
        <Stack.Screen name="Home" component={Home}  options={{headerShown:false}}/>
        </Stack.Navigator>
    </NavigationContainer>
    );
}


