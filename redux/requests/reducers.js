import {
    APPLICATIONS_AND_OFFERS_DATA,
    APPLICATIONS_AND_OFFERS_SELECTED_OFFER_DATA,
    APPLICATIONS_AND_OFFERS_DATA_CLEAR,
    APPLICATIONS_AND_OFFERS_ONLY_MY,
    APPLICATIONS_AND_OFFERS_LOADING,
    APPLICATIONS_AND_OFFERS_FIRSTLY_OPENED,
    APPLICATIONS_AND_OFFERS_DISPLAY_ARCHIVED
  } from './actions';
  
  const defaultState = {
    applicationsAndOffersData: [],
    applicationsAndOffersDataMy: [],
    selectedOfferData: null,
    onlyMy: false,
    loading: false,
    firstlyOpened: false,
    displayArchived: false
  };
  
  export const applicationsAndOffersReducer = (state = defaultState, action) => {
    switch (action.type) {
      case APPLICATIONS_AND_OFFERS_DATA:
        return {
          ...state,
          applicationsAndOffersData: [
            ...state.applicationsAndOffersData,
            action.payload,
          ],
        };
      case APPLICATIONS_AND_OFFERS_DATA_CLEAR:
        return {
          ...state,
          applicationsAndOffersData: [],
        };
      case APPLICATIONS_AND_OFFERS_SELECTED_OFFER_DATA:
        return {
          ...state,
          selectedOfferData: action.payload,
        };
      case APPLICATIONS_AND_OFFERS_ONLY_MY:
        return {
          ...state,
          onlyMy: action.payload
        }
      case APPLICATIONS_AND_OFFERS_LOADING:
        return {
          ...state,
          loading: action.payload
        }
      case APPLICATIONS_AND_OFFERS_FIRSTLY_OPENED:
        return {
          ...state,
          firstlyOpened: !state.firstlyOpened
        }
      case APPLICATIONS_AND_OFFERS_DISPLAY_ARCHIVED:
        return {
          ...state,
          displayArchived: !state.displayArchived
        }
    }
  
    return state;
  };
  