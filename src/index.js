import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import axios from "axios";
import thunk from "redux-thunk";

import { burgerBuilderReducer } from "./store/reducers/burgerBuilderReducer";
import { orderReducer } from "./store/reducers/orderReducer";
import { authReducer } from "./store/reducers/authReducer";
import ThemeContextProvider from "./context/ThemeContext";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer,
});

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

axios.defaults.baseURL =
  "https://react-burger-builder-341f6-default-rtdb.firebaseio.com";

ReactDOM.render(
  <ThemeContextProvider>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </ThemeContextProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
