import {CHANGE_TOPIC, 
        CHANGE_TEXT, 
        CHANGE_SYSTEM, 
        CHANGE_PUBLICITY, 
        CHANGE_BUTTON_SEND } from "./actions";

const defaultState = {
  addOfferTopic: null,
  addOfferText: null,
  addOfferSystem: null,
  addOfferPublicity: null,
  addOfferIsDisabled: false
}

export const addOfferReducer = (state = defaultState, action) => {
  switch (action.type){
    case CHANGE_TOPIC:
      return {
        ...state,
        addOfferTopic: action.payload,
      }   
    case CHANGE_TEXT:
      return {
        ...state,
        addOfferText: action.payload,
      }   
    case CHANGE_SYSTEM:
      return {
        ...state,
        addOfferSystem: action.payload,
      }  
    case CHANGE_PUBLICITY:
      return {
        ...state,
        addOfferPublicity: action.payload,
      }      
    case CHANGE_BUTTON_SEND:
      return {
        ...state,
        addOfferIsDisabled: action.payload
      }
  } 
  return state;
}