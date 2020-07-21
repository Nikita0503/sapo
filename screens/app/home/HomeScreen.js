import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import ScreenHeader from '../../../components/ScreenHeader';
import MonthPickerContainer from '../../../components/monthPicker/MonthPickerContainer';
import DataComponent from '../../../components/dataComponents/DataComponent';
import DataClickableComponent from '../../../components/dataComponents/DataClickableComponent';
import { ScrollView } from 'react-native-gesture-handler';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <ScrollView style={{backgroundColor: '#F9F9F9'}}>
        <View style={styles.container}>
          <ScreenHeader title={"HomeScreen"}/>
          <MonthPickerContainer/>
          {this.getPayment()}
          {this.getGeneralData()}
        </View>
      </ScrollView>
    );
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
                  Серпень 2020
                </Text>
                <Text
                  style={{
                    marginTop: 2,
                    fontWeight: 'bold',
                    marginBottom: 10,
                    color: '#002B2B',
                    fontSize: 18,
                  }}>
                  1000 грн.
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
    return (
      <View style={styles.containerGeneralData}>
        <DataComponent
          name="Сальдо на початок"
          number={1}
        />
        <TouchableOpacity
          onPress={() => {}}>
          <DataClickableComponent
            name="Нараховано"
            number={1}
          />
        </TouchableOpacity>
        <DataComponent
          name="Пільги"
          number={1}
        />
        <DataComponent
          name="Субсидії"
          number={1}
        />
        <TouchableOpacity
          onPress={() => {}}>
          <DataClickableComponent
            name="Оплати"
            number={1}
          />
        </TouchableOpacity>
        <DataComponent
          name="Сальдо на кінець"
          number={1}
        />
      </View>
    );
  }
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