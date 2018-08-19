import React from "react";
import { withStyles } from "@material-ui/core/styles";

import SelectableListItem from "../Common/SelectableListItem";
import { t, res } from "../../services/i18nService";

const styles = theme => ({});

class ThemeTypeSettingListItem extends React.Component {
  render() {
    const { selectedValue, onItemClick } = this.props;

    const options = (() => {
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
    })();

    const title = t(res.SETTINGS_THEME);

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

export default withStyles(styles)(ThemeTypeSettingListItem);
