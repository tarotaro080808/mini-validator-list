import React from "react";
import SimpleSnackbar from "../Common/SimpleSnackbar";

import dateTime from "../../util/datetime";

const Component = props => {
  return (
    <SimpleSnackbar>
      LAST UPDATED: {" " + dateTime(props.vals.lastUpdated)}
    </SimpleSnackbar>
  );
};

export default Component;
