import {
    HOME_CHANGE_USERDATA,
    HOME_CHANGE_OSBB_ID,
    HOME_CHANGE_ACCOUNT_ID,
    HOME_CHANGE_ACCOUNT_IDS,
    HOME_CHANGE_WORK_PERIODS,
    HOME_CHANGE_ALL_APARTMENT_DATA,
    HOME_CHANGE_CURRENT_APARTMENT_DATA,
    HOME_CHANGE_ALL_COSTS_DATA,
    HOME_CHANGE_CURRENT_COSTS_DATA,
    HOME_CHANGE_DEBT_DATA,
    HOME_CHANGE_LIQPAY_DATA,
    HOME_CHANGE_IS_ACTIVATED,
    HOME_CLEAR_DATA
} from './actions';

const defaultState = {
  userData: null,
  osbbId: null,
  accountId: null,
  accountIds: [],
  number: null,
  workPeriods: [],
  allApartmentData: [],
  currentApartmentData: null,
  allCostsData: [],
  debtData: [],
  liqpayData: null,
  isActivated: null
};

export const homeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case HOME_CLEAR_DATA:
      return {
        ...state,
        userData: null,
        osbbId: null,
        accountId: null,
        accountIds: [],
        number: null,
        workPeriods: [],
        allApartmentData: [],
        currentApartmentData: null,
        allCostsData: [],
        debtData: [],
        liqpayData: null,
        isActivated: null
      }
    case HOME_CHANGE_IS_ACTIVATED:
      return {
        ...state,
        isActivated: action.payload
      }
    case HOME_CHANGE_USERDATA:
      return {
        ...state,
        userData: action.payload,
      };
    case HOME_CHANGE_OSBB_ID:
      return {
        ...state,
        osbbId: action.payload,
      };
    case HOME_CHANGE_ACCOUNT_ID:
      return {
        ...state,
        accountId: action.payload,
      };
    case HOME_CHANGE_ACCOUNT_IDS:
      return {
        ...state,
        accountIds: [...state.accountIds, action.payload],
      };
    case HOME_CHANGE_WORK_PERIODS:
      return {
        ...state,
        workPeriods: [...state.workPeriods, action.payload],
      };
    case HOME_CHANGE_ALL_APARTMENT_DATA:
      return {
        ...state,
        allApartmentData: [...state.allApartmentData, action.payload],
      };
    case HOME_CHANGE_CURRENT_APARTMENT_DATA:
      return {
        ...state,
        currentApartmentData: action.payload,
      };
    case HOME_CHANGE_ALL_COSTS_DATA:
      return{
        ...state,
        allCostsData: [...state.allCostsData, action.payload],
      }
    case HOME_CHANGE_CURRENT_COSTS_DATA:
      return{
        ...state,
        currentCostsData: action.payload
      }
    case HOME_CHANGE_DEBT_DATA:
      return{
        ...state,
        debtData: [...state.debtData, action.payload]
      }
    case HOME_CHANGE_LIQPAY_DATA:
      return{
        ...state,
        liqpayData: action.payload
      }
  }

  return state;
};
