import React from "react";
import ReactDOM from "react-dom";
// import "./styles/global.scss";
import App from "./views/App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./redux";
ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  // </React.StrictMode>
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
