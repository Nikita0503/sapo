import * as React from 'react';
import {Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginContainer} options={{ headerShown: false }}/>
            <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }}/>
            <Stack.Screen name="Profile" component={ProfileContainer} options={{ headerShown: false }}/>
            <Stack.Screen name="Ads" component={Ads} options={{ headerShown: false }}/>
            <Stack.Screen name="Chats" component={Chats} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;