
export const ACCRUALS_DATA = 'ACCRUALS_DATA';
export const SELECTED_ACCRUALS_DATA = 'SELECTED_ACCRUALS_DATA';

export const setCurrentAccrualsData = currentAccrualsData => ({
  type: ACCRUALS_DATA,
  payload: currentAccrualsData
});

export const setSelectedAccrualsData = selectedAccrualsData => ({
  type: SELECTED_ACCRUALS_DATA,
  payload: selectedAccrualsData
});

export const fetchAccrualHistory = (token, accountId, osbbId, currentWorkPeriod) => {
    return async dispatch => {
        try{
            const answerPromise = await fetch('https://app.osbb365.com/api/tenant/charges/total?accountId=' +
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