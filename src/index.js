import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import rootReducer from "./slices";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const store = configureStore({
  reducer: rootReducer
})


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
          <Toaster />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
);