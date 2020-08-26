import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import ScreenHeader from '../../../components/ScreenHeader';
import MonthPickerContainer from '../../../components/monthPicker/MonthPickerContainer';
import DataComponent from '../../../components/dataComponents/DataComponent';
import DataClickableComponent from '../../../components/dataComponents/DataClickableComponent';
import { ScrollView } from 'react-native-gesture-handler';

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.onUserDataChange = this.onUserDataChange.bind(this);
    this.onOsbbIdChange = this.onOsbbIdChange.bind(this);
    this.onAccountIdChange = this.onAccountIdChange.bind(this);
    this.onAccountIdsChange = this.onAccountIdsChange.bind(this);
    this.onNumberChange = this.onNumberChange.bind(this);
    this.onWorkPeriodsChange = this.onWorkPeriodsChange.bind(this);
    this.onCurrentWorkPeriodChange = this.onCurrentWorkPeriodChange.bind(this);
    this.onAllApartmentDataChange = this.onAllApartmentDataChange.bind(this);
    this.onCurrentApartmentDataChange = this.onCurrentApartmentDataChange.bind(
      this
    );
    this.onAllCostsDataChange = this.onAllCostsDataChange.bind(this);
    this.onCurrentCostsDataChange = this.onCurrentCostsDataChange.bind(this);
    this.onDebtDataChange = this.onDebtDataChange.bind(this);
    this.onLiqpayDataChange = this.onLiqpayDataChange.bind(this);
    this.onSetIsActivatedChange = this.onSetIsActivatedChange.bind(this);
    this.onClearState = this.onClearState.bind(this);
  }

  onDebtDataChange(debtData){
    this.props.setDebtData(debtData);
  }

  onUserDataChange(userData) {
    this.props.setUserData(userData);
  }

  onOsbbIdChange(osbbId) {
    this.props.setOsbbId(osbbId);
  }

  onAccountIdChange(accountId) {
    this.props.setAccountId(accountId);
  }

  onAccountIdsChange(accountIds) {
    this.props.setAccountIds(accountIds);
  }

  onNumberChange(number) {
    this.props.setNumber(number);
  }

  onWorkPeriodsChange(workPeriods) {
    this.props.setWorkPeriods(workPeriods);
  }

  onCurrentWorkPeriodChange(currentWorkPeriod) {
    this.props.setCurrentWorkPeriod(currentWorkPeriod);
  }

  onAllApartmentDataChange(allApartmentData) {
    this.props.setAllApartmentData(allApartmentData);
  }

  onCurrentApartmentDataChange(currentApartmentData) {
    this.props.setCurrentApartmentData(currentApartmentData);
  }

  onAllCostsDataChange(allCostsData) {
    this.props.setAllCostsData(allCostsData);
  }

  onCurrentCostsDataChange(currentCostsData) {
    this.props.setCurrentCostsData(currentCostsData);
  }

  onAllHouseDataChange(allHouseData) {
    this.props.setAllHouseData(allHouseData);
  }

  onLiqpayDataChange(liqpayData){
    this.props.setLiqpayData(liqpayData);
  }

  onSetIsActivatedChange(isActivated){
    this.props.setIsActivated(isActivated)
  }

  onClearState() {
    this.props.clearState()
  }

  componentDidMount() {
    this.getIsLoaded()
    this.props.clearState()
    this.props.fetchUserData(this.props.token)
    this.props.fetchApartmentData(this.props.token, this.props.navigation)
  }

  render() {
    return (
      <ScrollView style={{backgroundColor: '#F9F9F9'}}>
        <View style={styles.container}>
          <ScreenHeader
            title={"Головна"} 
            navigation={this.props.navigation}
            userData={this.props.userData}
            imageAvatar={this.props.imageAvatar}
          />
          <MonthPickerContainer/>
          {this.getPayment()}
          {this.getGeneralData()}
        </View>
      </ScrollView>
    );
  }

  getIsLoaded() {
    if (
      this.props.workPeriods.length == 0
    ) {
      this.props.navigation.navigate('Loading');
    }
  }

  getPayment(){
    return(
      <View style={{width: '95%', alignItems: 'center'}}>
        <View
          style={{
            marginTop: 5,
            width: '100%',
            backgroundColor: 'white',
            alignItems: 'center',
            borderRadius: 15
          }}>
            <Text
              style={{
                marginTop: 10,
                marginBottom: 2,
                color: '#002B2B',
                fontSize: 18,
              }}>
              До сплати за
            </Text>
            <Text
              style={{
                marginTop: 2,
                marginBottom: 2,
                color: '#002B2B',
                fontSize: 18,
              }}>
              {this.getLastPeriod()}
            </Text>
            <Text
              style={{
                marginTop: 2,
                fontWeight: 'bold',
                marginBottom: 10,
                color: '#002B2B',
                fontSize: 18,
              }}>
              {this.getDebtByCurrentAccountId()} грн.
            </Text>
          {this.getPaymentButton()}
        </View>
      </View>
    );
  }

  getPaymentButton(){
    return (
      <TouchableOpacity
        onPress={() => {
          if(this.props.liqpayData == null) {
            Alert.alert(
              'Повідомлення',
              'Немає підключених способів оплати. Зверніться до правління ОСББ',
              [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              { cancelable: true }
            )
          }else{
            if(this.props.liqpayData[0].liqPayPrivateKey != null){
              this.props.navigation.navigate('PaymentSelection');
            }else{
              Alert.alert(
                'Повідомлення',
                'Немає підключених способів оплати. Зверніться до правління ОСББ',
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: true }
              )
            }
          }
        }}>
        <View
          style={{
            backgroundColor: '#002B2B',
            padding: 10,
            marginBottom: 10,
            borderRadius: 12
          }}>
          <Text style={{ color: 'white' }}>ОПЛАТИТИ</Text>
        </View>
      </TouchableOpacity>
      );
    }

  getGeneralData() {
    if (this.props.allApartmentData.length == 0) return;
    var currentApartmentData;
    for (var i = 0; i < this.props.allApartmentData.length; i++) {
      if (
        this.props.allApartmentData[i].workPeriod ==
          this.props.currentWorkPeriod &&
        this.props.allApartmentData[i].accountId.id == this.props.accountId.id
      ) {
        currentApartmentData = this.props.allApartmentData[i];
        break;
      }
    }
    return (
      <View style={styles.containerGeneralData}>
        <DataComponent
          name="Сальдо на початок"
          number={getStartBalance(currentApartmentData)}
        />
        <TouchableOpacity
          onPress={() => {this.props.navigation.navigate("AccrualHistory")}}>
          <DataClickableComponent
            name="Нараховано"
            number={getAccruals(currentApartmentData)}
          />
        </TouchableOpacity>
        <DataComponent
          name="Пільги"
          number={getPrivileges(currentApartmentData)}
        />
        <DataComponent
          name="Субсидії"
          number={getSubsidies(currentApartmentData)}
        />
        <TouchableOpacity
          onPress={() => {this.props.navigation.navigate("Payment")}}>
          <DataClickableComponent
            name="Оплати"
            number={getPayments(currentApartmentData)}
          />
        </TouchableOpacity>
        <DataComponent
          name="Сальдо на кінець"
          number={getFinishBalance(currentApartmentData)}
        />
      </View>
    );
  }

  getLastPeriod(){
    if(this.props.workPeriods[this.props.workPeriods.length - 1] == null) return;
    return(getMonthByPeriod(this.props.workPeriods[this.props.workPeriods.length - 1]));
  }

  getDebtByCurrentAccountId(){
    if(this.props.accountId == null) return null
    for(var i = 0; i < this.props.debtData.length; i++){
      if(this.props.accountId.number == this.props.debtData[i].accountId.number){
        
        return this.props.debtData[i].debt
      }else{
        
      }
    }
  }
}

