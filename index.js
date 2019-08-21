import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import ignoreWarnings from 'react-native-ignore-warnings'

ignoreWarnings('Setting a timer')

AppRegistry.registerComponent(appName, () => App);
