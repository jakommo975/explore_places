import {  } from 'expo-status-bar';
import React from 'react';
import { LogBox } from 'react-native';
import { StyleSheet,} from 'react-native';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider, useDispatch} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import PlacesNavigation from './navigation/PlacesNavigation';
import placesReducer from './store/places-reducer';
import * as db from './helpers/db';


import authReducer from './store/auth-reducer';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications


db.init().then(() => {
  console.log('Iniialized daabase');
}).catch(err => {
  console.log("Initializing database failed");
  console.log(err);
});

const rootReducer = combineReducers({
  places: placesReducer,
  auth: authReducer
});

const store = createStore(
  rootReducer, 
  composeWithDevTools(
    applyMiddleware(ReduxThunk)
  )
);






export default function App() {

  return <Provider store={store}>
    <PlacesNavigation/>
  </Provider>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
