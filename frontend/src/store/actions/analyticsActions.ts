import { Response, ReferrersList } from "../../types";
import * as actionTypes from "./actionTypes";
import axios from "axios";

const instance = axios.create({ baseURL: "api" });

export const setReferrers = (data: Response<ReferrersList>) => {
  return {
    type: actionTypes.SET_REFERRERS,
    data: data
  };
};

export const fetchReferrersFailed = () => {
  return {
    type: actionTypes.FETCH_REFERRERS_FAILED
  };
};

export const initReferrers = () => {
  return async dispatch => {
    try {
      const data = await Promise.all([
        instance.get<Response<ReferrersList>>("referrals")
      ]);
      const referrers = data[0].data;
      dispatch(
        setReferrers({
          lastUpdated: referrers.lastUpdated,
          list: referrers.list
        })
      );
    } catch (e) {
      dispatch(fetchReferrersFailed());
    }
  };
};
