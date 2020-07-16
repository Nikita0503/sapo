import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions, ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import SearchableDropdown from 'react-native-searchable-dropdown';
import Dialog from 'react-native-dialog';

export default class LoginScreen extends React.Component {
  
  render() {
    return (
      <View style={styles.container}>
        <View style={{height: '40%', width: '100%', backgroundColor: '#002B2B', alignItems: 'center', justifyContent: 'center'}}>
          <Image resizeMode='contain' style={{width: '50%', height: '50%'}} source={require('../../content/images/sapoAppLogo.png')}/>
        </View>
        <View style={{height: '60%', width: '100%', backgroundColor: 'white'}}>
          {this.getTabView()}
        </View>
        {this.getRegionDialog()}
        {this.getCityDialog()}
        {this.getStreetDialog()}
        {this.getHouseDialog()}
        {this.getFlatDialog()}
        {this.getAccountNumberDialog()}
      </View>
    );
  }

  getTabView(){
    return(<LoginTabView firstRoute={this.getEmailPasswordForm} secondRoute={this.getAddressForm}/>)
  }

  getEmailPasswordForm(){
    return(
      <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
        <View style={{alignItems: 'center', margin: 10 }}>
            <Text>Авторизуйтеся за Email</Text>
        </View>
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
    </View>);
  }

