export const CHANGE_CURRENT_TAB = 'CHANGE_CURRENT_TAB';
export const CHANGE_EMAIL = 'CHANGE_EMAIL';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const CHANGE_SHOWN_DIALOG_ID = 'CHANGE_SHOWN_DIALOG_ID';
export const CHANGE_SELECTED_REGION = 'CHANGE_SELECTED_REGION';
export const CHANGE_SELECTED_CITY = 'CHANGE_SELECTED_CITY';
export const CHANGE_SELECTED_STREET = 'CHANGE_SELECTED_STREET';
export const CHANGE_SELECTED_HOUSE = 'CHANGE_SELECTED_HOUSE';
export const CHANGE_SELECTED_FLAT = 'CHANGE_SELECTED_FLAT';
export const CHANGE_SELECTED_ACCOUNT_NUMBER = 'CHANGE_SELECTED_ACCOUNT_NUMBER';

export const setCurrentTab = currentTab => ({
    type: CHANGE_CURRENT_TAB,
    payload: currentTab
});

export const setEmail = email => ({
    type: CHANGE_EMAIL,
    payload: email
});

export const setPassword = password => ({
    type: CHANGE_PASSWORD,
    payload: password
});

export const setShownDialogId = shownDialogId => ({
    type: CHANGE_SHOWN_DIALOG_ID,
    payload: shownDialogId
});

export const setSelectedRegion = selectedRegion => ({
    type: CHANGE_SELECTED_REGION,
    payload: selectedRegion
});

export const setSelectedCity = selectedCity => ({
    type: CHANGE_SELECTED_CITY,
    payload: selectedCity
});

export const setSelectedStreet = selectedStreet => ({
    type: CHANGE_SELECTED_STREET,
    payload: selectedStreet
});

export const setSelectedHouse = selectedHouse => ({
    type: CHANGE_SELECTED_HOUSE,
    payload: selectedHouse
});

export const setSelectedFlat = selectedFlat => ({
    type: CHANGE_SELECTED_FLAT,
    payload: selectedFlat
});

export const setSelectedAccountNumber = selectedAccountNumber => ({
    type: CHANGE_SELECTED_ACCOUNT_NUMBER,
    payload: selectedAccountNumber
});