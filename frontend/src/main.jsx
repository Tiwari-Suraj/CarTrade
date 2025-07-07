import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { MotionConfig } from "motion/react";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <MotionConfig viewport={{ once: true }}>
        <App />
      </MotionConfig>
    </BrowserRouter>
  </Provider>
);
