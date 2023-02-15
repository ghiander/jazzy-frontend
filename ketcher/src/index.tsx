import {render} from "react-dom";
import React from "react";

import './styles.css';

import App from "./app";

const rootElement = document.getElementById("root");
render(<App />, rootElement);

if(process.env.NODE_ENV === 'development') {
  setTimeout(() => window.postMessage({type: 'streamlit:render'}));
}
