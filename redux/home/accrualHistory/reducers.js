import {
    CHANGE_ACCRUALS_DATA,
    CHANGE_SELECTED_ACCRUALS_DATA
} from './actions';

const defaultState = {
  accrualHistoryCurrentData: null,
  accrualHistoryCurrentSelectedData: null
};

export const accrualHistoryReducer = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_ACCRUALS_DATA:
      return {
        ...state,
        accrualHistoryCurrentData: action.payload
      }
    case CHANGE_SELECTED_ACCRUALS_DATA:
      return {
        ...state,
        accrualHistoryCurrentSelectedData: action.payload
      }
  }
  return state;
};