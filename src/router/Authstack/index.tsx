// AuthStack.js
import React from 'react';
import { NavigationContainer, } from '@react-navigation/native';
import HomeScreen from '../../screen/home';
import AddUserScreen from '../../screen/user/add-user';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ScanScreen from '../../screen/scan';
import LoginScreen from '../../screen/auth/login';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
         
          headerTitleStyle: {
            fontWeight: '600',
            color: '#333',
          },
          headerTintColor: '#007AFF',
        }}
      >
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }}
        />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStack;