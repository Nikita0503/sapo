import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
//import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-community/async-storage';

import {loginReducer} from './login/reducers';
import {homeReducer} from './home/reducers';
import {headerReducer} from './monthPicker/reducers'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['']
}

const rootReducer = combineReducers({
    login: loginReducer,
    home: homeReducer,
    header: headerReducer
});

export default persistReducer(persistConfig, rootReducer);