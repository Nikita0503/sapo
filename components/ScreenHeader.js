import React from "react";
import { Header } from "react-native-elements";
import { View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';

const ScreenHeader = props => {
    return (
      <Header
        leftComponent={
            <TouchableOpacity onPress={() => {
              props.navigation.navigate('Profile');
            }}>
                <Image style={{width: 40, height: 40, borderRadius: 20}} source={
                    props.imageAvatar == 'deleted' ?
                    require('../content/images/ic_profile.png') 
                    :
                    props.imageAvatar != null ?
                    {
                      uri:
                        'https://app.sapo365.com' +
                        props.imageAvatar,
                    }
                    :
                    props.userData == null 
                    ? 
                    require('../content/images/ic_profile.png') 
                    :
                    props.userData.photo == null
                    ? 
                    require('../content/images/ic_profile.png')
                    : 
                    {
                        uri:
                          'https://app.sapo365.com' +
                          props.userData.photo,
                    }
                }/>
            </TouchableOpacity>}
        centerComponent={{
          text: props.title,
          style: { color: "#fff" }
        }}
        rightComponent={
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => {props.navigation.navigate('Ads');}}>           
                <Image style={{width: 32, height: 32, marginTop: 5 }} source={require('../content/images/ic_advertisement.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {props.navigation.navigate('Chats');}}>         
                <Image style={styles.icon} source={require('../content/images/ic_chat.png')} />
            </TouchableOpacity>
          </View>
        }
        statusBarProps={{ barStyle: "light-content" }}
        containerStyle={{
          backgroundColor: '#062A4F',
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