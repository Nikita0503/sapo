import {
  CHANGE_ALL_CHATS,
  CHATS_ALL_CHATS_CLEAR,
  CHANGE_ALL_USERS,
  CHANGE_SELECTED_CHAT,
  CHANGE_TOGGLE_SHOW_MEMBERS,
  CHANGE_TOGGLE_SHOW_MEMBERS_GROUP,
  SELECT_USER,
  CHANGE_NEW_GROUP_NAME
} from './actions';

const defaultState = {
  allChats: null,
  allUsers: null,
  selectedChat: null,
  showMembers: false,
  showMembersGroup: false,
  newGroupName: ''
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
    case CHANGE_TOGGLE_SHOW_MEMBERS:
      return {
        ...state,
        showMembers: !state.showMembers
      }
    case CHANGE_TOGGLE_SHOW_MEMBERS_GROUP:
      return {
        ...state,
        showMembersGroup: !state.showMembersGroup
      }
    case SELECT_USER: 
      return {
        ...state,
        allUsers: state.allUsers.map((item) => {
          if(item.id === action.payload){
            return {
              ...item,
              isSelected: !item.isSelected
            }
          }else{
            return item
          }
        })
      }
    case CHANGE_NEW_GROUP_NAME:
      return {
        ...state,
        newGroupName: action.payload
      }
  }

  return state;
};
