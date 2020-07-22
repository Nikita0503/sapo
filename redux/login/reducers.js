import {CHANGE_CURRENT_TAB,
     CHANGE_EMAIL,
     CHANGE_PASSWORD, 
     CHANGE_SHOWN_DIALOG_ID,
     CHANGE_SELECTED_REGION,
     CHANGE_SELECTED_CITY,
     CHANGE_SELECTED_STREET,
     CHANGE_SELECTED_HOUSE,
     CHANGE_SELECTED_FLAT,
     CHANGE_SELECTED_ACCOUNT_NUMBER,
     CHANGE_TOKEN} from './actions';

const defaultState = {
    currentTab: 0,
    email: null,
    password: null,
    shownDialogId: null,
    selectedRegion: null,
    selectedCity: null,
    selectedStreet: null,
    selectedHouse: null,
    selectedFlat: null,
    selectedAccountNumber: null,
    token: null
}

export const loginReducer = (state = defaultState, action) => {
    switch (action.type){
        case CHANGE_CURRENT_TAB:
            return {
                ...state,
                currentTab: action.payload
            }
        case CHANGE_EMAIL:
            return {
                ...state,
                email: action.payload
            }
        case CHANGE_PASSWORD:
            return {
                ...state,
                password: action.payload
            }
        case CHANGE_SHOWN_DIALOG_ID:
            return {
                ...state,
                shownDialogId: action.payload
            }
        case CHANGE_SELECTED_REGION:
            return {
                ...state,
                selectedRegion: action.payload
            }
        case CHANGE_SELECTED_CITY:
            return {
                ...state,
                selectedCity: action.payload
            }
        case CHANGE_SELECTED_STREET:
            return {
                ...state,
                selectedStreet: action.payload
            }
        case CHANGE_SELECTED_HOUSE:
            return {
                ...state,
                selectedHouse: action.payload
            }
        case CHANGE_SELECTED_FLAT:
            return {
                ...state,
                selectedFlat: action.payload
            }
        case CHANGE_SELECTED_ACCOUNT_NUMBER:
            return {
                ...state,
                selectedAccountNumber: action.payload
            }
        case CHANGE_TOKEN:
            return {
                ...state,
                token: action.payload
            }
    }
    return state;
}