function getStartBalance(dataForCurrentPeriod) {
  if (dataForCurrentPeriod == null) return '0.00';
  var sumStartBalance = 0;
  for (var i = 0; i < dataForCurrentPeriod.data.length; i++) {
    sumStartBalance += dataForCurrentPeriod.data[i].startBalance;
  }
  return sumStartBalance.toFixed(2);
}

function getAccruals(dataForCurrentPeriod) {
  if (dataForCurrentPeriod == null) return '0.00';
  var sumAccruals = 0;
  for (var i = 0; i < dataForCurrentPeriod.data.length; i++) {
    sumAccruals += dataForCurrentPeriod.data[i].totalAccruals;
  }
  return sumAccruals.toFixed(2);
}

function getSubsidies(dataForCurrentPeriod) {
  if (dataForCurrentPeriod == null) return '0.00';
  var sumSubsidies = 0;
  for (var i = 0; i < dataForCurrentPeriod.data.length; i++) {
    if(dataForCurrentPeriod.data[i].totalSubsidies != null)
    sumSubsidies += parseFloat(dataForCurrentPeriod.data[i].totalSubsidies);
  }
  return sumSubsidies.toFixed(2);
}

function getPrivileges(dataForCurrentPeriod) {
  if (dataForCurrentPeriod == null) return '0.00';
  var sumPrivileges = 0;
  //console.log(dataForCurrentPeriod)
  for (var i = 0; i < dataForCurrentPeriod.data.length; i++) {
    if(dataForCurrentPeriod.data[i].totalPrivileges != null){
      sumPrivileges += parseFloat(dataForCurrentPeriod.data[i].totalPrivileges);
    }
  }
  return sumPrivileges.toFixed(2);
}

