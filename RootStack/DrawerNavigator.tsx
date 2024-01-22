import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Profile from '../src/components/pages/Home/Profile';
import DrawerMenu from '../src/components/drawer/DrawerMenu';

const DrawerNavigators = () => {
  const Drawer = createDrawerNavigator();
  const drawerContent = () => <DrawerMenu />;
  return (
    <Drawer.Navigator
      drawerContent={drawerContent}
      screenOptions={{headerShown: false}}>
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigators;
