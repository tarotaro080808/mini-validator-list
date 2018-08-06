import { IFilter } from "../../types";
import * as actionTypes from "./actionTypes";
import axiosInstance from "../../util/axios-api";

export const filterValidators = (filter: IFilter) => {
  return {
    type: actionTypes.FILTER_VALIDATORS,
    data: filter
  };
};

export const fetchValidatorsFailed = () => {
  return {
    type: actionTypes.FETCH_VALIDATORS_FAILED
  };
};

export const initValidators = (date, filter) => {
  return async dispatch => {
    try {
      const data = await Promise.all([
        axiosInstance.get<any>(`validators${date ? `/${date}` : ""}`)
      ]);
      const validators = data[0].data;
      dispatch({
        type: actionTypes.SET_VALIDATORS,
        data: {
          lastUpdated: validators.lastUpdated,
          validators: validators.list,
          filter: filter
        }
      });
    } catch (e) {
      dispatch(fetchValidatorsFailed());
    }
  };
};
