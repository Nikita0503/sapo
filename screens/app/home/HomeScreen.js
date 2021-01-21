import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import ScreenHeader from '../../../components/ScreenHeader';
import MonthPickerContainer from '../../../components/monthPicker/MonthPickerContainer';
import DataComponent from '../../../components/dataComponents/DataComponent';
import DataClickableComponent from '../../../components/dataComponents/DataClickableComponent';
import { ScrollView } from 'react-native-gesture-handler';

export default class HomeScreen extends React.Component {

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
                color: '#062A4F',
                fontSize: 18,
              }}>
              До сплати за
            </Text>
            <Text
              style={{
                marginTop: 2,
                marginBottom: 2,
                color: '#062A4F',
                fontSize: 18,
              }}>
              {this.getLastPeriod()}
            </Text>
            <Text
              style={{
                marginTop: 2,
                fontWeight: 'bold',
                marginBottom: 10,
                color: '#062A4F',
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
            backgroundColor: '#062A4F',
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