import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import SelectorDialog from "../../components/Common/SelectorDialog";

class SelectDialogContainer extends React.Component {
  render() {
    const { dia, onClose, onSelectItem } = this.props;

    return (
      <SelectorDialog dia={dia} onClose={onClose} onSelectItem={onSelectItem} />
    );
  }
}

const mapStateToProps = state => {
  return {
    dia: state.selectDialog
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSelectItem: item => dispatch(actions.selectDialogItem(item)),
    onClose: item => dispatch(actions.closeDialog(item))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectDialogContainer);
