import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {
  MuiThemeProvider,
  createMuiTheme,
  responsiveFontSizes
} from "@material-ui/core";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { allReducer } from "./Store/Reducers";

import { applyMiddleware } from "redux";
import { logger } from "redux-logger";

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Baloo Bhai 2", cursive'
  }
});

const store = createStore(allReducer, applyMiddleware(logger));

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={responsiveFontSizes(theme)}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);
