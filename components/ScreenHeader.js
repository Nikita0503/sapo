import React from "react";
import {connect} from 'react-redux';
import { Header } from "react-native-elements";
import { View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
import { setExistNewAds } from '../redux/ads/actions'

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
                        'https://app.gsoft.net.ua' +
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
                          'https://app.gsoft.net.ua' +
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
            <TouchableOpacity onPress={() => {
              props.navigation.navigate('Ads');
              props.setExistNewAds(false)
            }}>           
                <Image style={{width: 32, height: 32, marginTop: 5 }} source={require('../content/images/ic_advertisement.png')} />
                {props.existNewAds && <Text style={{color: 'red', fontSize: 25, position: 'absolute'}}>*</Text>}
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
  
  const mapStateToProps = state => ({
    existNewAds: state.advertisement.existNewAds
  })

  const mapDispatchToProps = {
    setExistNewAds: setExistNewAds
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ScreenHeader);