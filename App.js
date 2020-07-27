import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './redux/store';
import LoginContainer from './screens/login/LoginContainer';
import HomeContainer from './screens/app/home/HomeContainer';
import ActOfReconciliationContainer from './screens/app/actOfReconciliation/ActOfReconciliationContainer';
import WorksAndBalanceContainer from './screens/app/worksAndBalance/WorksAndBalanceContainer';
import PaymentContainer from './screens/app/home/payment/PaymentContainer';
import AccrualHistoryContainer from './screens/app/home/accrualHistory/AccrualHistoryContainer';
import RequestsContainer from './screens/app/requests/RequestsContainer';
import AddRequestsContainer from './screens/app/requests/addRequest/AddRequestContainer';
import SelectedRequestContainer from './screens/app/requests/selectedRequest/SelectedRequestContainer';
import AddCommentToSelectedRequestContainer from './screens/app/requests/selectedRequest/addComment/AddCommentToSelectedRequestContainer';

const StackHome = createStackNavigator();
const StackRequest = createStackNavigator();
const StackRequests = createStackNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStackScreen() {
  return (
    <StackHome.Navigator>
      <StackHome.Screen name="Home" component={HomeContainer} options={{ headerShown: false }} />
      <StackHome.Screen name="Payment" component={PaymentContainer} options={{ headerShown: false }} />
      <StackHome.Screen name="AccrualHistory" component={AccrualHistoryContainer} options={{ headerShown: false }}/>
    </StackHome.Navigator>
  );
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
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Act" component={ActOfReconciliationContainer} />
      <Tab.Screen name="Works and balance" component={WorksAndBalanceContainer} />
      <Tab.Screen name="Requests" component={RequestsStackScreen} />
    </Tab.Navigator>
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
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;