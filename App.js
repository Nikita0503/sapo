/*import * as React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './redux/store';
import LoginContainer from './screens/login/LoginContainer';
import HomeContainer from './screens/app/home/HomeContainer';
import ActOfReconciliationContainer from './screens/app/actOfReconciliation/ActOfReconciliationContainer';
import WorksAndBalanceContainer from './screens/app/worksAndBalance/WorksAndBalanceContainer';
import ExpensesContainer from './screens/app/worksAndBalance/expenses/ExpensesContainer';
import PaymentContainer from './screens/app/home/payment/PaymentContainer';
import AccrualHistoryContainer from './screens/app/home/accrualHistory/AccrualHistoryContainer';
import RequestsContainer from './screens/app/requests/RequestsContainer';
import AddRequestsContainer from './screens/app/requests/addRequest/AddRequestContainer';
import SelectedRequestContainer from './screens/app/requests/selectedRequest/SelectedRequestContainer';
import AddCommentToSelectedRequestContainer from './screens/app/requests/selectedRequest/addComment/AddCommentToSelectedRequestContainer';
import ProfileContainer from './screens/app/profile/ProfileContainer';
import AdsContainer from './screens/app/ads/AdsContainer';
import AddCommentToAdContainer from './screens/app/ads/addComment/AddCommentToAdContainer';
import ChatsContainer from './screens/app/chats/ChatsContainer';
import ChatContainer from './screens/app/chats/selectedChat/ChatContainer';
import PaymentSelectionContainer from './screens/app/home/liqpay/PaymentSelectionContainer';
import WebViewPaymentContainer from './screens/app/home/liqpay/paymentWebView/WebViewPaymentContainer';
import LoadingContainer from './screens/app/loading/LoadingContainer';

const StackLogin = createStackNavigator();
const StackGeneral = createStackNavigator();
const StackPayment = createStackNavigator();
const StackHome = createStackNavigator();
const StackWorkAndBalance = createStackNavigator();
const StackRequest = createStackNavigator();
const StackRequests = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const StackAds = createStackNavigator();
const StackChats = createStackNavigator();
const Stack = createStackNavigator();

function PaymentStackScreen() {
  return(
    <StackPayment.Navigator>
      <StackPayment.Screen name="PaymentSelection" component={PaymentSelectionContainer} options={{ headerShown: false }} /> 
      <StackPayment.Screen name="WebViewPayment" component={WebViewPaymentContainer} options={{ headerShown: false }} /> 
    </StackPayment.Navigator>
  );
}

function HomeStackScreen() {
  return (
    <StackHome.Navigator>
      <StackHome.Screen name="Home" component={HomeContainer} options={{ headerShown: false }} />
      <StackHome.Screen name="Payment" component={PaymentContainer} options={{ headerShown: false }} />
      <StackHome.Screen name="AccrualHistory" component={AccrualHistoryContainer} options={{ headerShown: false }}/>
      <StackHome.Screen name="PaymentSelection" component={PaymentStackScreen} options={{ headerShown: false }} />
    </StackHome.Navigator>
  );
}

function StackWorkAndBalanceScreen() {
  return (
    <StackWorkAndBalance.Navigator>
      <StackWorkAndBalance.Screen name="WorksAndBalance" component={WorksAndBalanceContainer} options={{ headerShown: false }}/>
      <StackWorkAndBalance.Screen name="Expenses" component={ExpensesContainer} options={{ headerShown: false }}/>
    </StackWorkAndBalance.Navigator>
  )
}

function RequestStackScreen() {
  return (
    <StackRequest.Navigator>
      <StackRequest.Screen name="SelectedRequest" component={SelectedRequestContainer} options={{ headerShown: false }} />
      <StackRequest.Screen name="AddComment" component={AddCommentToSelectedRequestContainer} options={{ headerShown: false }} />
    </StackRequest.Navigator>
  )
}

function RequestsStackScreen() {
  return (
    <StackRequests.Navigator>
      <StackRequests.Screen name="Requests" component={RequestsContainer} options={{ headerShown: false }} />
      <StackRequests.Screen name="AddRequest" component={AddRequestsContainer} options={{ headerShown: false }} />
      <StackRequests.Screen name="SelectedRequest" component={RequestStackScreen} options={{ headerShown: false }} />
    </StackRequests.Navigator>
  );
}

function Menu() {
  return (
    <Tab.Navigator
        labeled={false}
        activeColor="#f0edf6"
        inactiveColor="#3e2465"
        barStyle={{ backgroundColor: '#002B2B' }} >
      <Tab.Screen 
        name="Головна"
        component={HomeStackScreen} 
        options={{
          tabBarIcon: ({ focused }) => <Image resizeMode='contain' style={{width: 40, height: 40}} 
            source={focused ? 
              require('./content/images/ic_home_white.png') 
              :
              require('./content/images/ic_home_gray.png') }/>
        }} />
      <Tab.Screen 
        name="Акт звіряння" 
        component={ActOfReconciliationContainer} 
        options={{
          tabBarIcon: ({ focused }) => <Image resizeMode='contain' style={{width: 40, height: 40}} 
            source={focused ? 
              require('./content/images/ic_text_box_check_white.png') 
              :
              require('./content/images/ic_text_box_check_gray.png') }/>
        }} />
      <Tab.Screen 
        name="Роботи та сальдо"
        component={StackWorkAndBalanceScreen}
        options={{
          tabBarIcon: ({ focused }) => <Image resizeMode='contain' style={{width: 40, height: 40}} 
            source={focused ? 
              require('./content/images/ic_wrench_white.png') 
              :
              require('./content/images/ic_wrench_gray.png') }/>
        }}  />
      <Tab.Screen 
        name="Заявки"
        component={RequestsStackScreen}
        options={{
          tabBarIcon: ({ focused }) => <Image resizeMode='contain' style={{width: 40, height: 40}} 
            source={focused ? 
              require('./content/images/ic_map_marker_white.png') 
              :
              require('./content/images/ic_map_marker_gray.png') }/>
        }}  />
    </Tab.Navigator>
  );
}

function Ads() {
  return (
    <StackAds.Navigator>
      <StackAds.Screen name="Ads" component={AdsContainer} options={{ headerShown: false }}/>
      <StackAds.Screen name="AddCommentToAd" component={AddCommentToAdContainer} options={{ headerShown: false }}/>
    </StackAds.Navigator>
  );
}

function Chats() {
  return (
      <StackChats.Navigator>
        <StackChats.Screen name="Chats" component={ChatsContainer} options={{ headerShown: false }}/>
        <StackChats.Screen name="Chat" component={ChatContainer} options={{ headerShown: false }}/>      
      </StackChats.Navigator>
  );
}

function Login() {
  return (
      <StackLogin.Navigator>
        <StackLogin.Screen name="Login" component={LoginContainer} options={{ headerShown: false }}/>
      </StackLogin.Navigator>
    );
}

function General() {
  return (
      <StackGeneral.Navigator screenOptions={{ gestureEnabled: false }}>
        <StackGeneral.Screen name="Menu" component={Menu} options={{ headerShown: false, headerLeft: null }}/>
        <StackGeneral.Screen name="Profile" component={ProfileContainer} options={{ headerShown: false }}/>
        <StackGeneral.Screen name="Ads" component={Ads} options={{ headerShown: false }}/>
        <StackGeneral.Screen name="Chats" component={Chats} options={{ headerShown: false }} />
      </StackGeneral.Navigator>
  );
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
            <Stack.Screen name="General" component={General} options={{ headerShown: false }}/>
            <Stack.Screen name="Loading" component={LoadingContainer} options={{ headerShown: false }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}


export default App;
*/

