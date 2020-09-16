import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import ScreenHeader from '../../../../components/ScreenHeader';
import { NavigationEvents } from 'react-navigation';
import { BackHandler } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import Dialog from 'react-native-dialog';
import PDFReader from 'rn-pdf-reader-js';
import ImageZoom from 'react-native-image-pan-zoom';

export default class ChatScreen extends React.Component {

  constructor(props) {
    super(props);
    this.props.setChatAllMessages([]);
    this.props.setChatCurrentMessage(null);
    this.props.setChatCurrentImagesClear([]);
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    console.log("123", result)

    
    var ws = new WebSocket(
      'wss://app.sapo365.com/socket.io/?auth_token=' +
        this.props.token +
        '&EIO=3&transport=websocket'
    );

    ws.onopen = () => {
      
      ws.send(
        '42["socket.io-file::createFile",{"id":"u_0","name":"file1.png","size":2293127,"chunkSize":40960,"sent":0,"uploadTo":"documents"}]'
      );
      ws.send(
        '451-["socket.io-file::stream::u_0",{"_placeholder":true,"num":0}]'
      );

      ws.send(result.base64)
    };

    ws.onmessage = e => {
        //console.log("resp", e.data)  
    };

    /*ImgToBase64.getBase64String(result.uri)
      .then(base64String => {
        console.log("BASE_64", 123)
        console.log("BASE_64", base64String)}
      )
      .catch(err => console.log("error", err));*/

    /*let formdata = new FormData();
    formdata.append('photo', {
      uri: result.uri,
      name: 'image.jpg',
      type: 'image/jpeg',
    });
    this.props.sendPhoto(this.props.accountId,
      this.props.osbbId,
      this.props.workPeriods,
      formdata,
      this.props.token)
    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }*/

  };

  componentWillUnmount() {
    this.props.closeChat();
  }

  componentDidMount() {
    this.props.downloadMessages(this.props.selectedChat,
      this.props.workPeriods,
      this.props.token)
  }

  getIsMe(userId) {
    if (this.props.selectedChat.userId == userId) {
      return true;
    } else {
      return false;
    }
  }

  sendMessage() {
    if (this.props.currentMessage != null) {
      var photos = this.getCurrentImages();
      this.props.sendMessage(this.props.currentMessage,
        this.props.selectedChat,
        photos,
        this.props.workPeriods)
    }
  }

  getCurrentImages() {
    if(this.props.currentImages.length == 0) return "";
    var images = "";
    for(var i = 0; i < this.props.currentImages.length; i++){
      images +=  "\"" + this.props.currentImages[i] + "\"";
      if(i + 1 != this.props.currentImages.length){
        images += ",";
      }
    }
    return images;
  }

  getLoadingView(){
    if(this.props.loading){
      return(
        <View style={styles.container, {marginTop: '50%'}}>
          <ActivityIndicator size="large" style={styles.loader} color="#002B2B" />
          <Text style={{color: '#002B2B', fontSize: 16, marginTop: 20, alignSelf: 'center'}}>
            Зачекайте, дані завантажуються
          </Text>
        </View>);
    }
  }

  getMessages(){
    var allMessages = new Array();
    for(var i = 0; i < this.props.allMessages.length; i++){
      var exist = false;
      for(var j = 0; j < allMessages.length; j++){
        if(this.props.allMessages[i].id == allMessages[j].id){
          exist = true;
          break;
        }
      }
      if(!exist) allMessages.push(this.props.allMessages[i])
    }
    return allMessages;
  }

