import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default class LoginScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> Hello World! </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
  });