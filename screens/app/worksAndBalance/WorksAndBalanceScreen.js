import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import ScreenHeader from '../../../components/ScreenHeader';
import MonthPickerContainer from '../../../components/monthPicker/MonthPickerContainer';
import DataComponent from '../../../components/dataComponents/DataComponent';
import DataClickableComponent from '../../../components/dataComponents/DataClickableComponent';

export default class ScreenMyHouse extends React.Component {
  constructor(props) {
    super(props);
    this.onAllHouseDataChange = this.onAllHouseDataChange.bind(this);
    this.onAllHouseCostsDataChange = this.onAllHouseCostsDataChange.bind(this);
    this.onExpensesGeneralDataChange = this.onExpensesGeneralDataChange.bind(this);
    this.onExpensesFilesDataChange = this.onExpensesFilesDataChange.bind(this);
  }

  onAllHouseDataChange(allHouseData) {
    this.props.setAllHouseData(allHouseData);
  }

  onAllHouseCostsDataChange(allHouseCostsData) {
    this.props.setAllHouseCostsData(allHouseCostsData);
  }

  onExpensesGeneralDataChange(expensesGeneralData){
    this.props.setExpensesGeneralData(expensesGeneralData);
  }

  onExpensesFilesDataChange(expensesFileData){
    this.props.setExpensesFilesData(expensesFileData);
  }

  componentDidMount() {
    var ws = new WebSocket(
      'wss://app.sapo365.com/socket.io/?auth_token=' +
        this.props.token +
        '&EIO=3&transport=websocket'
    );
    ws.onmessage = e => {
      // a message was received
      if (e.data.substring(0, 2) == '42') {
        const myObjStr = JSON.stringify(e.data.substring(2, e.data.length));
        var myObj = JSON.parse(myObjStr);
        var data = JSON.parse(myObj);
        var dataByPeriods = new Array();
        for (var i = 0; i < data[1].OsbbData.Periods.length; i++) {
          var dataObj = {
            period: data[1].OsbbData.Periods[i].period,
            data: data[1].OsbbData.Periods[i],
          };
          dataByPeriods.push(dataObj);
        }
        console.log("onAllHouseDataChange", dataByPeriods[dataByPeriods.length - 1])
        this.onAllHouseDataChange(dataByPeriods);
        ws.close();
      }
    };
    this.fetchHouseCosts(0);
  }

  fetchHouseCosts(workPeriodIndex) {
    fetch(
      'https://app.sapo365.com/api/tenant/costs?accountId=' +
        this.props.accountId.id +
        '&osbbId=' +
        this.props.osbbId +
        '&workPeriod=' +
        this.props.workPeriods[workPeriodIndex],
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.props.token + '',
        },
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        var data = {
          period: this.props.workPeriods[workPeriodIndex],
          data: responseJson,
        };
        this.onAllHouseCostsDataChange(data);
        if (workPeriodIndex != this.props.workPeriods.length - 1) {
          this.fetchHouseCosts(workPeriodIndex + 1);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  getHouseDataByCurrentPeriod() {
    if (this.props.allHouseData == null) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" style={styles.loader} color="#002B2B" />
          <Text style={{color: '#002B2B', fontSize: 16, marginTop: 100, alignSelf: 'center'}}>
            Зачекайте, дані завантажуються
          </Text>
        </View>
      );
    }
    var currentHouseData;
    for (var i = 0; i < this.props.allHouseData.length; i++) {
      if (this.props.allHouseData[i].period == this.props.currentWorkPeriod) {
        currentHouseData = this.props.allHouseData[i].data;
        break;
      }
    }
    return (
      <View style={styles.container}>
        <DataComponent
          name="Нараховано"
          number={currentHouseData.chargesTotal}
        />
        <DataComponent
          name="Зібрано коштів"
          number={currentHouseData.paymentsTotal}
        />
        <DataComponent
          name="Витрачено"
          number={currentHouseData.accountingsTotal}
        />
        <DataComponent
          name="Фактичний залишок коштів"
          number={currentHouseData.accumulation}
        />
      </View>
    );
  }

  getHouseCostsDataByCurrentPeriod() {
    if (this.props.allHouseCostsData.length != this.props.workPeriods.length) {
      return(<ActivityIndicator size="large" style={styles.loader, {marginTop: 10, marginBottom: 5}} color="#002B2B" />);
    }

    var currentHouseCostsData;
    for (var i = 0; i < this.props.allHouseCostsData.length; i++) {
      if (
        this.props.allHouseCostsData[i].period == this.props.currentWorkPeriod
      ) {
        currentHouseCostsData = this.props.allHouseCostsData[i].data;
        break;
      }
    }

    if(currentHouseCostsData.length == 0) return(<Text style={{color: '#002B2B', fontSize: 16, marginVertical: 10, alignSelf: 'center'}}>Даних немає</Text>);
    
    return currentHouseCostsData.map((item, i) => {
      return (
        <TouchableOpacity
          onPress={() => {
            this.onExpensesGeneralDataChange(item);
            this.onExpensesFilesDataChange(item.documents);
            this.props.navigation.navigate('Expenses');
            }
          }>
          <DataClickableComponent
            name={item.name}
            number={parseFloat(item.cost).toFixed(2)}
          />
        </TouchableOpacity>
      );
    });
  }

  render() {
    return (
      <View
        style={{ width: '100%', height: '100%', backgroundColor: '#EEEEEE' }}>
        <ScreenHeader
          navigation={this.props.navigation}
          title="Поточний місяць"
          userData={this.props.userData}
          imageAvatar={this.props.imageAvatar}
        />
        <MonthPickerContainer />
        <ScrollView>
          {this.getHouseDataByCurrentPeriod()}
          <View style={styles.container}>
            <View
              style={{
                width: '100%',
                backgroundColor: '#F9F9F9',
                alignItems: 'center',
                borderRadius: 15
              }}>
              <Text
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  color: '#002B2B',
                  fontSize: 18,
                }}>
                Витрати
              </Text>
            </View>

            {this.getHouseCostsDataByCurrentPeriod()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    padding: 5,
    marginLeft: 15,
    marginEnd: 15,
    marginTop: 7,
    marginBottom: 8,
    backgroundColor: 'white',
    alignItems: 'center',
  },
});