function getPayments(dataForCurrentPeriod) {
  if (dataForCurrentPeriod == null) return '0.00';
  var sumPayments = 0;
  for (var i = 0; i < dataForCurrentPeriod.data.length; i++) {
    if (dataForCurrentPeriod.data[i].totalPayments != null) {
      sumPayments += parseFloat(dataForCurrentPeriod.data[i].totalPayments);
    }
  }
  return sumPayments.toFixed(2);
}

function getFinishBalance(dataForCurrentPeriod) {
  if (dataForCurrentPeriod == null) return '0.00';
  var sumFinishBalance = 0;
  for (var i = 0; i < dataForCurrentPeriod.data.length; i++) {
    sumFinishBalance += dataForCurrentPeriod.data[i].finishBalance;
  }
  return sumFinishBalance.toFixed(2);
}

function getMonth(data) {
  var month;
  switch (data.substring(0, data.length - 5)) {
    case 'Січень':
      month = '01';
      break;
    case 'Лютий':
      month = '02';
      break;
    case 'Березень':
      month = '03';
      break;
    case 'Квітень':
      month = '04';
      break;
    case 'Травень':
      month = '05';
      break;
    case 'Червень':
      month = '06';
      break;
    case 'Липень':
      month = '07';
      break;
    case 'Серпень':
      month = '08';
      break;
    case 'Вересень':
      month = '09';
      break;
    case 'Жовтень':
      month = '10';
      break;
    case 'Листопад':
      month = '11';
      break;
    case 'Грудень':
      month = '12';
      break;
  }
  return month + data.substring(data.length - 4, data.length);
}

function getMonthByPeriod(data) {
  var month;
  switch (data.substring(0, data.length - 4)) {
    case '01':
      month = 'Січень ';
      break;
    case '02':
      month = 'Лютий ';
      break;
    case '03':
      month = 'Березень ';
      break;
    case '04':
      month = 'Квітень ';
      break;
    case '05':
      month = 'Травень ';
      break;
    case '06':
      month = 'Червень ';
      break;
    case '07':
      month = 'Липень ';
      break;
    case '08':
      month = 'Серпень ';
      break;
    case '09':
      month = 'Вересень ';
      break;
    case '10':
      month = 'Жовтень ';
      break;
    case '11':
      month = 'Листопад ';
      break;
    case '12':
      month = 'Грудень ';
      break;
  }
  return month + data.substring(data.length - 4, data.length);
}

function getMonthByUTC(utc) {
  var myDate = new Date();
  var tzo = (myDate.getTimezoneOffset() / 60) * -1;
  var localDate = new Date(utc);

  localDate.setHours(localDate.getHours() + tzo + 1);

  var month = '';
  if (localDate.getMonth() + 1 < 10) {
    month += '0';
  }
  month += localDate.getMonth() + 1;
  month += localDate.getFullYear();
  return month;
}

function getSumDebt(data) { 
  let sum = 0;
  for (var i = 0; i < data.length; i++) {
    sum += data[i].finishBalance;
  }
  return sum.toFixed(2);
}

function fetchDebt(token, accountIds, osbbId, lastWorkPeriod, onDebtDataChange) {
  fetchDebtByAccountId(token, accountIds, 0, osbbId, lastWorkPeriod, onDebtDataChange);
}

