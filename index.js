/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
if (__DEV__) {

    console.log();
} else {
    console.log = function () {};
}
AppRegistry.registerComponent(appName, () => App);
