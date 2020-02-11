import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Wrapper from "./HOC/Wrapper";

ReactDOM.render(
  <Wrapper>
    <App />
  </Wrapper>,
  document.getElementById("root")
);
