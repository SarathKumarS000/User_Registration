import React from 'react';
// import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Signup from './src/components/pages/SignUp';
import Login from './src/components/pages/SignIn';
import Home from './src/components/pages/Home';
import Profile from './src/components/pages/Profile';
import UserDetails from './src/components/pages/UserDetails';
// import {store, persistor} from './src/components/redux/store';
// import {PersistGate} from 'redux-persist/integration/react';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    // <Provider store={store}>
    //   <PersistGate persistor={persistor}>
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
    </NavigationContainer>
    //   </PersistGate>
    // </Provider>
  );
};

export default App;
