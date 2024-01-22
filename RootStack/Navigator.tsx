import React from 'react';
import DrawerNavigators from './DrawerNavigator';
import {useSelector} from 'react-redux';
import {RootState} from '../src/components/redux/rootReducer';
import NavigationStack from './NavigationStack';

const Navigators = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.loggedUser);

  return <>{isLoggedIn ? <DrawerNavigators /> : <NavigationStack />}</>;
};

export default Navigators;
