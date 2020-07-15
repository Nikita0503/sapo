import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

export default class LoginScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{height: '50%', width: '100%', backgroundColor: '#002B2B', alignItems: 'center', justifyContent: 'center'}}>
          <Image resizeMode='contain' style={{width: '30%', height: '30%'}} source={require('../../content/images/sapoAppLogo.png')}/>
        </View>
        <View style={{height: '50%', width: '100%', backgroundColor: 'white'}}>
          {this.getTabView()}
        </View>
      </View>
    );
  }

  getTabView(){     
    const SecondRoute = () => (
      <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
    );

    return(<LoginTabView firstRoute={this.getEmailPasswordForm} secondRoute={SecondRoute}/>)
  }

  getEmailPasswordForm(){
    return(
      <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column', marginTop: '10%'}}>
        <View style={{width: '70%', backgroundColor: '#EFEFEF', borderRadius: 12, paddingTop: 6, paddingBottom: 0, paddingHorizontal: 15, marginHorizontal: 5, }}>
          <TextInput
            keyboardType={Platform.OS === 'android' ? 'email-address' : 'ascii-capable'} 
            onChangeText={(text) => {}}
            style={{borderColor: '#002B2B', textAlign: 'center', borderBottomWidth: 1, fontSize: 16, marginBottom: 7, paddingBottom: 2}}  placeholder="Email" />
        </View>
        <View style={{width: '70%', backgroundColor: '#EFEFEF', marginTop: 10, marginBottom: 5, borderRadius: 12, paddingTop: 6, paddingBottom: 0, paddingHorizontal: 15, marginHorizontal: 5, }}>
          <TextInput
            onChangeText={(text) => {}}
            secureTextEntry={true}
            autoCapitalize = 'none' 
            style={{borderColor: '#002B2B', textAlign: 'center', borderBottomWidth: 1, fontSize: 16, marginBottom: 7, paddingBottom: 2}} placeholder="Пароль" /> 
        </View>
        <View style={{margin: 5, width: '70%', marginTop: 10}}>
          <TouchableOpacity
            onPress={() => {}}
            style={{backgroundColor: "#002B2B", alignItems: 'center', justifyContent: 'center', height: 35, borderRadius: 12}}>
              <Text style={{color: 'white', fontSize: 15}}>Увійти</Text>
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center', margin: 5, }}>
            <Text>Авторизуйтеся через E-mail</Text>
        </View>
    </View>);
  }
}

function LoginTabView(props) {
  const initialLayout = { width: Dimensions.get('window').width };
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'За email'},
    { key: 'second', title: 'За адресою' },
  ]);
 
  const renderScene = SceneMap({
    first: props.firstRoute,
    second: props.secondRoute,
  });
 
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={(props) => {
        return (
          <TabBar
            {...props}
            activeColor="#002B2B"
            inactiveColor="#c2c3c8"
            indicatorStyle={{ backgroundColor: '#002B2B' }}
            style={{ backgroundColor: '#fff' }}
          />
        )
      }}
    />
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    scene: {
        flex: 1,
    }
  });