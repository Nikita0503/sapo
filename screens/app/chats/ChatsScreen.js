import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Dialog from 'react-native-dialog';
import ScreenHeader from '../../../components/ScreenHeader';
import { NavigationEvents } from 'react-navigation';
import { Checkbox, TextInput } from 'react-native-paper';

export default class ScreenChats extends React.Component {

  componentDidMount() {
    this.props.fetchAllChats(this.props.workPeriods, this.props.token);
  }

  getLoadingView(){
    if(this.props.allChats == null){
      return(<View style={styles.container, {marginTop: '50%'}}>
        <ActivityIndicator size="large" style={styles.loader} color="#062A4F" />
        <Text style={{color: '#062A4F', fontSize: 16, marginTop: 20, alignSelf: 'center'}}>
          Зачекайте, дані завантажуються
        </Text>
        </View>);
    }
  }

  getUserListModal = () => {
    if(!this.props.showMembers) return null
    return(
      <Dialog.Container visible={this.props.showMembers}>
        <Dialog.Title>
          Оберіть користувача
        </Dialog.Title>
        <FlatList
          data={this.props.allUsers}
          style={{height: '80%', backgroundColor: '#f0f0f0', marginHorizontal: 3}} 
          renderItem={({ item }) => {
            return(<TouchableOpacity 
              style={{
                backgroundColor: 'white', 
                margin: 5, 
                borderRadius: 15
              }}
              onPress={() => {
                this.props.addChat(this.props.workPeriods, item)
              }}>
              <Text style={{color: '#062A4F', fontSize: 16, marginHorizontal: 15, marginVertical: 10}}>{item.fullName}</Text>
            </TouchableOpacity>
            )}}
          keyExtractor={item => item.id}
        />
        <Dialog.Button
          label="Відмінити"
          onPress={() => {
            this.props.setToggleShowMembers()
          }}
        />
      </Dialog.Container>
    )
  }

  getUserGroupListModal = () => {
    if(!this.props.showMembersGroup) return null
    return(
      <Dialog.Container visible={this.props.showMembersGroup}>
        <Dialog.Title>
          Оберіть користувачів
        </Dialog.Title>
        <TextInput 
          value={this.props.newGroupName}
          onChangeText={(text) => this.props.setNewGroupNmae(text)}
          underlineColor='#062A4F' 
          theme={{colors: {text: '#062A4F', primary: '#062A4F'}}} 
          label="Назва бесіди"/>
        <FlatList
          data={this.props.allUsers}
          style={{height: '70%', backgroundColor: '#f0f0f0', marginHorizontal: 3}} 
          renderItem={({ item }) => {
            return(<TouchableOpacity 
              style={{
                backgroundColor: 'white', 
                margin: 5, 
                borderRadius: 15,
                flexDirection: 'row',
              }}
              onPress={() => {
                this.props.setSelectedUser(item.id)
              }}>
              <Checkbox 
                status={item.isSelected ? 'checked' : 'unchecked'}
                style={{width: 20, height: 20, marginTop: 10, borderColor: '#062A4F'}}/>

              <Text style={{color: '#062A4F', fontSize: 16, marginHorizontal: 15, marginVertical: 10}}>{item.fullName}</Text>
            </TouchableOpacity>
            )}}
          keyExtractor={item => item.id}
        />
        <Dialog.Button
          label="Створити"
          onPress={() => {
            this.props.addGroupChat(this.props.workPeriods, this.props.allUsers, this.props.newGroupName)
          }}
        />
        <Dialog.Button
          label="Відмінити"
          onPress={() => {
            this.props.setToggleShowMembersGroup()
          }}
        />
      </Dialog.Container>
    )
  }

