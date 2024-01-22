import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../src/components/pages/LandingScreen';
import Signup from '../src/components/pages/SignUp';
import Login from '../src/components/pages/SignIn';

const NavigationStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="SignUp" component={Signup} />
      <Stack.Screen name="SignIn" component={Login} />
    </Stack.Navigator>
  );
};

export default NavigationStack;
