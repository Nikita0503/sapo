import React, {PureComponent} from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions, ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Alert } from 'react-native';
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
const CITY_COMPANY_DIALOG_ID = 7;
const COMPANY_DIALOG_ID = 8;
const AUTH_METHOD_LOGIN = 0;
const AUTH_METHOD_ADDRESS = 1;

export default class LoginScreen extends React.Component {

  componentWillMount(){
    if(this.props.authMethod != null){
      if(this.props.authMethod == AUTH_METHOD_LOGIN){
        if(this.props.email == null || this.props.password == null){
          return
        }
        this.props.fetchTokenByEmailPassword(this.props.email, this.props.password, this.props.navigation)
      }
      if(this.props.authMethod == AUTH_METHOD_ADDRESS){
        if(this.props.regionsInfo == null
          || this.props.selectedStreet == null
          || this.props.selectedHouse == null
          || this.props.selectedFlat == null
          || this.props.selectedAccountNumber == null){
            return
          }
        this.props.fetchTokenByAddress(this.props.regionsInfo, 
          this.props.selectedStreet.id, 
          this.props.selectedHouse,
          this.props.selectedFlat,
          this.props.selectedAccountNumber,
          this.props.navigation)
      }
    }
  }

  componentDidMount(){
    //this.props.fetchRegionsInfo();
    this.props.fetchCompaniesInfo();
  }
  
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
        {this.getCityCompanyDialog()}
        {this.getCompanyDialog()}
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
              {
                this.props.regionsInfo == null ? this.getCompanyForm() : this.getAddressForm()
              }
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
              if(this.props.email == null 
                || this.props.password == null){
                  return
                }
              this.props.fetchTokenByEmailPassword(this.props.email, this.props.password, this.props.navigation)
            }}
            style={{backgroundColor: "#002B2B", alignItems: 'center', justifyContent: 'center', height: 35, borderRadius: 12}}>
              <Text style={{color: 'white', fontSize: 15}}>Увійти</Text>
          </TouchableOpacity>
        </View>
    </View>);
  }

  getCompanyForm(){
    return(
      <ScrollView>
        <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
          <View style={{alignItems: 'center', margin: 10 }}>
            <Text>Управляюча компанія</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.props.setShownDialogId(CITY_COMPANY_DIALOG_ID)
              this.props.setSelectedCompany(null)
              this.props.setSelectedCityCompany(null)
            }}
            style={{width: '80%', backgroundColor: '#EFEFEF', borderRadius: 12, paddingTop: 6, paddingBottom: 0, paddingHorizontal: 15, marginHorizontal: 5, }}>
            <View style={{borderColor: '#002B2B',  borderBottomWidth: 1, marginBottom: 6, paddingBottom: 2, paddingHorizontal: 2}}>
              <Text style={this.props.selectedCityCompany == null ? {fontSize: 15, color: 'gray'} : {fontSize: 15}}>
                {this.props.selectedCityCompany == null ? 'Оберіть місто' : this.props.selectedCityCompany}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
              onPress={() => {
                this.props.setShownDialogId(COMPANY_DIALOG_ID)
                this.props.setSelectedCompany(null)
              }}
              style={{width: '80%', backgroundColor: '#EFEFEF', marginTop: 10, borderRadius: 12, paddingTop: 6, paddingBottom: 0, paddingHorizontal: 15, marginHorizontal: 5, }}>
              <View style={{borderColor: '#002B2B',  borderBottomWidth: 1, marginBottom: 6, paddingBottom: 2, paddingHorizontal: 2}}>
                <Text style={this.props.selectedCompany == null ? {fontSize: 15, color: 'gray'} : {fontSize: 15}}>
                  {this.props.selectedCompany == null ? 'Оберіть компанію' : this.props.selectedCompany.name}
                </Text>
              </View> 
            </TouchableOpacity>

            <View style={{margin: 5, width: '80%', marginTop: 15, marginBottom: 20}}>
            <TouchableOpacity
              onPress={() => {
                if(this.props.selectedCityCompany == null
                  || this.props.selectedCompany == null){
                    Alert.alert('Укажіть усі пункти', 'Оберіть управляючу компанію');
                    return
                  }
                  this.props.fetchRegionsInfo(this.props.selectedCompany.id)
                
              }}
              style={{backgroundColor: "#002B2B", alignItems: 'center', justifyContent: 'center', height: 35, borderRadius: 12}}>
                <Text style={{color: 'white', fontSize: 15}}>Далі</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    )
  }

  getAddressForm(){
    return(
      <ScrollView>
        <TouchableOpacity
          style={{backgroundColor: "#002B2B", alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end', height: 25, borderRadius: 8, width: 70, marginRight: 10, marginTop: 5}}
          onPress={() => {
            this.props.setSelectedAccountNumber(null)
            this.props.setSelectedFlat(null)
            this.props.setSelectedHouse(null)
            this.props.setSelectedStreet(null)
            this.props.setSelectedCity(null)
            this.props.setSelectedRegion(null)
            this.props.setRegionsInfo(null)
          }}>
            <Text style={{color: 'white', fontSize: 12, marginHorizontal: 4}}>{'< Назад'}</Text>
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
        
          <View style={{alignItems: 'center', margin: 10 }}>
            <Text>Авторизуйтеся за адресою</Text>
          </View>
          
          <TouchableOpacity
            disabled
            onPress={() => {
              this.props.setShownDialogId(REGION_DIALOG_ID)
              this.props.setSelectedRegion(null)
            }}
            style={{width: '80%', backgroundColor: '#EFEFEF', borderRadius: 12, paddingTop: 6, paddingBottom: 0, paddingHorizontal: 15, marginHorizontal: 5, }}>
            <View style={{borderColor: '#002B2B',  borderBottomWidth: 1, marginBottom: 6, paddingBottom: 2, paddingHorizontal: 2}}>
              <Text style={this.props.regionsInfo == null ? {fontSize: 15, color: 'gray'} : {fontSize: 15}}>
                {this.props.regionsInfo == null ? 'Оберіть область' : this.props.regionsInfo.region.name}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            disabled
            onPress={() => {
              this.props.setShownDialogId(CITY_DIALOG_ID)
              this.props.setSelectedCity(null)
            }}
            style={{width: '80%', backgroundColor: '#EFEFEF', marginTop: 10, borderRadius: 12, paddingTop: 6, paddingBottom: 0, paddingHorizontal: 15, marginHorizontal: 5, }}>
            <View style={{borderColor: '#002B2B',  borderBottomWidth: 1, marginBottom: 6, paddingBottom: 2, paddingHorizontal: 2}}>
              <Text style={this.props.regionsInfo == null ? {fontSize: 15, color: 'gray'} : {fontSize: 15}}>
                {this.props.regionsInfo == null ? 'Оберіть місто' : this.props.regionsInfo.city.name}
              </Text>
            </View> 
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => {
              this.props.setShownDialogId(STREET_DIALOG_ID)
              this.props.setSelectedFlat(null)
              this.props.setSelectedHouse(null)
              this.props.setSelectedStreet(null)
            }}
            style={{width: '80%', backgroundColor: '#EFEFEF', marginTop: 10, borderRadius: 12, paddingTop: 6, paddingBottom: 0, paddingHorizontal: 15, marginHorizontal: 5, }}>
            <View style={{borderColor: '#002B2B',  borderBottomWidth: 1, marginBottom: 6, paddingBottom: 2, paddingHorizontal: 2}}>
              <Text style={this.props.selectedStreet == null ? {fontSize: 15, color: 'gray'} : {fontSize: 15}}>
                {this.props.selectedStreet == null ? 'Оберіть вулицю' : this.props.selectedStreet.name}
              </Text>
            </View> 
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => {
              this.props.setShownDialogId(HOUSE_DIALOG_ID)
              this.props.setSelectedFlat(null)
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
                if(this.props.regionsInfo == null
                  || this.props.selectedStreet == null
                  || this.props.selectedHouse == null
                  || this.props.selectedFlat == null
                  || this.props.selectedAccountNumber == null){
                    return
                  }
                this.props.fetchTokenByAddress(this.props.regionsInfo, 
                  this.props.selectedStreet.id, 
                  this.props.selectedHouse,
                  this.props.selectedFlat,
                  this.props.selectedAccountNumber,
                  this.props.navigation)
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
    if(this.props.regionsInfo == null) return;
    let regions = [
      this.props.regionsInfo.region
    ];
    return(
      <Dialog.Container visible={this.props.shownDialogId == REGION_DIALOG_ID ? true : false}>
        <Dialog.Title>
           Оберіть область
        </Dialog.Title>
        <SearchableDropdown
            onItemSelect={(item) => {
              this.props.setSelectedRegion(item)
            }}
            containerStyle={{ paddingHorizontal: 10, paddingVertical: 5 }}
            itemStyle={{
              padding: 10              
            }}
            itemsContainerStyle={{ maxHeight: 140, borderRadius: 12 }}
            items={regions}
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
            this.props.setShownDialogId(null)
          }}
        />
      </Dialog.Container>);
  }

  getCityDialog(){
    if(this.props.regionsInfo == null) return;
    let cities = [
      this.props.regionsInfo.city
    ];
    return(
    <Dialog.Container visible={this.props.shownDialogId == CITY_DIALOG_ID ? true : false}>
      <Dialog.Title>
         Оберіть місто
      </Dialog.Title>
      <SearchableDropdown
          onItemSelect={(item) => {
            this.props.setSelectedCity(item)
          }}
          containerStyle={{ paddingHorizontal: 10, paddingVertical: 5 }}
          itemStyle={{
            padding: 10              
          }}
          itemsContainerStyle={{ maxHeight: 140, borderRadius: 12 }}
          items={cities}
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
          this.props.setShownDialogId(null)
        }}
      />
    </Dialog.Container>);
  }

  getStreetDialog(){
    if(this.props.regionsInfo == null) return;
    return(
      <Dialog.Container visible={this.props.shownDialogId == STREET_DIALOG_ID ? true : false}>
        <Dialog.Title>
          Оберіть вулицю
        </Dialog.Title>
        <SearchableDropdown
            onItemSelect={(item) => {
              this.props.setSelectedStreet(item)
            }}
            containerStyle={{ paddingHorizontal: 10, paddingVertical: 5 }}
            itemStyle={{
              padding: 10              
            }}
            itemsContainerStyle={{ maxHeight: 140, borderRadius: 12 }}
            items={this.props.regionsInfo.streets}
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
            this.props.setShownDialogId(null)
          }}
        />
      </Dialog.Container>);
  }

  getHouseDialog(){
    if(this.props.selectedStreet == null) return;
    let houses;
    for(let allHouses of this.props.regionsInfo.houses){
      if(allHouses.streetId === this.props.selectedStreet.id){
        houses = allHouses.array_agg
        break
      }
    }
    let result = new Array();
    for(let key in houses){
      result.push({
        id: key,
        name: houses[key]
      })
    }
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
            items={result}
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
            this.props.setShownDialogId(null)
          }}
        />
      </Dialog.Container>);
  }

  getFlatDialog(){
    if(this.props.selectedHouse == null) return;
    let flats;
    for(let allFlats of this.props.regionsInfo.flats){
      if(allFlats.streetId === this.props.selectedStreet.id
        && allFlats.house === this.props.selectedHouse){
          flats = allFlats.array_agg
          break
      }
    }
    let result = new Array();
    for(let key in flats){
      result.push({
        id: key,
        name: flats[key]
      })
    }
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
            items={result}
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
  
  getCityCompanyDialog(){
    if(this.props.companiesInfo == null) return;
    return(
      <Dialog.Container visible={this.props.shownDialogId == CITY_COMPANY_DIALOG_ID ? true : false}>
        <Dialog.Title>
          Оберіть місто
        </Dialog.Title>
        <SearchableDropdown
            onItemSelect={(item) => {
              this.props.setSelectedCityCompany(item.name)
              //console.log("ITEM", item)
              this.props.setCompanies(item.osbbs)
            }}
            containerStyle={{ paddingHorizontal: 10, paddingVertical: 5 }}
            itemStyle={{
              padding: 10              
            }}
            itemsContainerStyle={{ maxHeight: 140, borderRadius: 12 }}
            items={this.props.companiesInfo}
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
            this.props.setShownDialogId(null)
          }}
        />
      </Dialog.Container>);
  }

  getCompanyDialog(){
    if(this.props.companiesInfo == null) return;
    return(
      <Dialog.Container visible={this.props.shownDialogId == COMPANY_DIALOG_ID ? true : false}>
        <Dialog.Title>
          Оберіть компанію
        </Dialog.Title>
        <SearchableDropdown
            onItemSelect={(item) => {
              this.props.setSelectedCompany(item)
              console.log("ITEM_COMPANY", item)
            }}
            containerStyle={{ paddingHorizontal: 10, paddingVertical: 5 }}
            itemStyle={{
              padding: 10              
            }}
            itemsContainerStyle={{ maxHeight: 140, borderRadius: 12 }}
            items={this.props.companies}
            textInputProps={
              {
                placeholder: "Компанія",
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