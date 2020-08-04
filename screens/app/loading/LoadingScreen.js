import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';

export default class ScreenLoading extends React.Component {
  isLoaded() {
  
    if (
      this.props.workPeriods.length == 0 &&
      this.props.allApartmentData.length == 0
    ) {
      return;
    } else {
      this.props.navigation.navigate("General");
    }
  }

  render() {
    return (
      <View
        style={{ width: '100%', height: '100%', backgroundColor: '#EEEEEE' }}>
        <View style={{backgroundColor: '#002B2B', flexDirection: 'column'}}>
          <Image resizeMode='contain' style={{alignSelf: 'center', marginTop: 60,  marginBottom: 30, height: 250}} source={require('../../../content/images/sapoAppLogo.png')}/>  
        </View>
        <View style={{flexDirection: 'column'}}>
          <ActivityIndicator style={{marginTop: 30}} size="large" color="#002B2B" />
          <Text style={{color: '#002B2B', fontSize: 16, marginTop: 20, alignSelf: 'center'}}>Зачекайте, дані завантажуються</Text>
        </View>
        {this.isLoaded()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});
