import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Signup from './src/components/pages/SignUp';
import Login from './src/components/pages/SignIn';
import Home from './src/components/pages/Home';
import Profile from './src/components/pages/Profile';
import UserDetails from './src/components/pages/UserDetails';
import store from './src/components/redux/store';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
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
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
