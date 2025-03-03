import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Theme/theme";
import { Provider } from "react-redux";
import store from "./Redux/Store";
import { Toaster } from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import { DataProvider } from "./Pages/DashboardPages/ExcelFileUpload/Context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <DataProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <App />
      </DataProvider>
    </ThemeProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
