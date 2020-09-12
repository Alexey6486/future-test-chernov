import React from "react";
import './loadingFromServer.styles.scss';
import {LinearProgress, createMuiTheme, ThemeProvider} from "@material-ui/core";

export const LoadingFromServerComponent = () => {

    const theme = createMuiTheme({
        palette: {
            secondary: {
                main: '#fa9716',
            },
        },
    });

    return (
        <div className={'loadingBar'}>
            <ThemeProvider theme={theme}>
                <LinearProgress color="secondary"/>
            </ThemeProvider>
        </div>
    )
}