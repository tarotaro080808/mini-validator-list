import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState: any = {
  title: undefined,
  items: undefined,
  selectedItem: undefined,
  handleSelect: undefined,
  open: false
};

const openDialog = (state, action) => {
  return updateObject(state, action.data);
};

const closeDialog = (state, action) => {
  return updateObject(state, action.data);
};

const selectDialogItem = (state, action) => {
  return updateObject(state, action.data);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_DIALOG:
      return openDialog(state, action);
    case actionTypes.CLOSE_DIALOG:
      return closeDialog(state, action);
    case actionTypes.SELECT_DIALOG_ITEM:
      return selectDialogItem(state, action);
    default:
      return state;
  }
};

export default reducer;
