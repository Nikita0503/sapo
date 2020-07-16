import {CHANGE_EMAIL, CHANGE_PASSWORD} from './actions';

const defaultState = {
    email: null,
    password: null
}

export const loginReducer = (state = defaultState, action) => {
    switch (action.type){
        case CHANGE_EMAIL:
            console.log("CHANGE_EMAIL", action.payload)
            return {
                ...state,
                email: action.payload
            }
        case CHANGE_PASSWORD:
            return {
                ...state,
                password: action.payload
            }
    }
    return state;
}