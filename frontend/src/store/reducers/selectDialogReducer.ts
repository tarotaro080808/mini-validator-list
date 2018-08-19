import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
import { State } from "../../types";

const initialState: State.SelectDialogState = {
  title: undefined,
  items: undefined,
  selectedValue: undefined,
  handleSelect: undefined,
  open: false
};

const openDialog = (state, action) => {
  return updateObject(state, action.data);
};

const closeDialog = (state, action) => {
  return updateObject(state, action.data);
};

const reducer = (state: State.SelectDialogState = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_DIALOG:
      return openDialog(state, action);
    case actionTypes.CLOSE_DIALOG:
      return closeDialog(state, action);
    default:
      return state;
  }
};

export default reducer;
