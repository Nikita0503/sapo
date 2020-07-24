import {
    ACCRUALS_DATA,
    SELECTED_ACCRUALS_DATA
} from './actions';

const defaultState = {
  accrualHistoryCurrentData: null,
  accrualHistoryCurrentSelectedData: null
};

export const accrualHistoryReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACCRUALS_DATA:
      return {
        ...state,
        accrualHistoryCurrentData: action.payload
      }
    case SELECTED_ACCRUALS_DATA:
      return {
        ...state,
        accrualHistoryCurrentSelectedData: action.payload
      }
  }
  return state;
};