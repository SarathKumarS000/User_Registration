import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {store, persistor} from './src/components/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import Navigators from './RootStack/Navigator';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Navigators />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
