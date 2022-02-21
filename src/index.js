import React from "react";
import ReactDOM from "react-dom";
import html from "./index.html";
import style from "./styles/global.css";
import { initializeIcons } from "@fluentui/react";

initializeIcons(undefined, { disableWarnings: true });

import App from "./components/app.tsx";
ReactDOM.render(<App />, document.getElementById("root"));