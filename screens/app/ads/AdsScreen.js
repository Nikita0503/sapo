import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Alert,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import ScreenHeader from '../../../components/ScreenHeader';
import ActionButton from 'react-native-action-button';
import { RadioButton } from 'react-native-paper';
import { NavigationEvents } from 'react-navigation';
import Dialog from 'react-native-dialog';
import PDFReader from 'rn-pdf-reader-js';
import ImageZoom from 'react-native-image-pan-zoom';

export default class AdsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.onAdvertisementDataChange = this.onAdvertisementDataChange.bind(this);
    this.onAdvertisementOsbbNameChange = this.onAdvertisementOsbbNameChange.bind(
      this
    );
    this.onSelectedPostChange = this.onSelectedPostChange.bind(this);
    this.onSelectedPostCommentsChange = this.onSelectedPostCommentsChange.bind(this);
    this.onAllCommentsChange = this.onAllCommentsChange.bind(this);
    this.onAllCommentsClear = this.onAllCommentsClear.bind(this);
    this.onAdvertisementSelectedFileChange = this.onAdvertisementSelectedFileChange.bind(this);
  }

  onAdvertisementDataChange(advertisementData) {
    this.props.setAdvertisementData(advertisementData);
  }

  onAdvertisementOsbbNameChange(advertisementOsbbName) {
    this.props.setAdvertisementOsbbName(advertisementOsbbName);
  }

  onSelectedPostChange(selectedPost) {
    this.props.setSelectedPost(selectedPost);
  }

  onSelectedPostCommentsChange(selectedPost) {
    this.props.setSelectedPostComments(selectedPost)
  }

  onAllCommentsChange(comments) {
    this.props.setAllComments(comments);
  }

  onAllCommentsClear() {
    this.props.setAllCommentsClear([]);
  }

  onAdvertisementSelectedFileChange(selectedFile){
    this.props.setAdvertisementSelectedFile(selectedFile)
  }

  onSelectedPostAllComentsChange(comments){
    this.props.setSelectedPostAllComents(comments)
  }

  componentDidMount() {
    this.onSelectedPostChange(null);
    this.onAllCommentsClear();
    this.fetchOsbbName();
    console.log('I am triggered123');
    var ws = new WebSocket(
      'wss://app.osbb365.com/socket.io/?auth_token=' +
        this.props.token +
        '&EIO=3&transport=websocket'
    );

    ws.onopen = () => {
      // connection opened123
      ws.send('4221["/notice/list",{"page":1,"limit":50}]'); // send a message
    }; //428["/comment/create",{"text":"qwe","noticeId":53}]

    ws.onmessage = e => {
      // a message was received
      if (e.data.substring(0, 4) == '4321') {
        const myObjStr = JSON.stringify(e.data.substring(4, e.data.length));
        var myObj = JSON.parse(myObjStr);
        var data = JSON.parse(myObj);
        for (var i = 0; i < data[0].length; i++) {
          for (var j = 0; j < data[0][i].variants.length; j++) {
            data[0][i].variants[j].id = data[0][i].id;
          }
        }
        this.onAdvertisementDataChange(data[0]);
        if (data[0].length > 0) {
          this.fetchCommentsByAdvertisementId(0);
        }
        ws.close();
      }
    };
  }

  fetchCommentsByAdvertisementId(index) {
    var ws = new WebSocket(
      'wss://app.osbb365.com/socket.io/?auth_token=' +
        this.props.token +
        '&EIO=3&transport=websocket'
    );

    ws.onopen = () => {
      // connection opened123
      ws.send(
        '4210["/notice/one/comments",{"id":' +
          this.props.advertisementData[index].id +
          ',"page":1,"limit":10}]'
      ); // send a message
    }; //428["/comment/create",{"text":"qwe","noticeId":53}]

    ws.onmessage = e => {
      // a message was received
      if (e.data.substring(0, 4) == '4310') {
        const myObjStr = JSON.stringify(e.data.substring(4, e.data.length));
        var myObj = JSON.parse(myObjStr);
        var data = JSON.parse(myObj);
        var obj = {
          id: this.props.advertisementData[index].id,
          data: data[0],
        };
        this.onAllCommentsChange(obj);
        //console.log('comments123', obj);
        ws.close();
        index++;
        if (index != this.props.advertisementData.length) {
          this.fetchCommentsByAdvertisementId(index);
        }
      }
    };
  }

  fetchOsbbName() {
    fetch(
      'https://app.osbb365.com/api/tenant/osbb?accountId=' +
        this.props.accountId +
        '&osbbId=' +
        this.props.osbbId +
        '&workPeriod=' +
        this.props.workPeriods[this.props.workPeriods.length - 1],
      /*'https://app.osbb365.com/api/tenant/osbb?'
    + 'accountId=' + this.props.accountId
    + '&osbbId=' + this.props.osbbId
    + 'workPeriod=' + this.props.workPeriods[this.props.workPeriods.length-1]*/ {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.props.token + '',
        },
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        this.onAdvertisementOsbbNameChange(responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  }

  getLoadingView(){
    if(this.props.advertisementData == null){
      return(
      <View style={styles.container, {marginTop: '50%'}}>
        <ActivityIndicator size="large" style={styles.loader} color="#002B2B" />
        <Text style={{color: '#002B2B', fontSize: 16, marginTop: 20, alignSelf: 'center'}}>
          Зачекайте, дані завантажуються
        </Text>
      </View>);
    }
  }

  
getFileShowDialog(){
  if(this.props.advertisementSelectedFile != null){
    var type = this.props.advertisementSelectedFile.substring(this.props.advertisementSelectedFile.length - 3)
    var path = this.props.advertisementSelectedFile;
    //type = 'jpg'
    console.log("TYPE", type)
    switch(type){
      case 'jpg':
        return(
          <ImageZoom cropWidth={320}
                       cropHeight={300}
                       imageWidth={320}
                       imageHeight={300}>
        <Image
          style={{width: 320, height: 300, resizeMode: 'contain'}}
          source={{uri: 'https://app.osbb365.com' + path}}
        /></ImageZoom>)
      case 'png':
        return(
          <ImageZoom cropWidth={320}
                       cropHeight={300}
                       imageWidth={320}
                       imageHeight={300}>
        <Image
          style={{width: 320, height: 300, resizeMode: 'contain'}}
          source={{uri: 'https://app.osbb365.com' + path}}
        /></ImageZoom>)
      case 'svg':
        return(
          <ImageZoom cropWidth={320}
                       cropHeight={300}
                       imageWidth={320}
                       imageHeight={300}>
        <Image
          style={{width: 320, height: 300, resizeMode: 'contain'}}
          source={{uri: 'https://app.osbb365.com' + path}}
        /></ImageZoom>)
      case 'pdf':
        return(
        <PDFReader
          style={{width: 250, maxHeight: 400}}
          source={{
            uri: 'https://app.osbb365.com' + path,
          }}
        />
        ) 
      default: 
        //download('https://app.osbb365.com' + path)
        return(<Text>У розробці...</Text>)
        
    }
  }
}

  render() {
    return (
      <View
        style={{ width: '100%', height: '100%', backgroundColor: '#EEEEEE',  }}>
        
        <ScreenHeader
            navigation={this.props.navigation} 
            title="Оголошення"
            userData={this.props.userData}
            imageAvatar={this.props.imageAvatar} />
        <View style={styles.container}>
          {this.getLoadingView()}
          <FlatList
            style={{ marginBottom: 80 }}
            showsVerticalScrollIndicator={false}
            data={this.props.advertisementData}
            renderItem={({ item }) => (
              <Item
                token={this.props.token}
                author={
                  this.props.advertisementOsbbName == null
                    ? ''
                    : this.props.advertisementOsbbName.name
                }
                data={item}
                allComments={this.props.allComments}
                selectedPost={this.props.selectedPost}
                selectedPostComments={this.props.selectedPostComments}
                onSelectedPostChange={this.onSelectedPostChange}
                onSelectedPostCommentsChange={this.onSelectedPostCommentsChange}
                navigation={this.props.navigation}
                advertisementData={this.props.advertisementData}
                selectedPostAllComents={this.props.selectedPostAllComents}
                onAdvertisementDataChange={this.onAdvertisementDataChange}
                onAdvertisementSelectedFileChange={this.onAdvertisementSelectedFileChange}
                onSelectedPostAllComentsChange={this.onSelectedPostAllComentsChange}
              />
            )}
            keyExtractor={item => item.header}
          />
        </View>
        <Dialog.Container
            visible={this.props.advertisementSelectedFile == null ? false : true}>
            <Dialog.Title>
              {this.props.advertisementSelectedFile == null
                ? ''
                : this.props.advertisementSelectedFile.name}
            </Dialog.Title>
            <View style={{alignSelf: 'center'}}>
              {this.getFileShowDialog()}
            </View>
            
            <Dialog.Button
              label="OK"
              onPress={() => {
                this.onAdvertisementSelectedFileChange(null);
              }}
            />
          </Dialog.Container>
      </View>
    );
  }
}


function getDate(data) {
  if (data == null) return;
  var date = new Date(data);
  var month;
  switch (date.getMonth()) {
    case 0:
      month = ' січ. ';
      break;
    case 1:
      month = ' лют. ';
      break;
    case 2:
      month = ' бер. ';
      break;
    case 3:
      month = ' квіт. ';
      break;
    case 4:
      month = ' трав. ';
      break;
    case 5:
      month = ' черв. ';
      break;
    case 6:
      month = ' лип. ';
      break;
    case 7:
      month = ' серп. ';
      break;
    case 8:
      month = ' вер. ';
      break;
    case 9:
      month = ' жовт. ';
      break;
    case 10:
      month = ' лист. ';
      break;
    case 11:
      month = ' груд. ';
      break;
  }
  return (
    date.getDate() +
    month +
    date.getFullYear() +
    ':' +
    date.getHours() +
    ':' +
    date.getMinutes()
  );
}

class Item extends React.Component {
  getVotingResult() {
    return this.props.data.variants.map(variant => {
      return (
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 10,
            marginVertical: 3,
          }}>
          <Text
            style={{
              fontSize: 15,
              color: '#002B2B',
              width: 50,
              marginHorizontal: 2,
            }}>
            {parseInt(variant.percent) + '%'}
          </Text>
          <Text style={{ fontSize: 15, color: '#B2B2B2', width: 50 }}>
            {variant.amount}
          </Text>
          <Text style={{ fontSize: 16, color: '#B2B2B2' }}>
            {variant.header}
          </Text>
        </View>
      );
    });
  }

  getVotedVoting() {
    return this.props.data.variants.map(variant => {
      return (
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 10,
            marginVertical: 3,
          }}>
          <RadioButton
            disabled
            value="first"
            color="pink"
            status={variant.selected ? 'checked' : 'unchecked'}
            
          />
          <Text style={{ fontSize: 16, color: '#B2B2B2', marginTop: 6 }}>
            {variant.header}
          </Text>
        </View>
      );
    });
  }

  getActiveVoting() {
    return this.props.data.variants.map(variant => {
      return (
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 10,
            marginVertical: 3,
          }}>
          <RadioButton
            value={variant.header}
            color="pink"
            onPress={() => {
              //alert(variant.id);

              var ws = new WebSocket(
                'wss://app.osbb365.com/socket.io/?auth_token=' +
                  this.props.token +
                  '&EIO=3&transport=websocket'
              );

              ws.onopen = () => {
                /*
                ws.send(
                  '4210["/notice/vote/optionSelected",{"noticeId":' +
                    variant.id +
                    ',"voteVariantId":' +
                    variant.variantId +
                    '}]'
                );*/
                Alert.alert(
                  'Підтвердження',
                  'Ви впевненні у вашому варіанті?',
                  [
                    {text: 'Так', onPress: () => {
                      ws.send(
                        '4210["/notice/vote/optionSelected",{"noticeId":' +
                          variant.id +
                          ',"voteVariantId":' +
                          variant.variantId +
                          '}]'
                      );
                    }},
                    {text: 'Ні', onPress: () => console.log('No pressed')}
                  ],
                  { cancelable: true }
                )
              };

              ws.onmessage = e => {
                // a message was received
                if (e.data.substring(0, 4) == '4310') {
                  var data = this.props.advertisementData;
                  Alert.alert(
                    'Повідомлення',
                    'Ваш голос було зараховано',
                    [
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: true }
                  )
                  for (var i = 0; i < data.length; i++) {
                    if (variant.id == data[i].id) {
                      for (var j = 0; j < data[i].variants.length; j++) {
                        if (
                          data[i].variants[j].variantId == variant.variantId
                        ) {
                          data[i].variants[j].selected = true;
                          data[i].voted = true;
                        }
                      }
                    }
                  }
                  this.props.onAdvertisementDataChange(data);
                }
              };
            }}
          />
          <Text style={{ fontSize: 16, color: '#B2B2B2', marginTop: 6 }}>
            {variant.header}
          </Text>
        </View>
      );
    });
  }

  getVoting() {
    if (this.props.data.voteClosed == null) {
      return;
    }
    if (this.props.data.voteClosed) {
      return <View>{this.getVotingResult()}</View>;
    } else {
      if (this.props.data.voted) {
        return <View>{this.getVotedVoting()}</View>;
      } else {
        return <View>{this.getActiveVoting()}</View>;
      }
    }
  }

  getCommentsListData() {
    if (this.props.allComments.length == 0) {
      return;
    }
    for (var i = 0; i < this.props.allComments.length; i++) {
      if (this.props.allComments[i].id == this.props.data.id) {
        return this.props.allComments[i].data;
      }
    }
  }

  fetchSelectedPostComments() {
    var ws = new WebSocket(
      'wss://app.osbb365.com/socket.io/?auth_token=' +
        this.props.token +
        '&EIO=3&transport=websocket'
    );

    ws.onopen = () => {
      // connection opened123
      ws.send(
        '4210["/notice/one/comments",{"id":' +
          this.props.selectedPostComments.id +
          ',"page":1,"limit":10}]'
      ); // send a message
    }; //428["/comment/create",{"text":"qwe","noticeId":53}]

    ws.onmessage = e => {
      // a message was received
      if (e.data.substring(0, 4) == '4310') {
        const myObjStr = JSON.stringify(e.data.substring(4, e.data.length));
        var myObj = JSON.parse(myObjStr);
        var data = JSON.parse(myObj);
        var obj = {
          id: this.props.advertisementData[index].id,
          data: data[0],
        };
        this.onAllCommentsChange(data[0]);
        console.log('comments123', data[0]);
        ws.close();
      }
    };
  }

  showComments() {
    if (this.props.selectedPostComments == null) {
      return (
        <TouchableOpacity
          onPress={() => {
            this.props.onSelectedPostCommentsChange(this.props.data);
            //this.props.onCommentListChange(null);
          }}>
          <View
            style={{
              width: '100%',
              backgroundColor: '#F9F9F9',
              alignItems: 'center',
              borderRadius: 15
            }}>
            <Text
              style={{
                marginTop: 10,
                marginBottom: 10,
                color: '#002B2B',
                fontSize: 18,
              }}>
              ↓ Показати коментарі
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    if (this.props.selectedPostComments.id != this.props.data.id) {
      return (
        <TouchableOpacity
          onPress={() => {
            this.props.onSelectedPostCommentsChange(this.props.data);
          }}>
          <View
            style={{
              width: '100%',
              backgroundColor: '#F9F9F9',
              alignItems: 'center',
            }}>
            <Text
              style={{
                marginTop: 10,
                marginBottom: 10,
                color: '#002B2B',
                fontSize: 18,
              }}>
              ↓ Показати коментарі
            </Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <Dialog.Container
            visible={this.props.selectedPostComments.id == this.props.data.id}>
              {this.getNoCommentsView()}
            <FlatList
            style={{height: '70%' }}
            data={this.getCommentsListData()}
            renderItem={({ item }) => (
              <ItemComment
                author={item.User.lastName + ' ' + item.User.firstName}
                text={item.text}
                time={getDate(item.updatedAt)}
                photo={item.User.photo}
              />
            )}
            keyExtractor={item => item.id}
          />
            
            <Dialog.Button
              label="OK"
              onPress={() => {
                this.props.onSelectedPostCommentsChange(null);
              }}
            />
          </Dialog.Container>
        
      );
    }
  }
      /*<View>
          <TouchableOpacity
            onPress={() => {
              this.props.onSelectedPostCommentsChange(null);
            }}>
            <View
              style={{
                width: '100%',
                backgroundColor: '#F9F9F9',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  color: '#364A5F',
                  fontSize: 18,
                }}>
                ↑ Сховати коментарі
              </Text>
            </View>
          </TouchableOpacity>
          {this.getNoCommentsView()}
          <FlatList
            style={{ marginVertical: 10 }}
            data={this.getCommentsListData()}
            renderItem={({ item }) => (
              <ItemComment
                author={item.User.lastName + ' ' + item.User.firstName}
                text={item.text}
                time={getDate(item.updatedAt)}
                photo={item.User.photo}
              />
            )}
            keyExtractor={item => item.id}
          />
        </View> */
  getNoCommentsView(){
    if(this.getCommentsListData() != null){
      if(this.getCommentsListData().length == 0){
        return(<Text style={{color: '#002B2B', fontSize: 16, marginTop: 10, alignSelf: 'center'}}>Даних немає</Text>)
      }
    }else{
      return(
          <ActivityIndicator size="large" style={styles.loader} color="#002B2B" />
          )
    }
  }

  render() {
    return (
      <View style={{ margin: 5, backgroundColor: 'white', width: '95%', borderRadius: 15 }}>
        <Text
          style={{
            color: '#002B2B',
            marginHorizontal: 10,
            marginVertical: 5,
            fontSize: 20,
          }}>
          {this.props.data.header}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <View>
            <Text style={{ color: '#002B2B', marginHorizontal: 10 }}>
              {this.props.author}
            </Text>
            <Text style={{ color: '#CDCDCD', marginHorizontal: 10 }}>
              {getDate(this.props.data.updatedAt)}
            </Text>
          </View>
        </View>
        <Text style={{ marginHorizontal: 10, marginVertical: 5, fontSize: 14 }}>
          {this.props.data.text}
        </Text>
        <FlatList
          horizontal
          style={{marginStart: 5}}
          data={this.props.data.documents}
          renderItem={({ item }) => <ItemFile file={item} onAdvertisementSelectedFileChange={this.props.onAdvertisementSelectedFileChange}/>}
          listKey={(item, index) => 'C' + index.toString()}
        />
        {this.getVoting()}
        <TouchableOpacity
          onPress={() => {
            this.props.onSelectedPostChange(this.props.data);
            this.props.navigation.navigate('AddCommentToAd');
          }}>
          <View
            style={{
              backgroundColor: '#F9F9F9',
              alignItems: 'center',
              margin: 10,
              borderRadius: 15
            }}>
            <Text
              style={{
                marginTop: 10,
                marginBottom: 10,
                color: '#002B2B',
                fontSize: 18,
              }}>
              Додати коментар +
            </Text>
          </View>
        </TouchableOpacity>
        {this.showComments()}
      </View>
    );
  }
}

class ItemComment extends React.Component {
  getAvatar() {
    if (this.props.photo == null) return;
    return (
      <Image
        source={{
          uri: 'https://app.osbb365.com' + this.props.photo,
        }}
        style={{
          width: 50,
          height: 50,
          resizeMode: 'contain',
          alignSelf: 'center',
          borderRadius: 25
        }}
      />
    );
  }

  render() {
    return (
      <View style={{ backgroundColor: '#F9F9F9', margin: 10, borderRadius: 15 }}>
        <View style={{ flexDirection: 'row' }}>
          {this.getAvatar()}
          <View>
            <Text style={{ color: '#002B2B', marginLeft: 5, marginTop: 5 }}>
              {this.props.author}
            </Text>
            <Text style={{ color: '#CDCDCD', marginLeft: 5, marginBottom: 5 }}>
              {this.props.time}
            </Text>
          </View>
        </View>
        <Text
          style={{
            color: '#002B2B',
            marginHorizontal: 15,
            marginTop: 5,
            marginBottom: 15,
          }}>
          {this.props.text}
        </Text>
      </View>
    );
  }
}

class ItemFile extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={() => {
        this.props.onAdvertisementSelectedFileChange(this.props.file)
      }}>
        <View
          style={{
            flexDirection: 'row',
            
          }}>
          {getImage(this.props.file)}
        </View>
      </TouchableOpacity>
    );
  }
}

function getImage(type) {
  switch (type.substring(type.length - 3)) {
    case 'pdf':
      return (
        <Image
          resizeMode="contain"
          style={{ width: 50, height: 50 }}
          source={require('../../../content/images/ic_pdf.png')}
        />
      );

    case 'png':
      return (
        <Image
          resizeMode="contain"
          style={{ width: 50, height: 50 }}
          source={require('../../../content/images/ic_jpg.png')}
        />
      );

    case 'jpg':
      return (
        <Image
          resizeMode="contain"
          style={{ width: 50, height: 50 }}
          source={require('../../../content/images/ic_jpg.png')}
        />
      );
    case 'svg':
      return (
        <Image
          resizeMode="contain"
          style={{ width: 50, height: 50 }}
          source={require('../../../content/images/ic_jpg.png')}
        />
      );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    marginLeft: 5,
    marginEnd: 5,
    alignItems: 'center',
  },
});