import {HEADER_CHANGE_CURRENT_WORKPERIOD} from "./actions"

const defaultState = {
  currentWorkPeriod: ''
}

export const headerReducer = (state = defaultState, action) => {
  
  switch (action.type){
    case HEADER_CHANGE_CURRENT_WORKPERIOD:
      return {
        ...state,
        currentWorkPeriod: action.payload
      }
  } 
  
  return state;
}