import React, { Component } from 'react';
import { Image } from 'react-native';
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
    Home: {
      screen: Home, 
      navigationOptions: {tabBarIcon: ({ focused }) => <Image resizeMode='contain' style={{width: 40, height: 40}} 
        source={focused ? 
          require('./content/images/ic_home_white.png') 
          :
          require('./content/images/ic_home_gray.png') }/>}},
    ActOfReconciliation: {
      screen: ActOfReconciliationContainer, 
      navigationOptions: {tabBarIcon: ({ focused }) => <Image resizeMode='contain' style={{width: 40, height: 40}} 
        source={focused ? 
          require('./content/images/ic_text_box_check_white.png') 
          :
          require('./content/images/ic_text_box_check_gray.png') }/>}},
    WorkAndBalance: {
      screen: WorkAndBalance,
      navigationOptions: {tabBarIcon: ({ focused }) => <Image resizeMode='contain' style={{width: 40, height: 40}} 
        source={focused ? 
          require('./content/images/ic_wrench_white.png') 
          :
          require('./content/images/ic_wrench_gray.png') }/>}},
    Requests: {
      screen: Requests,
      navigationOptions: {tabBarIcon: ({ focused }) => <Image resizeMode='contain' style={{width: 40, height: 40}} 
        source={focused ? 
          require('./content/images/ic_map_marker_white.png') 
          :
          require('./content/images/ic_map_marker_gray.png') }/>}}
}, 
{
  tabBarOptions: {
    showLabel: false,
    activeBackgroundColor: '#002B2B',
    inactiveBackgroundColor: '#002B2B',
    activeTintColor: 'white'
  }
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