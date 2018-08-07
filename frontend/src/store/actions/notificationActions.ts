import * as actionTypes from "./actionTypes";

export const fetchArchivesFailed = () => {
  return {
    type: actionTypes.FETCH_ARCHIVES_FAILED
  };
};

export const showNotification = (message, variant, type) => {
  return async dispatch => {
    try {
      dispatch({
        type: actionTypes.SHOW_NOTIFICATION,
        data: {
          message,
          variant,
          type
        }
      });
    } catch (e) {
      dispatch(fetchArchivesFailed());
    }
  };
};
