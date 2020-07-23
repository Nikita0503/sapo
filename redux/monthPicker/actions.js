export const HEADER_CHANGE_CURRENT_WORKPERIOD = 'HEADER_CHANGE_CURRENT_WORKPERIOD';

export const setCurrentWorkPeriod = currentWorkPeriod => ({
  type: HEADER_CHANGE_CURRENT_WORKPERIOD,
  payload: currentWorkPeriod
});
