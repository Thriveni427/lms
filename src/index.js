/*
 src/index.js
*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./store";
import "../node_modules/bootstrap/scss/bootstrap.scss";
import "react-table/react-table.css";
import "./scss/style.scss";
import App from "./components/App";
import WebFont from "webfontloader";
import registerServiceWorker from "./registerServiceWorker";
import "react-toastify/dist/ReactToastify.css";
import "../node_modules/video-react/dist/video-react.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
WebFont.load({
  google: {
    families: ["Roboto:300,500,700", "Material Icons"]
  }
});
ReactDOM.render(
  <BrowserRouter>
    <Provider store={configureStore()}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
