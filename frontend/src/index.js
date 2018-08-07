import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import appReducer from "./store/reducers/appReducer";
import notificationReducer from "./store/reducers/notificationReducer";
import validatorReducer from "./store/reducers/validatorReducer";
import analyticsReducer from "./store/reducers/analyticsReducer";

import App from "./App";

const rootReducer = combineReducers({
  app: appReducer,
  notification: notificationReducer,
  validators: validatorReducer,
  analytics: analyticsReducer
});

let composeEnhancers = compose;
let applyTheseMiddleware = undefined;

if (process.env["NODE_ENV"] === "development") {
  const logger = store => {
    return next => {
      return action => {
        console.log("[Middleware] Dispatching", action);
        const result = next(action);
        console.log("[Middleware] next state", store.getState());
        return result;
      };
    };
  };
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  applyTheseMiddleware = applyMiddleware(logger, thunk);
} else {
  applyTheseMiddleware = applyMiddleware(thunk);
}

const store = createStore(rootReducer, composeEnhancers(applyTheseMiddleware));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#app")
);
