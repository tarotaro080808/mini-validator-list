import React from "react";
import connect from "react-redux/es/connect/connect";
import * as actions from "../../store/actions/index";

import SelectorDialog from "../../components/Common/SelectorDialog";

class SelectDialogContainer extends React.Component {
  handleSelect = item => {
    this.props.dia.handleSelect(item.value);
    this.props.onClose();
  };

  render() {
    const { dia, onClose } = this.props;

    return (
      <SelectorDialog
        dia={dia}
        onClose={onClose}
        onSelectItem={this.handleSelect}
      />
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
    onClose: () => dispatch(actions.closeDialog())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectDialogContainer);
