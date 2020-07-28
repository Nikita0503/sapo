
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
