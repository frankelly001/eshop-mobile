/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import App from './App';
import {name as appName} from './app.json';
import {turnOfLocalPersistence} from './app/api/setup/config';

turnOfLocalPersistence();
AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));
