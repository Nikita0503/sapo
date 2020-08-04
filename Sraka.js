import React, { Component } from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './redux/store';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import LoginContainer from './screens/login/LoginContainer';
import ChatsContainer from './screens/app/chats/ChatsContainer';
import ChatContainer from './screens/app/chats/selectedChat/ChatContainer';
import AdsContainer from './screens/app/ads/AdsContainer';
import AddCommentToAdContainer from './screens/app/ads/addComment/AddCommentToAdContainer';
import ProfileContainer from './screens/app/profile/ProfileContainer'; 
import HomeContainer from './screens/app/home/HomeContainer';
import PaymentContainer from './screens/app/home/payment/PaymentContainer';
import AccrualHistoryContainer from './screens/app/home/accrualHistory/AccrualHistoryContainer';
import PaymentSelectionContainer from './screens/app/home/liqpay/PaymentSelectionContainer';
import WebViewPaymentContainer from './screens/app/home/liqpay/paymentWebView/WebViewPaymentContainer';
import ActOfReconciliationContainer from './screens/app/actOfReconciliation/ActOfReconciliationContainer';
import WorksAndBalanceContainer from './screens/app/worksAndBalance/WorksAndBalanceContainer';
import ExpensesContainer from './screens/app/worksAndBalance/expenses/ExpensesContainer';
import RequestsContainer from './screens/app/requests/RequestsContainer';
import AddRequestsContainer from './screens/app/requests/addRequest/AddRequestContainer';
import SelectedRequestContainer from './screens/app/requests/selectedRequest/SelectedRequestContainer';
import AddCommentToSelectedRequestContainer from './screens/app/requests/selectedRequest/addComment/AddCommentToSelectedRequestContainer';

const Payments = createStackNavigator({
    PaymentSelection: {screen: PaymentSelectionContainer, navigationOptions: {header: null}},
    WebViewPayment: {screen: WebViewPaymentContainer, navigationOptions: {header: null}}
})

const Home = createStackNavigator({
    Home: {screen: HomeContainer, navigationOptions: {header: null}},
    Payment: {screen: PaymentContainer, navigationOptions: {header: null}},
    AccrualHistory: {screen: AccrualHistoryContainer, navigationOptions: {header: null}},
    PaymentSelection: {screen: Payments, navigationOptions: {header: null}}
})

const WorkAndBalance = createStackNavigator({
    WorksAndBalance: {screen: WorksAndBalanceContainer, navigationOptions: {header: null}},
    Expenses: {screen: ExpensesContainer, navigationOptions: {header: null}}
})

const Request = createStackNavigator({
    SelectedRequest: {screen: SelectedRequestContainer, navigationOptions: {header: null}},
    AddComment: {screen: AddCommentToSelectedRequestContainer, navigationOptions: {header: null}}
})

const Requests = createStackNavigator({
    Requests: {screen: RequestsContainer, navigationOptions: {header: null}},
    AddRequest: {screen: AddRequestsContainer, navigationOptions: {header: null}},
    SelectedRequest: {screen: Request, navigationOptions: {header: null}}
})

const Menu = createBottomTabNavigator({
    Home: Home,
    ActOfReconciliation: ActOfReconciliationContainer,
    WorkAndBalance: WorkAndBalance,
    Requests: Requests
})

const Chats = createStackNavigator({
    Chats: {screen: ChatsContainer, navigationOptions: {header: null}},
    Chat: {screen: ChatContainer, navigationOptions: {header: null}}
})

const Ads = createStackNavigator({
    Ads: {screen: AdsContainer, navigationOptions: {header: null}},
    AddCommentToAd: {screen: AddCommentToAdContainer, navigationOptions: {header: null}}
})

const General = createStackNavigator({
    Menu: {screen: Menu, navigationOptions: {header: null}},
    Chats: {screen: Chats, navigationOptions: {header: null}},
    Ads: {screen: Ads, navigationOptions: {header: null}},
    Profile: {screen: ProfileContainer, navigationOptions: {header: null}}
});

const Login = createStackNavigator({
    Login: {screen: LoginContainer, navigationOptions: {header: null}}
});

const AppNavigator = createSwitchNavigator({
  Login: {screen: Login},
  General: {screen: General}
});

let Navigation = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    );
  }
}