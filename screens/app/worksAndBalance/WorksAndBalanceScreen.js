import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScreenHeader from '../../../components/ScreenHeader'
import MonthPickerContainer from '../../../components/monthPicker/MonthPickerContainer';
export default class WorksAndBalanceScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ScreenHeader title={"WorksAndBalanceScreen"}/>
        <MonthPickerContainer/>
        <Text>WorksAndBalanceScreen</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});