import {
    PAYMENTS_CHANGE_DATA
  } from './actions';
  
  const defaultState = {
    currentPaymentsData: []
  };
  
  export const paymentsReducer = (state = defaultState, action) => {
    
    switch (action.type) {
      case PAYMENTS_CHANGE_DATA:
        return {
          ...state,
          currentPaymentsData: action.payload,
        };
    }
  
    return state;
  };