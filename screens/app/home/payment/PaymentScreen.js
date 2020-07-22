import * as React from 'react';
import { Text, View, StyleSheet, Image, FlatList } from 'react-native';
import PageHeader from "../../../../components/ScreenHeader";

function getDateString(data) {
  if (data == null) return;
  var date = new Date(data);
  var month;
  switch (date.getMonth()) {
    case 0:
      month = ' січ. ';
      break;
    case 1:
      month = ' лют. ';
      break;
    case 2:
      month = ' бер. ';
      break;
    case 3:
      month = ' квіт. ';
      break;
    case 4:
      month = ' трав. ';
      break;
    case 5:
      month = ' черв. ';
      break;
    case 6:
      month = ' лип. ';
      break;
    case 7:
      month = ' серп. ';
      break;
    case 8:
      month = ' вер. ';
      break;
    case 9:
      month = ' жовт. ';
      break;
    case 10:
      month = ' лист. ';
      break;
    case 11:
      month = ' груд. ';
      break;
  }
  return date.getDate() + month + date.getFullYear();
}

const payments = [
  {
    contribution: 'contribution',
    sum: 100,
    paymentDate: '20.20.2020',
    bank: 'bankname'
  },
  {
    contribution: 'contribution2',
    sum: 200,
    paymentDate: '10.10.2030',
    bank: 'bankname2'
  }
]


export default class PaymentScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ width: '100%', height: '100%', backgroundColor: '#EEEEEE'}}>
        <PageHeader navigation={this.props.navigation} title="Оплати" />
        <View style={styles.container}>
          <View style={styles.container, {marginTop: 10}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.dataColumnNameStyle}>Внесок</Text>
              <Text style={styles.dataColumnNameStyle}>Сплачено, грн</Text>
              <Text style={styles.dataColumnNameStyle}>Дата оплати</Text>
              <Text style={styles.dataColumnNameStyle}>Банк</Text>
            </View>
            <FlatList
              data={payments}
              renderItem={({ item }) => <Item contribution={item.contribution} sum={item.sum} paymentDate={item.paymentDate} bank={item.bank}/>}
              keyExtractor={item => item.contribution}
            />
          </View>
        </View>
      </View>
    );
  }
}

class Item extends React.Component {
  render(){
    return (
      <View style={{flexDirection: 'row', paddingTop: 5}}>
        <Text style={styles.itemStyle}>{this.props.contribution}</Text>
        <Text style={styles.itemStyle}>{this.props.sum}</Text>
        <Text style={styles.itemStyle}>{this.props.paymentDate}</Text>
        <Text style={styles.itemStyle}>{this.props.bank}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
   container: {
    borderRadius: 15,
    padding: 5,
    marginLeft: 10,
    marginEnd: 10,
    marginTop: 7,
    marginBottom: 8,
    backgroundColor: 'white',
  },
  dataColumnNameStyle: {
    width: '25%',
    fontSize: 13,
    fontWeight: 'bold',
    color: '#002B2B',
    alignContent: 'center',
    textAlign: 'center'
  },
  itemStyle: {
    width: '25%',
    fontSize: 13,
    padding: 5,
    color: '#002B2B',
    alignContent: 'center',
    textAlign: 'center'
  },
});
