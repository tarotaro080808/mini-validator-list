import * as React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const theme = createMuiTheme({
    palette: {
        primary: {
            light: "#CFD8DC",
            main: "#2C3E50",
            dark: "#455A64",
            contrastText: "#FFFFFF"
        },
        secondary: {
            main: "#18BC9C"
        },
        text: {
            primary: "#2C3E50"
        }
    },
    typography: {
        fontFamily: ["'Montserrat'", "Roboto"].join(",")
    }
});

function withRoot(Component) {
    function WithRoot(props) {
        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <Component {...props} />
            </MuiThemeProvider>
        );
    }

    return WithRoot;
}

export default withRoot;
