import React from 'react';
import DrawerNavigators from './DrawerNavigator';
import NavigationStack from './NavigationStack';
import {useIsLoggedIn} from '../src/components/common/Selectors';

const Navigators = () => {
  const isLoggedIn = useIsLoggedIn();

  return <>{isLoggedIn ? <DrawerNavigators /> : <NavigationStack />}</>;
};

export default Navigators;
