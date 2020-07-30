export const CHANGE_ALL_HOUSE_DATA = 'CHANGE_ALL_HOUSE_DATA';
export const CHANGE_ALL_COSTS_HOUSE_DATA = 'CHANGE_ALL_COSTS_HOUSE_DATA';

export const setAllHouseData = allHouseData => ({
  type: CHANGE_ALL_HOUSE_DATA,
  payload: allHouseData
});

export const setAllHouseCostsData = allHouseCostsData => ({
  type: CHANGE_ALL_COSTS_HOUSE_DATA,
  payload: allHouseCostsData
});