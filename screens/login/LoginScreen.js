import React, {PureComponent} from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions, ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import SearchableDropdown from 'react-native-searchable-dropdown';
import Dialog from 'react-native-dialog';
import ViewPager from '@react-native-community/viewpager';

const TAB_EMAIL_PASSWORD_ID = 0;
const TAB_ADDRESS_ID = 1;
const REGION_DIALOG_ID = 1;
const CITY_DIALOG_ID = 2;
const STREET_DIALOG_ID = 3;
const HOUSE_DIALOG_ID = 4;
const FLAT_DIALOG_ID = 5;
const ACCOUNT_NUMBER_DIALOG_ID = 6;

export default class LoginScreen extends React.Component {


  
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{height: '40%', width: '100%', backgroundColor: '#002B2B', alignItems: 'center', justifyContent: 'center'}}>
          <Image resizeMode='contain' style={{width: '50%', height: '50%'}} source={require('../../content/images/sapoAppLogo.png')}/>
        </View>
        {this.getPageView()}
        {this.getRegionDialog()}
        {this.getCityDialog()}
        {this.getStreetDialog()}
        {this.getHouseDialog()}
        {this.getFlatDialog()}
        {this.getAccountNumberDialog()}
      </View>
    );
  }

  getPageView(){
    return(
    <View style={{height: '60%', width: '100%', backgroundColor: 'white'}}>
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
        <View style={{width: '100%', height: '10%', minHeight: '10%', flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              this.props.setCurrentTab(TAB_EMAIL_PASSWORD_ID)
              this.viewPager.setPage(TAB_EMAIL_PASSWORD_ID)
            }}
            style={this.props.currentTab == TAB_EMAIL_PASSWORD_ID ? 
            {width: '50%', height: '100%', borderBottomWidth: 2, paddingTop: 2, borderBottomColor: '#002B2B', alignItems: 'center', justifyContent: 'center'}
            :
            {width: '50%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{color: '#002B2B'}}>ЗА EMAIL</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.setCurrentTab(TAB_ADDRESS_ID)
              this.viewPager.setPage(TAB_ADDRESS_ID)
            }}
            style={this.props.currentTab == TAB_ADDRESS_ID ? 
            {width: '50%', height: '100%', borderBottomWidth: 2,  paddingTop: 2, borderBottomColor: '#002B2B', alignItems: 'center', justifyContent: 'center'}
            :
            {width: '50%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{color: '#002B2B'}}>ЗА АДРЕСОЮ</Text>
          </TouchableOpacity>
        </View>
        <ViewPager 
            initialPage={this.props.currentTab}
            ref={(viewPager) => {this.viewPager = viewPager}}
            onPageSelected={(e) => { this.props.setCurrentTab(e.nativeEvent.position) }}
            style={{width: '100%', height:'90%'}}>
            <View>
              {this.getEmailPasswordForm()}
            </View>
            <View>
              {this.getAddressForm()}
            </View>
          </ViewPager>  
        </KeyboardAvoidingView>
    </View>)
  }

  getEmailPasswordForm(){
    return(
      <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
        <View style={{alignItems: 'center', margin: 10 }}>
            <Text>Авторизуйтеся за Email</Text>
        </View>
        <View style={{width: '70%', backgroundColor: '#EFEFEF', borderRadius: 12, paddingTop: 6, paddingBottom: 0, paddingHorizontal: 15, marginHorizontal: 5, }}>
          <TextInput
            value={this.props.email}
            keyboardType={Platform.OS === 'android' ? 'email-address' : 'ascii-capable'} 
            onChangeText={(text) => {this.props.setEmail(text)}}
            style={{borderColor: '#002B2B', textAlign: 'center', borderBottomWidth: 1, fontSize: 16, marginBottom: 7, paddingBottom: 2}}  placeholder="Email" />
        </View>
        <View style={{width: '70%', backgroundColor: '#EFEFEF', marginTop: 10, marginBottom: 5, borderRadius: 12, paddingTop: 6, paddingBottom: 0, paddingHorizontal: 15, marginHorizontal: 5, }}>
          <TextInput
            value={this.props.password}
            onChangeText={(text) => {this.props.setPassword(text)}}
            secureTextEntry={true}
            autoCapitalize = 'none' 
            style={{borderColor: '#002B2B', textAlign: 'center', borderBottomWidth: 1, fontSize: 16, marginBottom: 7, paddingBottom: 2}} placeholder="Пароль" /> 
        </View>
        <View style={{margin: 5, width: '70%', marginTop: 10}}>
          <TouchableOpacity
            onPress={() => {
              //this.props.navigation.navigate("Menu")
              this.props.fetchTokenByEmailPassword(this.props.email, this.props.password)
            }}
            style={{backgroundColor: "#002B2B", alignItems: 'center', justifyContent: 'center', height: 35, borderRadius: 12}}>
              <Text style={{color: 'white', fontSize: 15}}>Увійти</Text>
          </TouchableOpacity>
          
        </View>
    </View>);
  }

  getAddressForm(){
    return(
      <ScrollView>
        <View style={{alignItems: 'center'}}>
          <View style={{alignItems: 'center', margin: 10 }}>
              <Text>Авторизуйтеся за адресою</Text>
          </View>
          
          <TouchableOpacity
            onPress={() => {
              this.props.setShownDialogId(REGION_DIALOG_ID)
              this.props.setSelectedRegion(null)
            }}
            style={{width: '80%', backgroundColor: '#EFEFEF', borderRadius: 12, paddingTop: 6, paddingBottom: 0, paddingHorizontal: 15, marginHorizontal: 5, }}>
            <View style={{borderColor: '#002B2B',  borderBottomWidth: 1, marginBottom: 6, paddingBottom: 2, paddingHorizontal: 2}}>
              <Text style={this.props.selectedRegion == null ? {fontSize: 15, color: 'gray'} : {fontSize: 15}}>
              {this.props.selectedRegion == null ? 'Оберіть область' : this.props.selectedRegion}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => {
              this.props.setShownDialogId(CITY_DIALOG_ID)
              this.props.setSelectedCity(null)
            }}
            style={{width: '80%', backgroundColor: '#EFEFEF', marginTop: 10, borderRadius: 12, paddingTop: 6, paddingBottom: 0, paddingHorizontal: 15, marginHorizontal: 5, }}>
            <View style={{borderColor: '#002B2B',  borderBottomWidth: 1, marginBottom: 6, paddingBottom: 2, paddingHorizontal: 2}}>
              <Text style={this.props.selectedCity == null ? {fontSize: 15, color: 'gray'} : {fontSize: 15}}>
              {this.props.selectedCity == null ? 'Оберіть місто' : this.props.selectedCity}
              </Text>
            </View> 
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => {
              this.props.setShownDialogId(STREET_DIALOG_ID)
              this.props.setSelectedStreet(null)
            }}
            style={{width: '80%', backgroundColor: '#EFEFEF', marginTop: 10, borderRadius: 12, paddingTop: 6, paddingBottom: 0, paddingHorizontal: 15, marginHorizontal: 5, }}>
            <View style={{borderColor: '#002B2B',  borderBottomWidth: 1, marginBottom: 6, paddingBottom: 2, paddingHorizontal: 2}}>
              <Text style={this.props.selectedStreet == null ? {fontSize: 15, color: 'gray'} : {fontSize: 15}}>
              {this.props.selectedStreet == null ? 'Оберіть вулицю' : this.props.selectedStreet}
              </Text>
            </View> 
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => {
              this.props.setShownDialogId(HOUSE_DIALOG_ID)
              this.props.setSelectedHouse(null)
            }}
            style={{width: '80%', backgroundColor: '#EFEFEF', marginTop: 10, borderRadius: 12, paddingTop: 6, paddingBottom: 0, paddingHorizontal: 15, marginHorizontal: 5, }}>
            <View style={{borderColor: '#002B2B',  borderBottomWidth: 1, marginBottom: 6, paddingBottom: 2, paddingHorizontal: 2}}>
              <Text style={this.props.selectedHouse == null ? {fontSize: 15, color: 'gray'} : {fontSize: 15}}>
              {this.props.selectedHouse == null ? 'Оберіть будинок' : this.props.selectedHouse}
              </Text>
            </View> 
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => {
              this.props.setShownDialogId(FLAT_DIALOG_ID)
              this.props.setSelectedFlat(null)
            }}
            style={{width: '80%', backgroundColor: '#EFEFEF', marginTop: 10, borderRadius: 12, paddingTop: 6, paddingBottom: 0, paddingHorizontal: 15, marginHorizontal: 5, }}>
            <View style={{borderColor: '#002B2B',  borderBottomWidth: 1, marginBottom: 6, paddingBottom: 2, paddingHorizontal: 2}}>
              <Text style={this.props.selectedFlat == null ? {fontSize: 15, color: 'gray'} : {fontSize: 15}}>
              {this.props.selectedFlat == null ? 'Оберіть квартиру' : this.props.selectedFlat}
              </Text>
            </View> 
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => {
              this.props.setShownDialogId(ACCOUNT_NUMBER_DIALOG_ID)
              this.props.setSelectedAccountNumber(null)
            }}
            style={{width: '80%', backgroundColor: '#EFEFEF', marginTop: 10, borderRadius: 12, paddingTop: 6, paddingBottom: 0, paddingHorizontal: 15, marginHorizontal: 5, }}>
            <View style={{borderColor: '#002B2B',  borderBottomWidth: 1, marginBottom: 6, paddingBottom: 2, paddingHorizontal: 2}}>
              <Text style={this.props.selectedAccountNumber == null ? {fontSize: 15, color: 'gray'} : {fontSize: 15}}>
              {this.props.selectedAccountNumber == null ? 'Номер рахунку' : this.props.selectedAccountNumber}
              </Text>
            </View> 
          </TouchableOpacity>

          <View style={{margin: 5, width: '80%', marginTop: 15, marginBottom: 20}}>
            <TouchableOpacity
              onPress={() => {
                //this.props.navigation.navigate("Menu")
                this.props.fetchTokenByAddress()
              }}
              style={{backgroundColor: "#002B2B", alignItems: 'center', justifyContent: 'center', height: 35, borderRadius: 12}}>
                <Text style={{color: 'white', fontSize: 15}}>Увійти</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    )
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
      <Dialog.Container visible={this.props.shownDialogId == REGION_DIALOG_ID ? true : false}>
        <Dialog.Title>
           Оберіть область
        </Dialog.Title>
        <SearchableDropdown
            onItemSelect={(item) => {
              this.props.setSelectedRegion(item.name)
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
                  maxWidth: '90%',
                  width: '90%', 
                  borderBottomWidth: 1, 
                  borderColor: '#002B2B',
                  alignSelf: 'center', 
                  fontSize: 16,
                  paddingTop: 0,
                  paddingBottom: 1,
                  marginBottom: 1
                },
                onTextChange: text => {this.props.setSelectedRegion(text)}
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
            this.props.setShownDialogId(null)
          }}
        />
      </Dialog.Container>);
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
    <Dialog.Container visible={this.props.shownDialogId == CITY_DIALOG_ID ? true : false}>
      <Dialog.Title>
         Оберіть місто
      </Dialog.Title>
      <SearchableDropdown
          onItemSelect={(item) => {
            this.props.setSelectedCity(item.name)
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
                maxWidth: '90%',
                width: '90%', 
                borderBottomWidth: 1, 
                borderColor: '#002B2B',
                alignSelf: 'center', 
                fontSize: 16,
                paddingTop: 0,
                paddingBottom: 1,
                marginBottom: 1
              },
              onTextChange: text => {this.props.setSelectedCity(text)}
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
          this.props.setShownDialogId(null)
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
      <Dialog.Container visible={this.props.shownDialogId == STREET_DIALOG_ID ? true : false}>
        <Dialog.Title>
          Оберіть вулицю
        </Dialog.Title>
        <SearchableDropdown
            onItemSelect={(item) => {
              this.props.setSelectedStreet(item.name)
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
                  maxWidth: '90%',
                  width: '90%', 
                  borderBottomWidth: 1, 
                  borderColor: '#002B2B',
                  alignSelf: 'center', 
                  fontSize: 16,
                  paddingTop: 0,
                  paddingBottom: 1,
                  marginBottom: 1
                },
                onTextChange: text => {this.props.setSelectedStreet(text)}
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
            this.props.setShownDialogId(null)
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
      <Dialog.Container visible={this.props.shownDialogId == HOUSE_DIALOG_ID ? true : false}>
        <Dialog.Title>
          Оберіть будинок
        </Dialog.Title>
        <SearchableDropdown
            onItemSelect={(item) => {
              this.props.setSelectedHouse(item.name)
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
                  maxWidth: '90%',
                  width: '90%', 
                  borderBottomWidth: 1, 
                  borderColor: '#002B2B',
                  alignSelf: 'center', 
                  fontSize: 16,
                  paddingTop: 0,
                  paddingBottom: 1,
                  marginBottom: 1
                },
                onTextChange: text => {this.props.setSelectedHouse(text)}
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
            this.props.setShownDialogId(null)
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
      <Dialog.Container visible={this.props.shownDialogId == FLAT_DIALOG_ID ? true : false}>
        <Dialog.Title>
          Оберіть квартиру
        </Dialog.Title>
        <SearchableDropdown
            onItemSelect={(item) => {
              this.props.setSelectedFlat(item.name)
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
                  maxWidth: '90%',
                  width: '90%', 
                  borderBottomWidth: 1, 
                  borderColor: '#002B2B',
                  alignSelf: 'center', 
                  fontSize: 16,
                  paddingTop: 0,
                  paddingBottom: 1,
                  marginBottom: 1
                },
                onTextChange: text => {this.props.setSelectedFlat(text)}
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
            this.props.setShownDialogId(null)
          }}
        />
      </Dialog.Container>);
  }

  getAccountNumberDialog(){
    return(
      <Dialog.Container 
        
        visible={this.props.shownDialogId == ACCOUNT_NUMBER_DIALOG_ID ? true : false}>
        <Dialog.Title>
          Введіть номер рахунку
        </Dialog.Title>
        <View style={{width: '90%', maxWidth: '90%', alignSelf: 'center', alignItems: 'center', marginVertical: 5, marginBottom: 5, paddingTop: 6, paddingBottom: 0, paddingHorizontal: 15, marginHorizontal: 5, }}>
          <TextInput
            onChangeText={(text) => {this.props.setSelectedAccountNumber(text)}}
            style={{width: '90%', maxWidth: '90%', borderColor: '#002B2B',  borderBottomWidth: 1, fontSize: 15, marginBottom: 7, paddingBottom: 2, paddingHorizontal: 2}} placeholder="Номер рахунку" /> 
        </View>
        <Dialog.Button
          label="Підтвердити"
          onPress={() => {
            this.props.setShownDialogId(null)
          }}
        />
      </Dialog.Container>);
  }

  
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    }
  });