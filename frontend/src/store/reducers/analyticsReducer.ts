import * as actionTypes from "../actions/actionTypes";
import { Response, AnalyticsState, ReferralsList } from "../../types";
import { updateObject } from "../utility";

const initialState: AnalyticsState = {
  referres: undefined,
  ready: false
};

const setReferralsReducer = (state, action) => {
  const data = <Response<ReferralsList>>action.data;
  return updateObject(state, {
    referres: data.list,
    lastUpdated: data.lastUpdated,
    ready: true
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_REFERRERS:
      return setReferralsReducer(state, action);
    default:
      return state;
  }
};

export default reducer;
