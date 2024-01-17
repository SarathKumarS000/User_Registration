import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './src/components/pages/Home';
import Signup from './src/components/pages/SignUp';
import Login from './src/components/pages/SignIn';
import Profile from './src/components/pages/Profile';
import UserDetails from './src/components/pages/UserDetails';

const Stack = createNativeStackNavigator();

const NavigationStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={Signup}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignIn"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserDetails"
        component={UserDetails}
        options={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitle: '',
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default NavigationStack;
