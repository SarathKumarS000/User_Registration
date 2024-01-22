import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {TouchableOpacity, View, Image} from 'react-native';
import UserDetails from './UserDetails';
import styles from '../../Styles';
import Home from './Home';

const AppStack = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();

  const headerIcon = () => (
    <TouchableOpacity
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
      <View style={styles.hamburgerIconContainer}>
        <Image
          source={require('../../assets/hamburger-icon.png')}
          style={styles.hamburgerIcon}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: 'black'},
        headerTintColor: 'white',
        headerTitleAlign: 'center',
        headerTitle: '',
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerLeft: headerIcon}}
      />
      <Stack.Screen name="UserDetails" component={UserDetails} />
    </Stack.Navigator>
  );
};

export default AppStack;
