import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

enum AppMode {
  CURRENT_MODE = "CURRENT",
  ARCHIVE_MODE = "ARCHIVE"
}

const initialState: any = {
  mode: AppMode.CURRENT_MODE,
  archives: undefined,
  selectedDefaultUnl: undefined
};

const selectDefaultUnl = (state, action) => {
  return updateObject(state, {
    mode: AppMode.ARCHIVE_MODE,
    selectedDefaultUnl: action.data,
    ready: false
  });
};

const unselectDefaultUnl = state => {
  return updateObject(state, {
    mode: AppMode.CURRENT_MODE,
    selectedDefaultUnl: undefined,
    ready: true
  });
};

const setArchivesReducer = (state, action) => {
  return updateObject(state, {
    archives: action.data
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DEFAULT_UNL_SELECTED:
      return selectDefaultUnl(state, action);
    case actionTypes.DEFAULT_UNL_UNSELECTED:
      return unselectDefaultUnl(state);
    case actionTypes.SET_ARCHIVES:
      return setArchivesReducer(state, action);
    default:
      return state;
  }
};

export default reducer;
