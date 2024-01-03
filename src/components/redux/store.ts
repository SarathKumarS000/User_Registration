import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {ThunkMiddleware} from 'redux-thunk';
import thunk from 'redux-thunk';
import {appReducer} from './reducers';

const store = configureStore({
  reducer: appReducer,
  middleware: getDefaultMiddleware =>
    [...getDefaultMiddleware<ThunkMiddleware>(), thunk] as const,
});

export default store;
