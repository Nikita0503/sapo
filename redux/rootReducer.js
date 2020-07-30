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
import {actOfReconciliationReducer} from './actOfReconciliation/reducers';
import {profileReducer} from './profile/reducers';
import {advertisementReducer} from './ads/reducers'
import {addCommentToAdvertisementReducer} from './ads/addComment/reducers';
import {allChatsReducer} from './chats/reducers';
import {selectedChatReducer} from './chats/selectedChat/reducers';
import {paymentSelectionReducer} from './home/liqpay/reducers';
import {houseReducer} from './worksAndBalance/reducers';
import {houseExpensesReducer} from './worksAndBalance/expenses/reducers';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['login']
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
    addCommentToOffer: addCommentToOfferReducer,
    actOfReconciliation: actOfReconciliationReducer,
    profile: profileReducer,
    advertisement: advertisementReducer,
    addCommentToAdvertisement: addCommentToAdvertisementReducer,
    allChats: allChatsReducer,
    selectedChat: selectedChatReducer,
    paymentSelection: paymentSelectionReducer,
    house: houseReducer,
    houseExpenses: houseExpensesReducer
});

export default persistReducer(persistConfig, rootReducer);