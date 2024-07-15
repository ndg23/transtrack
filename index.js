/**
 * @format
 */
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { MMKV } from 'react-native-mmkv'

// export const storage = new MMKV({
//     id: `yunu jam`,
//     // path: `${USER_DIRECTORY}/storage`,
//     encryptionKey: 'AZERTYUIUYTRE234567876543',
//     // mode: Mode.MULTI_PROCESS
// })



export const storage = new MMKV({
    id: `transtrack`,
    encryptionKey: 'transtrack1507241101',
})
AppRegistry.registerComponent(appName, () => App);