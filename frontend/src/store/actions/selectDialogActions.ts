import * as actionTypes from "./actionTypes";

export const selectDialogItem = item => {
  return {
    type: actionTypes.SELECT_DIALOG_ITEM,
    data: { selectedItem: item, open: false }
  };
};

export const closeDialog = () => {
  return {
    type: actionTypes.CLOSE_DIALOG,
    data: {
      open: false
    }
  };
};

export const openDialog = (title, items, handleSelect) => {
  return {
    type: actionTypes.OPEN_DIALOG,
    data: {
      title,
      items,
      handleSelect,
      open: true
    }
  };
};