function fetchDebtByAccountId(token, accountIds, index, osbbId, lastWorkPeriod, onDebtDataChange){
  fetch(
    'https://app.sapo365.com/api/tenant/charges/total?accountId=' +
      accountIds[index].id +
      '&osbbId=' +
      osbbId +
      '&workPeriod=' +
      lastWorkPeriod,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token + '',
      },
    }
  )
    .then(response => response.json())
    .then(responseJson => {
      var sum = getSumDebt(responseJson.chargesList);
      //console.log('onChargesDataChange', accountIds[index].id + " " + sum);
      var obj = {
        accountId: accountIds[index],
        debt: sum
      }
      onDebtDataChange(obj);
      index++;
      if(index != accountIds.length){
        //console.log("index", index)
        fetchDebtByAccountId(token, accountIds, index, osbbId, lastWorkPeriod, onDebtDataChange)
      }
    })
    .catch(error => {
      console.error(error);
    });
}

function fetchApartmentData(
  token,
  navigation,
  onOsbbIdChange,
  onAccountIdChange,
  onAccountIdsChange,
  onNumberChange,
  onWorkPeriodsChange,
  onCurrentWorkPeriodChange,
  onAllApartmentDataChange,
  onCurrentApartmentDataChange,
  onAllCostsDataChange,
  onCurrentCostsDataChange,
  onDebtDataChange,
  onLiqpayDataChange,
  onSetIsActivatedChange
) {
  var ws = new WebSocket(
    'wss://app.sapo365.com/socket.io/?auth_token=' +
      token +
      '&EIO=3&transport=websocket'
  );

  ws.onmessage = e => {
    // a message was received
    if (e.data.substring(0, 2) == '42') {
      const myObjStr = JSON.stringify(e.data.substring(2, e.data.length));
      var myObj = JSON.parse(myObjStr);
      var data = JSON.parse(myObj);
      //console.log("START", data[1].UserData.isActivated)
      onSetIsActivatedChange(data[1].UserData.isActivated)
      if(!data[1].UserData.isActivated){
        Alert.alert('Повідомлення', 'Аккаунт не було активовано головою САПО')
        navigation.navigate('Auth')
        return
      } 
      onOsbbIdChange(data[1].OsbbData.OsbbId);

      var osbbIds = new Array();
      for (var i = 0; i < data[1].UserAccounts.length; i++) {
        osbbIds.push({
          id: data[1].UserAccounts[i].id,
          number: data[1].UserAccounts[i].number,
        });
      }
      var uniqAccountIds = getUniqueAccountIds(osbbIds);
      let workPeriods = new Array();
      var period;
      fetchDebt(token, uniqAccountIds, data[1].OsbbData.OsbbId, data[1].OsbbData.Periods[data[1].OsbbData.Periods.length - 1].period, onDebtDataChange)
      for (i = 0; i < data[1].OsbbData.Periods.length; i++) {
        //workPeriods.push(data[1].OsbbData.Periods[i].period);
        period = data[1].OsbbData.Periods[i].period;
        onWorkPeriodsChange(period);
        //console.log("onWorkPeriodsChange", period)
        if (i == data[1].OsbbData.Periods.length - 1) {
          onCurrentWorkPeriodChange(period);
        }
      }
      for (i = 0; i < uniqAccountIds.length; i++) {
        fetchGeneralDataApartment(
          token,
          data[1].OsbbData.OsbbId,
          uniqAccountIds[i],
          data[1].OsbbData.Periods,
          onAllApartmentDataChange,
          onAccountIdsChange,
          onAccountIdChange,
          data[1].UserAccounts
        );
      }
      fetchCostsData(
        token,
        onAllCostsDataChange,
        onCurrentCostsDataChange,
        data[1].OsbbData.Periods,
        uniqAccountIds[0].id,
        data[1].OsbbData.OsbbId
      );
      
      fetchLiqpayData(uniqAccountIds[0].id, data[1].OsbbData.OsbbId, period, token, onLiqpayDataChange);
      ws.close();
    }
  };
}

