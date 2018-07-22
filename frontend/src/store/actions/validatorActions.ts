import { Response, ValidatorList, GeoList, IFilter } from "../../types";
import * as actionTypes from "./actionTypes";
import axios from "axios";

const instance = axios.create({ baseURL: "api" });

export const filterValidators = (filter: IFilter) => {
  return {
    type: actionTypes.FILTER_VALIDATORS,
    data: filter
  };
};

export const setValidators = (data: Response<ValidatorList>) => {
  return {
    type: actionTypes.SET_VALIDATORS,
    data: data
  };
};

export const fetchValidatorsFailed = () => {
  return {
    type: actionTypes.FETCH_VALIDATORS_FAILED
  };
};

export const initValidators = () => {
  return async dispatch => {
    try {
      const data = await Promise.all([
        instance.get<Response<ValidatorList>>("validators"),
        instance.get<Response<GeoList>>("geo")
      ]);
      const validators = data[0].data;
      const geo = data[1].data;

      const merged = validators.list.map(validator => {
        const location = geo.list.filter(g => g.domain === validator.domain);
        if (location.length > 0) {
          return Object.assign(validator, location[0]);
        }
        return validator;
      });
      dispatch(
        setValidators({
          lastUpdated: validators.lastUpdated,
          list: merged
        })
      );
    } catch (e) {
      dispatch(fetchValidatorsFailed());
    }
  };
};
