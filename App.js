/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import { StatusBar } from 'react-native';
 import { Provider } from 'react-redux';
 import MainScreen from './app/MainScreen';
 import store from './app/redux/store/index';
 
 const App = () => {
 
   return (
     <Provider store={store}>
       <StatusBar barStyle='light-content' backgroundColor={'transparent'} />
       <MainScreen />
     </Provider>
   );
 };
 
 export default App;
 