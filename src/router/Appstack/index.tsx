// AppStack.js
import React from 'react';
import { NavigationContainer, } from '@react-navigation/native';
import HomeScreen from '../../screen/home';
import AddUserScreen from '../../screen/user/add-user';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ScanScreen from '../../screen/scan';
import HistoryScreen from '../../screen/history';

const Stack = createNativeStackNavigator();

const AppStack = () => {
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
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="AddUser" 
          component={AddUserScreen} 
          options={{ title: 'Add User' }}
        />
        <Stack.Screen 
          name="Scan" 
          component={ScanScreen} 
          options={{ title: 'Scan User' }}
        />

<Stack.Screen 
          name="History" 
          component={HistoryScreen} 
          options={{ title: 'History' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;

