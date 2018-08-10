import { Response, Archive } from "../../types";
import * as actionTypes from "./actionTypes";
import axiosInstance from "../../util/axios-api";
import { webStorage } from "../webStorage";

export const fetchArchivesFailed = () => {
  return {
    type: actionTypes.FETCH_ARCHIVES_FAILED
  };
};

export const toggleThemeType = themeType => {
  webStorage.setAppData({ themeType: themeType });
  return {
    data: themeType,
    type: actionTypes.TOGGLE_THEMETYPE
  };
};

export const selectDefaultUnl = item => {
  return async dispatch => {
    try {
      if (item.date.endsWith("(Latest)")) {
        dispatch({
          type: actionTypes.DEFAULT_UNL_UNSELECTED,
          data: undefined
        });
      } else {
        axiosInstance.post(`/archives/${item.date}`);
        dispatch({
          type: actionTypes.DEFAULT_UNL_SELECTED,
          data: item
        });
      }
    } catch (e) {
      dispatch(fetchArchivesFailed());
    }
  };
};

export const unselectDefaultUnl = () => {
  return async dispatch => {
    try {
      dispatch({
        type: actionTypes.DEFAULT_UNL_UNSELECTED,
        data: undefined
      });
    } catch (e) {
      dispatch(fetchArchivesFailed());
    }
  };
};

export const initArchives = () => {
  return async dispatch => {
    try {
      const data = await Promise.all([
        axiosInstance.get<Response<Archive>>("/archives")
      ]);
      const archives = data[0].data;
      archives.list[0].date += " (Latest)";
      dispatch({
        type: actionTypes.SET_ARCHIVES,
        data: archives.list
      });
    } catch (e) {
      dispatch(fetchArchivesFailed());
    }
  };
};