  getButtonsPanel = () => {
    console.log("allUsers", this.props.allUsers)
    return(
      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => {
            Alert.alert(
              "Тип чату",
              "Ви хочете створити:",
              [
                {
                  text: "Діалог",
                  onPress: () => this.props.setToggleShowMembers(),
                },
                {
                  text: "Группу",
                  onPress: () => {
                    this.props.setToggleShowMembersGroup()
                  },
                },
                {
                  text: "Нічого",
                  onPress: () => console.log("Відміна"),
                  style: "cancel"
                },
              ],
              { cancelable: true }
            );
            
          }}>
            <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => {
            
          }}>
            <Image resizeMode="center" style={styles.buttonImage} source={require('../../../content/images/ic_profile.png')} />
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <View
        style={{ width: '100%', height: '100%', backgroundColor: '#EEEEEE' }}>
        <NavigationEvents
          onDidFocus={() => {
            this.componentDidMount();
          }}
        />
        <ScreenHeader 
          navigation={this.props.navigation} 
          title="Чати"
          userData={this.props.userData}
          imageAvatar={this.props.imageAvatar} />
        <View style={styles.container}>
          {this.getButtonsPanel()}
          {this.getLoadingView()}
          {this.getUserListModal()}
          {this.getUserGroupListModal()}
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.props.allChats}
            renderItem={({ item }) => (
              <Item
                data={item}
                removeChat={this.props.removeChat}
                navigation={this.props.navigation}
                allUsers={this.props.allUsers}
                setAllChatsSelectedChat={this.props.setAllChatsSelectedChat}
              />
            )}
            keyExtractor={item => item.text}
          />
        </View>
      </View>
    );
  }
}

class Item extends React.Component {
  getAvatar() {
    if (this.props.allUsers == null) {
      return;
    }
    for (var i = 0; i < this.props.allUsers.length; i++) {
      if (this.props.allUsers[i].id == this.props.data.usersId[0]) {
        if (this.props.allUsers[i].photo == null) {
          return (
            <Image
              style={{
                width: 50,
                height: 50,
                resizeMode: 'contain',
                marginLeft: 5,
                marginRight: 5,
              }}
              source={require('../../../content/images/ic_avatar.png')}
            />
          );
        }
        return (
          <Image
            style={{
              width: 50,
              height: 50,
              resizeMode: 'contain',
              marginLeft: 5,
              marginRight: 1,
            }}
            source={{
              uri: 'https://app.sapo365.com' + this.props.allUsers[i].photo,
            }}
          />
        );
      }
    }
  }

  render() {
    return (
      <TouchableOpacity
        onLongPress={() => {
          Alert.alert(
            "Підтвердження",
            "Ви впевнені у тому що хочете покинути чат?",
            [
              {
                text: "Ні",
                onPress: () => console.log("Відміна"),
                style: "cancel"
              },
              { text: "Так", onPress: () => this.props.removeChat(this.props.data)}
            ],
            { cancelable: true }
          );
        }}
        onPress={() =>{
          this.props.setAllChatsSelectedChat(this.props.data);
          this.props.navigation.navigate('Chat', {
            title: this.props.data.title,
          });
        }}>
        <View style={styles.itemStyle}>
          {this.getAvatar()}
          <Text style={{color: "red"}}>{this.props.data.unread != 0 ? this.props.data.unread : ""}</Text>
          <Text style={styles.itemTextStyle}>{this.props.data.alias == null ? this.props.data.title : this.props.data.alias}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    paddingHorizontal: 5,
    paddingBottom: 5,
    marginLeft: 10,
    marginEnd: 10,
    marginBottom: 8,
  },
  itemStyle: {
    borderRadius: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 5,
    margin: 3,
    height: 60
  },
  itemTextStyle: {
    fontSize: 16,
    color: '#062A4F',
    alignContent: 'flex-start',
    margin: 10,
    marginTop: 12,
    width: '70%',
  },
  buttonsContainer: {
    width: '100%',
    height: 60,
    backgroundColor: 'white',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    marginBottom: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  button: {
    backgroundColor: "#062A4F",
    width: 45,
    height: 45,
    borderRadius: 50,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 30,
    marginBottom: 2,
    marginLeft: 1
  },
  buttonImage: {
    width: 30, 
    height: 30,
    marginBottom: 2,
    marginLeft: 1,
  }
});
