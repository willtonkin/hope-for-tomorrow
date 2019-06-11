import {
  carbonIntensityLatest,
  powerConsumptionBreakdownLatest
} from "./api/endpoints";

export const UPDATE_TEXT_VALUE = "UPDATE_TEXT_VALUE";
export const REQUEST_STARTED = "REQUEST_STARTED";
export const REQUEST_SUCCEEDED = "REQUEST_SUCCEEDED";
export const REQUEST_FAILED = "REQUEST_FAILED";

export function updateText(value) {
  return {
    type: UPDATE_TEXT_VALUE,
    value: value
  };
}

export function fetchData() {
  return async dispatch => {
    dispatch({ type: REQUEST_STARTED });

    try {
      const carbonIntensityLatestData = await carbonIntensityLatest();
      const powerConsumptionBreakdownLatestData = await powerConsumptionBreakdownLatest();

      dispatch({
        type: REQUEST_SUCCEEDED,
        carbonIntensityLatestData,
        powerConsumptionBreakdownLatestData,
        receivedAt: Date.now()
      });
    } catch (err) {
      dispatch({ type: REQUEST_FAILED, message: err.message });
    }
  };
}

export function fetchDataIfNeeded() {
  return (dispatch, getState) => {
    const state = getState();

    if (state.isFetching) {
      return;
    }

    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;

    if (state.lastUpdated < fiveMinutesAgo || state.isError) {
      return dispatch(fetchData());
    }
  };
}
