import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";
import LanguageIcon from "@material-ui/icons/LanguageRounded";
import { t, res, i18nService } from "../../services/i18nService";

const styles = theme => ({});

class LanguageSettingListItem extends React.Component {
  render() {
    const { onItemClick } = this.props;
    const options = (() => {
      const langs = i18nService.getAvailableLanguages();
      return Object.keys(langs).map(key => ({
        primaryLabel: langs[key],
        value: key
      }));
    })();

    const title = t(res.SETTINGS_LANGUAGE);

    return (
      <IconButton
        color="inherit"
        aria-label="Change Language"
        onClick={() => onItemClick(title, options)}
      >
        <LanguageIcon />
      </IconButton>
    );
  }
}

export default withStyles(styles)(LanguageSettingListItem);
