import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import withNetworkHandler from "../../hoc/withNetworkHandler/withNetworkHandler";
import axios from "../../util/axios-api";
import { t, res, i18nService } from "../../services/i18nService";
import SelectableListPanel from "../../components/Panels/SelectableListPanel";

const createLanguageOptions = () => {
  const langs = i18nService.getAvailableLanguages();
  return Object.keys(langs).map(key => ({
    primaryLabel: langs[key],
    value: key
  }));
};

const createThemeTypeOptions = () => {
  return [
    {
      primaryLabel: t(res.THEME_LIGHT),
      value: "light"
    },
    {
      primaryLabel: t(res.THEME_DARK),
      value: "dark"
    }
  ];
};

class SettingsContainer extends React.Component {
  handleSelectItem = (key, item) => {
    switch (key) {
      case "lang":
        this.props.onChangeLanguage(item);
        break;
      case "themeType":
        this.props.onChangeThemeType(item);
        break;
    }
  };

  handleDialogOpen = settingItem => {
    switch (settingItem.key) {
      case "lang":
        this.props.onOpen(
          t(res.LANGUAGE_SETTINGS),
          settingItem,
          this.handleSelectItem
        );
        break;
      case "themeType":
        this.props.onOpen(
          t(res.SETTINGS_THEME),
          settingItem,
          this.handleSelectItem
        );
        break;
    }
  };

  render() {
    const { app } = this.props;
    const items = [
      {
        key: "lang",
        primaryLabel: t(res.LANGUAGE_SETTINGS),
        selectedValue: app.lang,
        options: createLanguageOptions()
      },
      {
        key: "themeType",
        primaryLabel: t(res.SETTINGS_THEME),
        selectedValue: app.themeType,
        options: createThemeTypeOptions()
      }
    ];
    return (
      <SelectableListPanel
        items={items}
        title={t(res.SETTINGS_APPEARANCE)}
        onDialogOpen={this.handleDialogOpen}
      />
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
    onOpen: (title, items, handleSelect) =>
      dispatch(actions.openDialog(title, items, handleSelect))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNetworkHandler(SettingsContainer, axios));
