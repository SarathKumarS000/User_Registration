import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {store, persistor} from './src/components/redux/store';
import {PersistGate} from 'redux-persist/integration/react';

import HomeStack from './NavigationStack';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <HomeStack />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
