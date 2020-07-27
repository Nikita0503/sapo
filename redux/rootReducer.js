import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
//import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-community/async-storage';

import {loginReducer} from './login/reducers';
import {homeReducer} from './home/reducers';
import {headerReducer} from './monthPicker/reducers';
import {paymentsReducer} from './home/payment/reducers';
import {accrualHistoryReducer} from './home/accrualHistory/reducers';
import {applicationsAndOffersReducer} from './requests/reducers';
import {addOfferReducer} from './requests/addRequest/reducers';
import {selectedOfferReducer} from './requests/selectedRequest/reducers';
import {addCommentToOfferReducer} from './requests/selectedRequest/addComment/reducers';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['']
}

const rootReducer = combineReducers({
    login: loginReducer,
    home: homeReducer,
    header: headerReducer,
    payments: paymentsReducer,
    accrualHistory: accrualHistoryReducer,
    applicationsAndOffers: applicationsAndOffersReducer,
    addOffer: addOfferReducer,
    selectedOffer: selectedOfferReducer,
    addCommentToOffer: addCommentToOfferReducer
});

export default persistReducer(persistConfig, rootReducer);