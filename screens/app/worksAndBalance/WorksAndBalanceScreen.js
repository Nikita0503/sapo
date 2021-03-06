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

export default class WorksAndBalanceScreen extends React.Component {

  componentDidMount() {
    this.props.fetchHouseData(this.props.accountId, 
      this.props.osbbId, 
      this.props.workPeriods, 
      this.props.token)
  }

  getHouseDataByCurrentPeriod() {
    if (this.props.allHouseData == null) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" style={styles.loader} color="#062A4F" />
          <Text style={{color: '#062A4F', fontSize: 16, marginTop: 100, alignSelf: 'center'}}>
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
          name="Початкове сальдо"
          number={/*currentHouseData == null ? " " : currentHouseData.chargesTotal*/"0.00"}
        />
        <DataComponent
          name="Доходи"
          number={/*currentHouseData == null ? " " : currentHouseData.paymentsTotal*/"0.00"}
        />
        <DataComponent
          name="Витрати"
          number={/*currentHouseData == null ? " " : currentHouseData.accountingsTotal*/"0.00"}
        />
        <DataComponent
          name="Кінцеве сальдо"
          number={/*currentHouseData == null ? " " : currentHouseData.accumulation*/"0.00"}
        />
      </View>
    );
  }

  getHouseCostsDataByCurrentPeriod() {
    return(<Text style={{color: '#062A4F', fontSize: 16, marginVertical: 10, alignSelf: 'center'}}>Даних немає</Text>)
    if (this.props.allHouseCostsData.length != this.props.workPeriods.length) {
      return(<ActivityIndicator size="large" style={styles.loader, {marginTop: 10, marginBottom: 5}} color="#062A4F" />);
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
    if(currentHouseCostsData.length == 0) return (<Text style={{color: '#062A4F', fontSize: 16, marginVertical: 10, alignSelf: 'center'}}>Даних немає</Text>);
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
                  color: '#062A4F',
                  fontSize: 18,
                }}>
                Витрати за місяць
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
