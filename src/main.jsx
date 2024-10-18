import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./features/store/index";
import App from "./App.jsx";
import "./index.css";
import '@src/assets/scss/main.scss';
import { CssBaseline } from "@mui/material";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      {/* <CssBaseline /> */}
      <App />
    </Provider>
  </StrictMode>
);