function fetchLiqpayData(accountId, osbbId, workPeriod, token, onLiqpayDataChange){
  fetch(
    'https://app.sapo365.com/api/tenant/checkLiqPay?accountId=' +
      accountId +
      '&osbbId=' +
      osbbId +
      '&workPeriod=' +
      workPeriod,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token + '',
      },
    }
  )
    .then(response => response.json())
    .then(responseJson => {
      //console.log('onLiqpayDataChange', responseJson);
      onLiqpayDataChange(responseJson);
    })
    .catch(error => {
      console.error(error);
    });
}

function getUniqueAccountIds(data) {
  var accountIds = new Array();
  for (var i = data.length - 1; i >= 0; i--) {
    var isUniq = true;
    for (var j = 0; j < accountIds.length; j++) {
      if (accountIds[j].number == data[i].number) {
        isUniq = false;
        break;
      }
    }
    if (isUniq) {
      accountIds.push(data[i]);
    }
  }
  return accountIds;
}

function fetchGeneralDataApartment(
  token,
  osbbId,
  accountId,
  workPeriods,
  onAllApartmentDataChange,
  onAccountIdsChange,
  onAccountIdChange,
  userAccounts
) {
  fetch('https://app.sapo365.com/api/tenant/charges/total?' +
      'accountId=' +
      accountId.id +
      '&osbbId=' +
      osbbId, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token + '',
        },
  })
    .then(response => response.json())
    .then(responseJson => {
      var accountId = getMaxId(responseJson, userAccounts);
      //console.log("id", accountId)
      onAccountIdsChange(accountId);
      onAccountIdChange(accountId);
      for (var j = 0; j < workPeriods.length; j++) {
        var data;
        var list = new Array();
        for (var z = 0; z < responseJson.chargesList.length; z++) {
          if (
            workPeriods[j].period ==
            getMonth(responseJson.chargesList[z].workPeriodInDayMonth)
          ) {
            list.push(responseJson.chargesList[z]);
          }
        }
        data = {
          workPeriod: workPeriods[j].period,
          data: list,
          accountId: accountId,
        };

        //console.log('apartmentData', data);
        onAllApartmentDataChange(data);
      }
    })
    .catch(error => {
      console.error(error);
    });
}

function getMaxId(responseJson, userAccounts) {
  let ids = new Array();
  var number;
  for (var i = 0; i < responseJson.chargesList.length; i++) {
    ids.push(responseJson.chargesList[i].personalAccountId);
  }
  for (i = 0; i < ids.length; i++) {
    for (var j = 0; j < userAccounts.length; j++) {
      if (ids[i] == userAccounts[j].id) {
        number = userAccounts[j].number;
        break;
      }
    }
  }
  var maxId = {
    id: ids[ids.length - 1],
    number: number,
  };
  return maxId;
}

function fetchCostsData(
  token,
  onAllCostsDataChange,
  onCurrentCostsDataChange,
  workPeriods,
  accountId,
  osbbId
) {
  fetchCostsDataByPeriod(
    0,
    token,
    onAllCostsDataChange,
    onCurrentCostsDataChange,
    workPeriods,
    accountId,
    osbbId
  );
}

function fetchCostsDataByPeriod(
  currentPeriod,
  token,
  onAllCostsDataChange,
  onCurrentCostsDataChange,
  workPeriods,
  accountId,
  osbbId
) {
  fetch(
    'https://app.sapo365.com/api/tenant/costs?accountId=' +
      accountId +
      '&osbbId=' +
      osbbId +
      '&workPeriod=' +
      workPeriods[currentPeriod].period,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token + '',
      },
    }
  )
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.length != 0) {
        const data = {
          workPeriod: getMonthByUTC(responseJson[0].workPeriod),
          data: responseJson,
        };
        onAllCostsDataChange(data);
        if (currentPeriod == 0) {
          onCurrentCostsDataChange(data);
        }
      }
      currentPeriod++;
      if (currentPeriod != workPeriods.length)
        fetchCostsDataByPeriod(
          currentPeriod,
          token,
          onAllCostsDataChange,
          onCurrentCostsDataChange,
          workPeriods,
          accountId,
          osbbId
        );
    })
    .catch(error => {
      console.error(error);
    });
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  containerGeneralData: {
    backgroundColor: 'white',
    width: '95%',
    borderRadius: 15,
    padding: 5,
    marginLeft: 15,
    marginEnd: 15,
    marginTop: 7,
    marginBottom: 8,
    alignItems: 'center',
  },
});