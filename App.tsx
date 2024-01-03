// Import necessary modules and components from React, Redux, and React Navigation
import React from 'react';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import userReducer from './src/components/redux/reducers';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Signup from './src/components/pages/SignUp';
import Login from './src/components/pages/SignIn';
import Home from './src/components/pages/Home';
import Profile from './src/components/pages/Profile';
import UserDetails from './src/components/pages/UserDetails';

// Create a Redux store with the userReducer as the root reducer
const store = configureStore({
  reducer: userReducer,
});
// Create a stack navigator using React Navigation
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    // Use the Redux Provider to make the Redux store available to all components
    <Provider store={store}>
      {/* Set up the navigation container for navigation in the app */}
      <NavigationContainer>
        {/* Create a stack navigator with various screens */}
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