  render() {
    return (
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
        <View behavior="padding"
          style={{ width: '100%', height: '100%', backgroundColor: '#EEEEEE' }}>
          <NavigationEvents
            onDidFocus={() => {
              this.componentDidMount();
            }}
          />
          <ScreenHeader
            navigation={this.props.navigation}
            title={""}
            userData={this.props.userData}
            imageAvatar={this.props.imageAvatar}
          />
          <View style={styles.container}>
            <ScrollView
              ref="scrollView"
              onContentSizeChange={(width, height) =>
                this.refs.scrollView.scrollToEnd()
              }>
              <View style={styles.chatContainer}>
                {this.getLoadingView()}
                <FlatList
                  data={this.getMessages()}
                  renderItem={({ item }) => (
                    <Item
                      userData={this.props.userData}
                      text={item.text}
                      userId={item.userId}
                      me={this.getIsMe(item.userId)}
                      files={item.files}
                      allUsers={this.props.allUsers}
                      setSelectedFile={this.props.setSelectedFile}
                    />
                  )}
                  keyExtractor={item => item.id}
                />
              </View>
            </ScrollView>

            <View style={styles.messageContainer}>
              <TextInput
              multiline
                style={{
                  marginLeft: 10,
                  width: '75%',
                  fontSize: 16,
                  borderBottomWidth: 1,
                  borderBottomColor: 'gray',
                  alignSelf: 'center',
                  
                }}
                placeholder="Ваше повідомлення"
                onChangeText={text => {
                  this.props.setChatCurrentMessage(text);
                  this.refs.scrollView.scrollToEnd();
                }}
                value={this.props.currentMessage}
              />
              <TouchableOpacity
                onPress={this._pickImage}>
                <Image
                  style={{ width: 35, height: 35, marginHorizontal: 5 }}
                  source={require('../../../../content/images/ic_clip.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.sendMessage();
                }}>
                <Image
                  style={{ width: 35, height: 40, marginHorizontal: 5 }}
                  source={require('../../../../content/images/ic_send.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Dialog.Container
            visible={this.props.chatSelectedFile == null ? false : true}>
            <View style={{alignSelf: 'center'}}>
              {this.getFileShowDialog()}
            </View>
            <Dialog.Button
              label="OK"
              onPress={() => {
                this.props.setSelectedFile(null);
              }}
            />
        </Dialog.Container>
      </KeyboardAvoidingView>
    );
  }

  getFilesClip(){
    return(<TouchableOpacity
      onPress={this._pickImage}>
      <Image
        style={{ width: 35, height: 35, marginHorizontal: 5 }}
        source={require('../../../../content/images/ic_clip.png')}
      />
    </TouchableOpacity>)
  }

  getFileShowDialog(){
    if(this.props.chatSelectedFile != null){
      var type = this.props.chatSelectedFile.substring(this.props.chatSelectedFile.length - 3)
      var path = this.props.chatSelectedFile;
      switch(type){
        case 'jpg':
          return(
            <ImageZoom cropWidth={320}
                       cropHeight={300}
                       imageWidth={320}
                       imageHeight={300}>
          <Image
            style={{width: 320, height: 300, resizeMode: 'contain'}}
            source={{uri: 'https://app.sapo365.com' + path}}
          /></ImageZoom>)
        case 'png':
          return(
            <ImageZoom cropWidth={320}
                       cropHeight={300}
                       imageWidth={320}
                       imageHeight={300}>
          <Image
            style={{width: 320, height: 300, resizeMode: 'contain'}}
            source={{uri: 'https://app.sapo365.com' + path}}
          /></ImageZoom>)
        case 'svg':
          return(
            <ImageZoom cropWidth={320}
                       cropHeight={300}
                       imageWidth={320}
                       imageHeight={300}>
          <Image
            style={{width: 320, height: 300, resizeMode: 'contain'}}
            source={{uri: 'https://app.sapo365.com' + path}}
          /></ImageZoom>)
        case 'pdf':
          return(
          <PDFReader
            style={{width: 250, maxHeight: 400}}
            source={{
              uri: 'https://app.sapo365.com' + path,
            }}
          />
          )
        default: 
          return(<Text>In developing...</Text>)

      }
    }
  }
}

class Item extends React.Component {
  render() {
    return (
      <View
        style={
          this.props.me ? styles.myMessageStyle : styles.supportMessageStyle
        }>
        {this.getMessageText()}
        <FlatList
          data={this.props.files}
          renderItem={({ item }) => <ItemImage setSelectedFile={this.props.setSelectedFile} image={item} />}
          keyExtractor={item => item}
          listKey={item => item}
        />
      </View>
    );
  }

  getMessageText(){
    if(this.props.text != ""){
      return(
        <View>
          <Text style={styles.itemStyle, {color: "white",marginLeft: 10, marginRight: 8, marginVertical: 3, fontWeight: 'bold', fontSize: 12}}>{this.getUserName()}</Text>
          <Text style={styles.itemStyle, {color: "white", marginLeft: 10, marginBottom: 5}}>{this.props.text}</Text>
        </View>)
    }
  }

  getUserName(){
    for(var i = 0; i < this.props.allUsers.length; i++){
      if(this.props.me){
        return this.props.userData.firstName + " " + this.props.userData.lastName
      }else{
        if(this.props.allUsers[i].id == this.props.userId){
          return this.props.allUsers[i].fullName
        }
      }
    }
  }
}



class ItemImage extends React.Component {
  render() {
    return (
        getImage(this.props.image, this.props.setSelectedFile)
    );
  }
}

function getImage(image, setSelectedFile) {
  switch (image.substring(image.length - 3)) {
    case 'pdf':
      return (
        <TouchableOpacity
          onPress = {() => {
            setSelectedFile(image);
          }
        }
        style={{
          marginVertical: 5,
          alignItems: "center",
          backgroundColor: "#618C8C",
          padding: 5,
          marginHorizontal: 5
        }}>
          <Image
            style={{ width: 40, height: 50 }}
            source={require('../../../../content/images/ic_pdf.png')}
          />
        </TouchableOpacity>
      );
    case 'png':
      return (
        <TouchableOpacity
          onPress = {() => {
            setSelectedFile(image);
          }
        }
        style={{
          marginVertical: 5,
          alignItems: "center",
          backgroundColor: "#618C8C",
          padding: 5,
          marginHorizontal: 5
        }}>
        <Image
          style={{ width: 150, height: 150 }}
          resizeMode="contain"
          source={{ uri: 'https://app.sapo365.com' + image }}
        />
        </TouchableOpacity>
      );
    case 'jpg':
      return (
        <TouchableOpacity
          onPress = {() => {
            setSelectedFile(image);
          }
        }
        style={{
          marginVertical: 5,
          alignItems: "center",
          backgroundColor: "#618C8C",
          padding: 5,
          marginHorizontal: 5
        }}>
        <Image
          style={{ width: 150, height: 150 }}
          resizeMode="contain"
          source={{ uri: 'https://app.sapo365.com' + image }}
        />
        </TouchableOpacity>
      );
    case 'svg':
      return (
        <TouchableOpacity
          onPress = {() => {
            setSelectedFile(image);
          }
        }
        style={{
          marginVertical: 5,
          alignItems: "center",
          backgroundColor: "#618C8C",
          padding: 5,
          marginHorizontal: 5
        }}>
        <Image
          style={{ width: 150, height: 150 }}
          resizeMode="contain"
          source={{ uri: 'https://app.sapo365.com' + image }}
        />
        </TouchableOpacity>
      );
    default: return null;
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E1E7EC',
    alignItems: 'stretch',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  chatContainer: {
    width: '100%',
    marginBottom: 15,
  },
  supportMessageStyle: {
    maxWidth: '70%',
    alignSelf: 'flex-start',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    paddingHorizontal: 5,
    backgroundColor: '#224D4D',
  },
  myMessageStyle: {
    maxWidth: '70%',
    alignSelf: 'flex-end',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    paddingHorizontal: 5,
    backgroundColor: '#3A6565',
  },
  messageContainer: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  itemStyle: {
    fontSize: 16,
    color: '#364A5F',
    alignContent: 'flex-end',
    margin: 7,
  },
});
