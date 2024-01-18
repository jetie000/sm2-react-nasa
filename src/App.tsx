import React from "react";
import ReactDOM from "react-dom/client";

import "./index.scss";
import { store } from "./store/store";
import { Provider } from "react-redux";
import Home from "./pages/Home";

const App = () => (
  <Provider store={store}>
    <Home/>
  </Provider>
);
const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
root.render(<App />)