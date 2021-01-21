
export const CHANGE_ACCRUALS_DATA = 'CHANGE_ACCRUALS_DATA';
export const CHANGE_SELECTED_ACCRUALS_DATA = 'CHANGE_SELECTED_ACCRUALS_DATA';

export const setCurrentAccrualsData = currentAccrualsData => ({
  type: CHANGE_ACCRUALS_DATA,
  payload: currentAccrualsData
});

export const setSelectedAccrualsData = selectedAccrualsData => ({
  type: CHANGE_SELECTED_ACCRUALS_DATA,
  payload: selectedAccrualsData
});

export const fetchAccrualHistory = (token, accountId, osbbId, currentWorkPeriod) => {
    return async dispatch => {
        try{
            const answerPromise = await fetch('https://app.gsoft.net.ua/api/tenant/charges/total?accountId=' +
                  accountId.id +
                  '&osbbId=' +
                  osbbId +
                  '&workPeriod=' +
                  currentWorkPeriod,
                {
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token + '',
                  },
                }
              );
                
            const answer = await answerPromise.json();
            const data = sortCurrentAccrualsData(answer.chargesList);
            dispatch(setCurrentAccrualsData(data))
        } catch (error) {
            console.log("fetchAccrualHistory", error)
        }
    }
}

function sortCurrentAccrualsData(data){
    data.sort(function (a, b) {
      if (a.caption > b.caption) {
        return 1;
      }
      if (a.caption < b.caption) {
        return -1;
      }
      return 0;
    });
    
    return data
  }