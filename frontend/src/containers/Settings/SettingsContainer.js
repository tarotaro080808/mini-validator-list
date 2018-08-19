import React from "react";
import connect from "react-redux/es/connect/connect";
import * as actions from "../../store/actions/index";

import axios from "../../util/axios-api";
import withNetworkHandler from "../../hoc/withNetworkHandler/withNetworkHandler";
import { t, res } from "../../services/i18nService";

import ListPanel from "../../components/Common/ListPanel";
import LanguageSettingListItem from "../../components/Settings/LanguageSettingListItem";
import ThemeTypeSettingListItem from "../../components/Settings/ThemeTypeSettingListItem";

class SettingsContainer extends React.Component {
  render() {
    const {
      app,
      onDialogOpen,
      onChangeLanguage,
      onChangeThemeType
    } = this.props;
    return (
      <ListPanel title={t(res.SETTINGS_APPEARANCE)}>
        <LanguageSettingListItem
          selectedValue={app.lang}
          onItemClick={(title, items) =>
            onDialogOpen(title, items, app.lang, onChangeLanguage)
          }
        />
        <ThemeTypeSettingListItem
          selectedValue={app.themeType}
          onItemClick={(title, items) =>
            onDialogOpen(title, items, app.themeType, onChangeThemeType)
          }
        />
      </ListPanel>
    );
  }
}

const mapStateToProps = state => {
  return {
    app: state.app
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChangeLanguage: lang => dispatch(actions.setLanguage(lang)),
    onChangeThemeType: themeType =>
      dispatch(actions.toggleThemeType(themeType)),
    onDialogOpen: (title, items, selectedValue, handleSelect) =>
      dispatch(
        actions.openDialog({
          title,
          items,
          handleSelect,
          selectedValue
        })
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNetworkHandler(SettingsContainer, axios));
