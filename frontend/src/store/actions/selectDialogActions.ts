import * as actionTypes from "./actionTypes";
import { State } from "../../types";

export const closeDialog = () => {
  return {
    type: actionTypes.CLOSE_DIALOG,
    data: {
      open: false
    }
  };
};

export const openDialog = (newState: State.SelectDialogState) => {
  return {
    type: actionTypes.OPEN_DIALOG,
    data: { ...newState, open: true }
  };
};
