import {
  CHANGE_ADVERTISEMENT_OSBB_NAME,
  CHANGE_ADVERTISEMENT_DATA,
  CHANGE_ADVERTISEMENT_SELECTED_POST,
  CHANGE_ADVERTISEMENT_SELECTED_POST_COMMENTS,
  CHANGE_ADVERTISEMENT_ALL_COMMENTS,
  CHANGE_ADVERTISEMENT_ALL_COMMENTS_CLEAR,
  CHANGE_ADVERTISEMENT_SELECTED_FILE
} from './actions';

const defaultState = {
  advertisementOsbbName: null,
  advertisementData: null,
  selectedPost: null,
  selectedPostComments: null,
  allComments: [],
  advertisementSelectedFile: null
};

export const advertisementReducer = (state = defaultState, action) => {

  switch (action.type) {
    case CHANGE_ADVERTISEMENT_OSBB_NAME:
      return {
        ...state,
        advertisementOsbbName: action.payload
      }
    case CHANGE_ADVERTISEMENT_DATA:
      return {
        ...state,
        advertisementData: action.payload,
      };
    case CHANGE_ADVERTISEMENT_SELECTED_POST:
      return {
        ...state,
        selectedPost: action.payload,
      };
    case CHANGE_ADVERTISEMENT_SELECTED_POST_COMMENTS:
      return {
        ...state,
        selectedPostComments: action.payload
      }
    case CHANGE_ADVERTISEMENT_ALL_COMMENTS:
      return {
        ...state,
        allComments: [...state.allComments, action.payload],
      };
    case CHANGE_ADVERTISEMENT_ALL_COMMENTS_CLEAR:
      return {
        ...state,
        allComments: []
      }
    case CHANGE_ADVERTISEMENT_SELECTED_FILE:
      return {
        ...state,
        advertisementSelectedFile: action.payload
      }
  }

  return state;
};
