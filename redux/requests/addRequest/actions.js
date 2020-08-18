import { Alert } from 'react-native';
export const CHANGE_TOPIC = 'ADD_OFFER_TOPIC';
export const CHANGE_TEXT = 'ADD_OFFER_TEXT';
export const CHANGE_SYSTEM = 'ADD_OFFER_SYSTEM';
export const CHANGE_PUBLICITY = 'ADD_OFFER_PUBLICITY';
export const CHANGE_BUTTON_SEND = 'ADD_OFFER_BUTTON_SEND';

export const setAddOfferTopic = addOfferTopic => ({
  type: CHANGE_TOPIC,
  payload: addOfferTopic
});

export const setAddOfferText = addOfferText => ({
  type: CHANGE_TEXT,
  payload: addOfferText
});

export const setAddOfferSystem = addOfferSystem => ({
  type: CHANGE_SYSTEM,
  payload: addOfferSystem
});

export const setAddOfferPublicity = addOfferPublicity => ({
  type: CHANGE_PUBLICITY,
  payload: addOfferPublicity
});

export const setAddOfferButtonSendIsDisabled = isDisabled => ({
  type: CHANGE_BUTTON_SEND,
  payload: isDisabled
});

export const addOffer = (addOfferText, addOfferSystem, addOfferPublicity, addOfferTopic, workPeriods, navigation, token) => {
  return async dispatch => {
      try {
        if(addOfferTopic == null 
          || addOfferText == null
          || addOfferSystem == null
          || addOfferPublicity == null
          || addOfferTopic.trim() == ''
          || addOfferText.trim() == ''){
            Alert.alert(
              'Повідомлення',
              'Заповнено некоректно',
              [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              { cancelable: true }
            )
            return
          }
        dispatch(setAddOfferButtonSendIsDisabled(true));
        var ws = new WebSocket(
          'wss://app.sapo365.com/socket.io/?auth_token=' +
            token +
            '&EIO=3&transport=websocket'
        );
        ws.onopen = () => {
          var text = addOfferText;
          text = text.replace(new RegExp('\n','g'), '\\n')
          var bool = addOfferPublicity ==
              1
              ? 'true'
              : 'false';
          var text = '4211["/claim/create",{"subject":"' +
              addOfferTopic +
              '","text":"' +
              text +
              '","systemId":"' +
              addOfferSystem +
              '","isPublic":' + bool
               +
                  ',"documents":[],"workPeriod":"' +
                  workPeriods[
                    workPeriods.length - 1
                  ] +
                  '"}]';
          ws.send(
            text
          );
        };
        ws.onmessage = e => {
          if (e.data.substring(0, 4) == '4311') {
            Alert.alert(
              'Повідомлення',
              'Надіслано успішно!',
              [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              { cancelable: true }
            )
            navigation.goBack();
          }
        };
      } catch (error) {
          console.log("withdrawRequest", "error");
      }
  }
}