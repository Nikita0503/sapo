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
import RequestsContainer from './screens/app/requests/RequestsContainer';
import PaymentContainer from './screens/app/home/payment/PaymentContainer';
import AccrualHistoryContainer from './screens/app/home/accrualHistory/AccrualHistoryContainer';

const Stack = createStackNavigator();
const StackHome = createStackNavigator()
const Tab = createBottomTabNavigator();

function HomeStackScreen() {
  return (
    <StackHome.Navigator>
      <StackHome.Screen name="Home" component={HomeContainer} options={{ headerShown: false }} />
      <StackHome.Screen name="Payment" component={PaymentContainer} options={{ headerShown: false }} />
      <StackHome.Screen name="AccrualHistory" component={AccrualHistoryContainer} options={{ headerShown: false }}/>
    </StackHome.Navigator>
  );
}

function Menu() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Act" component={ActOfReconciliationContainer} />
      <Tab.Screen name="Works and balance" component={WorksAndBalanceContainer} />
      <Tab.Screen name="Requests" component={RequestsContainer} />
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