  getRegionDialog(){
    var items = [
      { id: 1, name: 'Київська',},
      { id: 2, name: 'Дніпровська',},
      { id: 3, name: 'Харківська',},
      { id: 4, name: 'Запорізька',},
      { id: 5, name: 'Вінницька',},
      { id: 6, name: 'Волинська',},
      { id: 7, name: 'Рівненська',},
      { id: 8, name: 'Сумська',},
    ];
    return(
      <KeyboardAvoidingView>
      <Dialog.Container visible={true}>
        <Dialog.Title>
           Оберіть область
        </Dialog.Title>
        <SearchableDropdown
            onItemSelect={(item) => {
              
            }}
            containerStyle={{ paddingHorizontal: 10, paddingVertical: 5 }}
            itemStyle={{
              padding: 10              
            }}
            itemsContainerStyle={{ maxHeight: 140, borderRadius: 12 }}
            items={items}
            textInputProps={
              {
                placeholder: "Область",
                underlineColorAndroid: "transparent",
                style: {
                  width: '95%', 
                  borderBottomWidth: 1, 
                  borderColor: '#002B2B',
                  alignSelf: 'center', 
                  fontSize: 16,
                  paddingTop: 0,
                  paddingBottom: 1,
                  marginBottom: 1
                },
                onTextChange: text => {}
              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }
          />
        <Dialog.Button
          label="Підтвердити"
          onPress={() => {
            
          }}
        />
      </Dialog.Container>
      </KeyboardAvoidingView>);
  }

  getCityDialog(){
    var items2 = [
      { id: 1, name: 'Київ',},
      { id: 2, name: 'Дніпро',},
      { id: 3, name: 'Харків',},
      { id: 4, name: 'Кривий Ріг',},
      { id: 5, name: 'Вінниця',},
      { id: 6, name: 'Львів',},
      { id: 7, name: 'Чернівці',},
      { id: 8, name: 'Умань',},
    ];
    return(
    <Dialog.Container visible={false}>
      <Dialog.Title>
         Оберіть місто
      </Dialog.Title>
      <SearchableDropdown
          onItemSelect={(item) => {
            
          }}
          containerStyle={{ paddingHorizontal: 10, paddingVertical: 5 }}
          itemStyle={{
            padding: 10              
          }}
          itemsContainerStyle={{ maxHeight: 140, borderRadius: 12 }}
          items={items2}
          textInputProps={
            {
              placeholder: "Місто",
              underlineColorAndroid: "transparent",
              style: {
                width: '95%', 
                borderBottomWidth: 1, 
                borderColor: '#002B2B',
                alignSelf: 'center', 
                fontSize: 16,
                paddingTop: 0,
                paddingBottom: 1,
                marginBottom: 1
              },
              onTextChange: text => {}
            }
          }
          listProps={
            {
              nestedScrollEnabled: true,
            }
          }
        />
      <Dialog.Button
        label="Підтвердити"
        onPress={() => {
          
        }}
      />
    </Dialog.Container>);
  }

  getStreetDialog(){
    var items3 = [
      { id: 1, name: 'Ватутіна',},
      { id: 2, name: 'Кропівницького',},
      { id: 3, name: 'Хрещатик',},
      { id: 4, name: 'Криворіжсталі',},
      { id: 5, name: 'Університет',},
    ];
    return(
      <Dialog.Container visible={false}>
        <Dialog.Title>
          Оберіть вулицю
        </Dialog.Title>
        <SearchableDropdown
            onItemSelect={(item) => {
              
            }}
            containerStyle={{ paddingHorizontal: 10, paddingVertical: 5 }}
            itemStyle={{
              padding: 10              
            }}
            itemsContainerStyle={{ maxHeight: 140, borderRadius: 12 }}
            items={items3}
            textInputProps={
              {
                placeholder: "Вулиця",
                underlineColorAndroid: "transparent",
                style: {
                  width: '95%', 
                  borderBottomWidth: 1, 
                  borderColor: '#002B2B',
                  alignSelf: 'center', 
                  fontSize: 16,
                  paddingTop: 0,
                  paddingBottom: 1,
                  marginBottom: 1
                },
                onTextChange: text => {}
              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }
          />
        <Dialog.Button
          label="Підтвердити"
          onPress={() => {
            
          }}
        />
      </Dialog.Container>);
  }

  getHouseDialog(){
    var items4 = [
      { id: 1, name: '1А',},
      { id: 2, name: '1Б',},
      { id: 3, name: '2',},
      { id: 4, name: '3',},
      { id: 5, name: '4',},
    ];
    return(
      <Dialog.Container visible={false}>
        <Dialog.Title>
          Оберіть будинок
        </Dialog.Title>
        <SearchableDropdown
            onItemSelect={(item) => {
              
            }}
            containerStyle={{ paddingHorizontal: 10, paddingVertical: 5 }}
            itemStyle={{
              padding: 10              
            }}
            itemsContainerStyle={{ maxHeight: 140, borderRadius: 12 }}
            items={items4}
            textInputProps={
              {
                placeholder: "Будинок",
                underlineColorAndroid: "transparent",
                style: {
                  width: '95%', 
                  borderBottomWidth: 1, 
                  borderColor: '#002B2B',
                  alignSelf: 'center', 
                  fontSize: 16,
                  paddingTop: 0,
                  paddingBottom: 1,
                  marginBottom: 1
                },
                onTextChange: text => {}
              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }
          />
        <Dialog.Button
          label="Підтвердити"
          onPress={() => {
            
          }}
        />
      </Dialog.Container>);
  }

  getFlatDialog(){
    var items5 = [
      { id: 1, name: '1',},
      { id: 2, name: '3',},
      { id: 3, name: '5',},
      { id: 4, name: '6',},
      { id: 5, name: '8',},
    ];
    return(
      <Dialog.Container visible={false}>
        <Dialog.Title>
          Оберіть квартиру
        </Dialog.Title>
        <SearchableDropdown
            onItemSelect={(item) => {
              
            }}
            containerStyle={{ paddingHorizontal: 10, paddingVertical: 5 }}
            itemStyle={{
              padding: 10              
            }}
            itemsContainerStyle={{ maxHeight: 140, borderRadius: 12 }}
            items={items5}
            textInputProps={
              {
                placeholder: "Квартира",
                underlineColorAndroid: "transparent",
                style: {
                  width: '95%', 
                  borderBottomWidth: 1, 
                  borderColor: '#002B2B',
                  alignSelf: 'center', 
                  fontSize: 16,
                  paddingTop: 0,
                  paddingBottom: 1,
                  marginBottom: 1
                },
                onTextChange: text => {}
              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }
          />
        <Dialog.Button
          label="Підтвердити"
          onPress={() => {
            
          }}
        />
      </Dialog.Container>);
  }

  getAccountNumberDialog(){
    return(
      <Dialog.Container visible={false}>
        <Dialog.Title>
          Введіть номер рахунку
        </Dialog.Title>
        <View style={{width: '90%', alignSelf: 'center', marginVertical: 5, marginBottom: 5, paddingTop: 6, paddingBottom: 0, paddingHorizontal: 15, marginHorizontal: 5, }}>
          <TextInput
            onChangeText={(text) => {}}
            style={{borderColor: '#002B2B',  borderBottomWidth: 1, fontSize: 15, marginBottom: 7, paddingBottom: 2, paddingHorizontal: 2}} placeholder="Номер рахунку" /> 
        </View>
        <Dialog.Button
          label="Підтвердити"
          onPress={() => {
            
          }}
        />
      </Dialog.Container>);
  }

  getAddressForm(){
    return(
      <View style={{alignItems: 'center'}}>
        <View style={{alignItems: 'center', margin: 10 }}>
            <Text>Авторизуйтеся за адресою</Text>
        </View>
        
        <TouchableOpacity style={{width: '80%', backgroundColor: '#EFEFEF', borderRadius: 12, paddingTop: 6, paddingBottom: 0, paddingHorizontal: 15, marginHorizontal: 5, }}>
          <View style={{borderColor: '#002B2B',  borderBottomWidth: 1, marginBottom: 6, paddingBottom: 2, paddingHorizontal: 2}}>
            <Text style={{fontSize: 15, color: 'gray'}}>
              Оберіть область
            </Text>
          </View> 
        </TouchableOpacity>

        <TouchableOpacity style={{width: '80%', backgroundColor: '#EFEFEF', marginTop: 10, borderRadius: 12, paddingTop: 6, paddingBottom: 0, paddingHorizontal: 15, marginHorizontal: 5, }}>
          <View style={{borderColor: '#002B2B',  borderBottomWidth: 1, marginBottom: 6, paddingBottom: 2, paddingHorizontal: 2}}>
            <Text style={{fontSize: 15, color: 'gray'}}>
              Оберіть місто
            </Text>
          </View> 
        </TouchableOpacity>

        <TouchableOpacity style={{width: '80%', backgroundColor: '#EFEFEF', marginTop: 10, borderRadius: 12, paddingTop: 6, paddingBottom: 0, paddingHorizontal: 15, marginHorizontal: 5, }}>
          <View style={{borderColor: '#002B2B',  borderBottomWidth: 1, marginBottom: 6, paddingBottom: 2, paddingHorizontal: 2}}>
            <Text style={{fontSize: 15, color: 'gray'}}>
              Оберіть вулицю
            </Text>
          </View> 
        </TouchableOpacity>
        
        <TouchableOpacity style={{width: '80%', backgroundColor: '#EFEFEF', marginTop: 10, borderRadius: 12, paddingTop: 6, paddingBottom: 0, paddingHorizontal: 15, marginHorizontal: 5, }}>
          <View style={{borderColor: '#002B2B',  borderBottomWidth: 1, marginBottom: 6, paddingBottom: 2, paddingHorizontal: 2}}>
            <Text style={{fontSize: 15, color: 'gray'}}>
              Оберіть будинок
            </Text>
          </View> 
        </TouchableOpacity>

        <TouchableOpacity style={{width: '80%', backgroundColor: '#EFEFEF', marginTop: 10, borderRadius: 12, paddingTop: 6, paddingBottom: 0, paddingHorizontal: 15, marginHorizontal: 5, }}>
          <View style={{borderColor: '#002B2B',  borderBottomWidth: 1, marginBottom: 6, paddingBottom: 2, paddingHorizontal: 2}}>
            <Text style={{fontSize: 15, color: 'gray'}}>
              Оберіть квартиру
            </Text>
          </View> 
        </TouchableOpacity>

        <TouchableOpacity style={{width: '80%', backgroundColor: '#EFEFEF', marginTop: 10, borderRadius: 12, paddingTop: 6, paddingBottom: 0, paddingHorizontal: 15, marginHorizontal: 5, }}>
          <View style={{borderColor: '#002B2B',  borderBottomWidth: 1, marginBottom: 6, paddingBottom: 2, paddingHorizontal: 2}}>
            <Text style={{fontSize: 15, color: 'gray'}}>
              Номер рахунку
            </Text>
          </View> 
        </TouchableOpacity>

        <View style={{margin: 5, width: '80%', marginTop: 15, marginBottom: 20}}>
          <TouchableOpacity
            onPress={() => {}}
            style={{backgroundColor: "#002B2B", alignItems: 'center', justifyContent: 'center', height: 35, borderRadius: 12}}>
              <Text style={{color: 'white', fontSize: 15}}>Увійти</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }  
}

function LoginTabView(props) {
  const initialLayout = { width: Dimensions.get('window').width };
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'За адресою'},
    { key: 'second', title: 'За email' },
  ]);
 
  const renderScene = SceneMap({
    first: props.secondRoute,
    second: props.firstRoute,
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
    }
  });