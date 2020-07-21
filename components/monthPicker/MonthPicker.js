import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';

export default class MonthPicker extends React.Component {
  
  constructor(props) {
    super(props);
    
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'center', flex: 1, alignItems: 'center',width: '50%'}}>
          {this.getButtonPreviousAccount()}
          <Text style={{ 
            width: '70%',
            color: 'white', 
            textAlign: 'center',
            fontSize: 16, 
            marginHorizontal: 5 }}>
              Кв.№ 1
          </Text>
          {this.getButtonNextAccount()}
        </View>
        <View style={{flexDirection: 'row',  justifyContent: 'flex-start', flex: 1, alignItems: 'center',width: '50%'}}>
        {this.getButtonPreviousPeriod()}
        <Text style={{ 
          width: '70%',
          color: 'white', 
          textAlign: 'center',
          fontSize: 16, 
          marginHorizontal: 5 }}>
          25 липня
        </Text>
        {this.getButtonNextPeriod()}
        </View>
      </View>
    );
  }

  getButtonPreviousPeriod(){
    return(
      <Button
          style={{width: '15%'}}
          title="<"
          color="#364A5F"
          onPress={() => {
           
          }}
        />
    )
  }

  getButtonNextPeriod(){
    return(
      <Button
          style={{width: '15%'}}
          title=">"
          color="#364A5F"
          onPress={() => {
            
          }}
        />
    )
  }

  getButtonPreviousAccount(){
    return(
    <Button
      style={{width: '15%'}}
      title="<"
      color="#364A5F"
      onPress={() => {
        
      }}
    />);
  }

  getButtonNextAccount(){
    return(
    <Button
      style={{width: '15%'}}
      title=">"
      color="#364A5F"
      onPress={() => {
        
      }}
    />);
  }
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

function getCorrectName(workPeriod) {
  var correctName;
  switch (workPeriod.substr(0, 2)) {
    case '01':
      correctName = 'Січень ';
      break;
    case '02':
      correctName = 'Лютий ';
      break;
    case '03':
      correctName = 'Березень ';
      break;
    case '04':
      correctName = 'Квітень ';
      break;
    case '05':
      correctName = 'Травень ';
      break;
    case '06':
      correctName = 'Червень ';
      break;
    case '07':
      correctName = 'Липень ';
      break;
    case '08':
      correctName = 'Серпень ';
      break;
    case '09':
      correctName = 'Вересень ';
      break;
    case '10':
      correctName = 'Жовтень ';
      break;
    case '11':
      correctName = 'Листопад ';
      break;
    case '12':
      correctName = 'Грудень ';
      break;
    default:
      return null;
  }
  correctName += workPeriod.substr(2, 6);
  return correctName;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#0E3939',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
});
