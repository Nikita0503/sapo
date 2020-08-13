import Toast from 'react-native-tiny-toast'
export const CHANGE_ADVERTISEMENT_TEXT = 'CHANGE_ADVERTISEMENT_TEXT';
export const CHANGE_ADVERTISEMENT_BUTTON_SEND = 'CHANGE_ADVERTISEMENT_BUTTON_SEND';

export const setAddCommentToAdvertisementText = text => ({
  type: CHANGE_ADVERTISEMENT_TEXT,
  payload: text
});

export const setAddCommentToAdvertisementButtonSend = isDisabled => ({
  type: CHANGE_ADVERTISEMENT_BUTTON_SEND,
  payload: isDisabled
})

export const sendComment = (addCommentToAdvertisementText, selectedPost, navigation, token) => {
  return async dispatch => {
      try {
        dispatch(setAddCommentToAdvertisementButtonSend(true))
        var ws = new WebSocket(
          'wss://app.sapo365.com/socket.io/?auth_token=' +
            token +
            '&EIO=3&transport=websocket'
        );

        ws.onopen = () => {
          var text = addCommentToAdvertisementText;
          text = text.replace(new RegExp('\n','g'), '\\n')
          ws.send('428["/comment/create",{"text":"' + text + '","noticeId":' + selectedPost.id + '}]');
        };

        ws.onmessage = e => {
          if (e.data.substring(0, 2) == '42' && e.data.substring(4, 11) == 'message'){
            const myObjStr = JSON.stringify(e.data.substring(2, e.data.length));
            var myObj = JSON.parse(myObjStr);
            var data = JSON.parse(myObj);
            Toast.show('Коментар успішно створено',{
              position: Toast.position.TOP,
              containerStyle:{backgroundColor: 'green'},
              textStyle: {},
              imgStyle: {},
              mask: false,
              maskStyle:{},
            })
            dispatch(setAddCommentToAdvertisementText(null));
            navigation.goBack();
            ws.close()
          }
        };
      } catch (error) {
          console.log("sendComment", "error");
      }
  }
}
