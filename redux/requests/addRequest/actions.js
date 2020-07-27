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
