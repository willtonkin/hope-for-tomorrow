import {
  UPDATE_TEXT_VALUE,
  REQUEST_STARTED,
  REQUEST_SUCCEEDED,
  REQUEST_FAILED
} from "./actions";

const initialState = {
  carbonIntensityLatestData: {},
  errorMessage: "",
  isFetching: false,
  isError: false,
  lastUpdated: 0,
  powerConsumptionBreakdownLatestData: {},
  text: ""
};

export default function reducer(state = initialState, action) {
  console.log(`${action.type} reducer fired`, action);

  switch (action.type) {
    case UPDATE_TEXT_VALUE:
      return { ...state, text: action.value };
    case REQUEST_STARTED:
      return {
        ...state,
        isFetching: true
      };
    case REQUEST_SUCCEEDED:
      return {
        ...state,
        carbonIntensityLatestData: action.carbonIntensityLatestData,
        isError: false,
        isFetching: false,
        lastUpdated: Date.now(),
        powerConsumptionBreakdownLatestData: action.powerConsumptionBreakdownLatestData
      };
    case REQUEST_FAILED:
      return {
        ...state,
        errorMessage: action.message,
        isFetching: false,
        isError: true
      };
    default:
      return state;
  }
}
