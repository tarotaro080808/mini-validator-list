import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import SelectableListItem from "../Common/SelectableListItem";
import { t, res, i18nService } from "../../services/i18nService";

const styles = theme => ({});

class LanguageSettingListItem extends React.Component {
  render() {
    const { selectedValue, onItemClick } = this.props;
    const options = (() => {
      const langs = i18nService.getAvailableLanguages();
      return Object.keys(langs).map(key => ({
        primaryLabel: langs[key],
        value: key
      }));
    })();

    const title = t(res.SETTINGS_LANGUAGE);

    const selectedLabel = options.filter(o => o.value === selectedValue)[0];

    return (
      <SelectableListItem
        leftPrimaryLabel={title}
        rightPrimaryLabel={selectedLabel.primaryLabel}
        onItemSelect={() => onItemClick(title, options)}
      />
    );
  }
}

export default withStyles(styles)(LanguageSettingListItem);
