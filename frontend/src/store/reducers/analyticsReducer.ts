import * as actionTypes from "../actions/actionTypes";
import { Response, AnalyticsState, ReferrersList } from "../../types";
import { updateObject } from "../utility";

const initialState: AnalyticsState = {
  referres: undefined,
  ready: false
};

const setReferrersReducer = (state, action) => {
  // original validator data
  const data = <Response<ReferrersList>>action.data;
  return updateObject(state, {
    referres: data.list,
    lastUpdated: data.lastUpdated,
    ready: true
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_REFERRERS:
      return setReferrersReducer(state, action);
    default:
      return state;
  }
};

export default reducer;
