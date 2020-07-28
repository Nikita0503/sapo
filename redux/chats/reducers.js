import {
  CHANGE_ALL_CHATS,
  CHATS_ALL_CHATS_CLEAR,
  CHANGE_ALL_USERS,
  CHANGE_SELECTED_CHAT
} from './actions';

const defaultState = {
  allChats: null,
  allUsers: null,
  selectedChat: null,
};

export const allChatsReducer = (state = defaultState, action) => {

  switch (action.type) {
    case CHANGE_ALL_CHATS:
      return {
        ...state,
        allChats: action.payload
      }
    case CHATS_ALL_CHATS_CLEAR:
      return {
        ...state,
        allChats: null
      }
    case CHANGE_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload
      }
    case CHANGE_SELECTED_CHAT:
      return {
        ...state,
        selectedChat: action.payload
      }
  }

  return state;
};
