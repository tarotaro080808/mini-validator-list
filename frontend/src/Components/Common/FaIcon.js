import classNames from "classnames";
import Icon from "@material-ui/core/Icon";

const FaIcon = props =>
  props.color ? (
    <Icon className={classNames(props.icon)} color={props.color || undefined} />
  ) : (
    <Icon className={classNames(props.icon)} />
  );

export default FaIcon;
