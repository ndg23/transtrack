// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../../screen/home';
import AddUserScreen from '../../screen/user/add-user';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: '#f0f0f0',
          },
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;