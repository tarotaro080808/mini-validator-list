import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState: any = {
  message: "",
  type: "",
  variant: ""
};

const showNotification = (state, action) => {
  return updateObject(state, action.data);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_NOTIFICATION:
      return showNotification(state, action);
    default:
      return state;
  }
};

export default reducer;
