import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
//import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-community/async-storage';

import {loginReducer} from './login/reducers';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['']
}

const rootReducer = combineReducers({
    login: loginReducer
});

export default persistReducer(persistConfig, rootReducer);