import { Alert } from 'react-native';
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
export const CHANGE_TOKEN = 'CHANGE_TOKEN';

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

export const setToken = token => ({
    type: CHANGE_TOKEN,
    payload: token
})

export const fetchTokenByEmailPassword = (email, password) => {
    return async dispatch => {
        try{
            const tokenPromise = await fetch('https://app.sapo365.com/login', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  login: email.toLowerCase().trim(),
                  password: password
                }),
              });

              const token = await tokenPromise.json();
              console.log("fetchTokenByEmailPassword", token.token);
              if(token.token == undefined) {
                Alert.alert('Невірний логін або пароль', 'Користувач не знайдений');
              }
              dispatch(setToken(token.token))
        } catch (error) {
            console.log("fetchTokenByEmailPassword", "error")
        }
    }
}

export const fetchTokenByAddress = () => {
    return async dispatch => {
        try{
            const tokenPromise = await fetch('https://app.sapo365.com/auth', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    regionId: 1,
                    cityId: 1,
                    street: 1,
                    house: '3b',
                    flat: '23',
                    code: '208382-1'
                }),
                });
                
              const token = await tokenPromise.json();
              console.log("fetchTokenByAddress", token)
        } catch (error) {
            console.log("fetchTokenByAddress", "error");
        }
    }
}