export const HOME_CHANGE_USERDATA = 'HOME_CHANGE_USERDATA';
export const HOME_CHANGE_OSBB_ID = 'HOME_CHANGE_OSBB_ID';
export const HOME_CHANGE_ACCOUNT_ID = 'HOME_CHANGE_ACCOUNT_ID';
export const HOME_CHANGE_ACCOUNT_IDS = 'HOME_CHANGE_ACCOUNT_IDS';
export const HOME_CHANGE_WORK_PERIODS = 'HOME_CHANGE_WORK_PERIODS';
export const HOME_CHANGE_ALL_APARTMENT_DATA = 'HOME_CHANGE_ALL_APARTMENT_DATA';
export const HOME_CHANGE_CURRENT_APARTMENT_DATA = 'HOME_CHANGE_CURRENT_APARTMENT_DATA';
export const HOME_CHANGE_ALL_COSTS_DATA = 'HOME_CHANGE_ALL_COSTS_DATA';
export const HOME_CHANGE_CURRENT_COSTS_DATA = 'HOME_CHANGE_CURRENT_COSTS_DATA';
export const HOME_CHANGE_DEBT_DATA = 'HOME_CHANGE_DEBT_DATA';
export const HOME_CHANGE_LIQPAY_DATA = 'HOME_CHANGE_LIQPAY_DATA';
export const HOME_CHANGE_IS_ACTIVATED = 'HOME_CHANGE_IS_ACTIVATED';
export const HOME_CLEAR_DATA = 'HOME_CLEAR_DATA';

export const clearState = () => ({
  type: HOME_CLEAR_DATA
})

export const setIsActivated = isActivated => ({
  type: HOME_CHANGE_IS_ACTIVATED,
  payload: isActivated
})

export const setUserData = userData => ({
  type: HOME_CHANGE_USERDATA,
  payload: userData
});

export const setOsbbId = osbbId => ({
  type: HOME_CHANGE_OSBB_ID,
  payload: osbbId
});

export const setAccountId = accountId => ({
  type: HOME_CHANGE_ACCOUNT_ID,
  payload: accountId
});

export const setAccountIds = accountIds => ({
  type: HOME_CHANGE_ACCOUNT_IDS,
  payload: accountIds
});

export const setWorkPeriods = workPeriods => ({
  type: HOME_CHANGE_WORK_PERIODS,
  payload: workPeriods
});

export const setAllApartmentData = allApartmentData => ({
  type: HOME_CHANGE_ALL_APARTMENT_DATA,
  payload: allApartmentData
});

export const setCurrentApartmentData = currentApartmentData => ({
  type: HOME_CHANGE_CURRENT_APARTMENT_DATA,
  payload: currentApartmentData
});

export const setAllCostsData = allCostsData => ({
  type: HOME_CHANGE_ALL_COSTS_DATA,
  payload: allCostsData
});

export const setCurrentCostsData = currentCostsData => ({
  type: HOME_CHANGE_CURRENT_COSTS_DATA,
  payload: currentCostsData
});

export const setDebtData = debtData => ({
  type: HOME_CHANGE_DEBT_DATA,
  payload: debtData
});

export const setLiqpayData = liqpayData =>({
  type: HOME_CHANGE_LIQPAY_DATA,
  payload: liqpayData
})

