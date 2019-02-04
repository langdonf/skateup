import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router} from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
/* eslint-disable */
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
// pick utils

import DateFnsUtils from '@date-io/date-fns';

const theme = createMuiTheme(
    {
    "palette":
        {
        "common":
            {
            "black":"rgba(0, 0, 0, 0.78)",
            "white":"rgba(255, 255, 255, 1)"},
            "background":{
                "paper":"rgba(236, 240, 241, 1)",
                "default":"rgba(44, 62, 80, 1)"
            },
        "primary":
            {
            "light":"rgba(255, 84, 66, 1)",
            "main":"rgba(231, 76, 60, 1)",
            "dark":"#B83109",
            "contrastText":"#fff"},
        "secondary":
            {
            "light":"rgba(52, 152, 219, 1)",
            "main":"rgba(44, 62, 80, 1)",
            "dark":"rgba(52, 152, 219, 1)",
            "contrastText":"rgba(236, 240, 241, 1)"
            },
        "error":
            {
            "light":"rgba(248, 231, 28, 1)",
            "main":"rgba(245, 166, 35, 1)",
            "dark":"rgba(245, 166, 35, 1)",
            "contrastText":"#fff"},
        "text":
            {
            "primary":"rgba(0, 0, 0, 0.87)",
            "secondary":"rgba(0, 0, 0, 0.54)",
            "disabled":"rgba(0, 0, 0, 0.31)",
            "hint":"rgba(0, 0, 0, 0.38)"
            }
        },
    }
);

ReactDOM.render(
    <Router >
        <MuiThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <CssBaseline />
                <App />
            </MuiPickersUtilsProvider>
        </MuiThemeProvider>
    </Router>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
