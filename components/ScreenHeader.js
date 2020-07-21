import React from "react";
import { Header } from "react-native-elements";
import { View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';

const ScreenHeader = props => {
    return (
      <Header
        leftComponent={
            <TouchableOpacity onPress={() => {}}>
                <Image style={{width: 40, height: 40, backgroundColor: 'red', borderRadius: 20}} source={require('../content/images/sapoAppLogo.png')} />
            </TouchableOpacity>}
        centerComponent={{
          text: props.title,
          style: { color: "#fff" }
        }}
        rightComponent={
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => {}}>           
                <Image style={{width: 32, height: 32, marginTop: 5 }} source={require('../content/images/ic_advertisement.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>         
                <Image style={styles.icon} source={require('../content/images/ic_chat.png')} />
            </TouchableOpacity>
          </View>
        }
        statusBarProps={{ barStyle: "light-content" }}
        containerStyle={{
          backgroundColor: '#002B2B',
          justifyContent: 'space-around',
          
        }}
      />
    );
  };
  
  const styles = StyleSheet.create({
    icon: {
      width: 40,
      height: 40
    },
  });
  
  
  export default ScreenHeader;