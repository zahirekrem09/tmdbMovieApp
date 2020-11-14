/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
import React from 'react';

import {Provider as ReduxProvider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';

import {userReducer} from './src/redux/userReduser';
import Router from './src/Router';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  wishList: ['wishList'],
};
const rootReducer = combineReducers({
  users: persistReducer(persistConfig, userReducer),
});
const store = createStore(rootReducer, applyMiddleware(thunk));
const appPersist = persistStore(store);
const App = () => {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={appPersist}>
        <Router />
      </PersistGate>
    </ReduxProvider>
  );
};

export default App;
