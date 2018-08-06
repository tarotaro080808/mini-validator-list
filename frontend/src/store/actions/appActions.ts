import { Response, ArchivesList } from "../../types";
import * as actionTypes from "./actionTypes";
import axiosInstance from "../../util/axios-api";

export const fetchArchivesFailed = () => {
  return {
    type: actionTypes.FETCH_ARCHIVES_FAILED
  };
};

export const selectDefaultUnl = item => {
  return async dispatch => {
    try {
      axiosInstance.post(`/archives/${item.date}`);
      dispatch({
        type: actionTypes.DEFAULT_UNL_SELECTED,
        data: item
      });
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
        axiosInstance.get<Response<ArchivesList>>("/archives")
      ]);
      const archives = data[0].data;
      dispatch({
        type: actionTypes.SET_ARCHIVES,
        data: archives.list
      });
    } catch (e) {
      dispatch(fetchArchivesFailed());
    }
  };
};
