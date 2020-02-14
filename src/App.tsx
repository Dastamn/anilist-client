import React from "react";
import Navbar from "./components/Navbar";
import "./styles/main.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Browse from "./containers/Browse";
import Media from "./containers/Media";

const App = () => {
  return (
    <div className="container">
      <Router>
        <div className="navbar">
          <Navbar />
        </div>
        <div className="main">
          <Switch>
            <Route
              exact
              path="/anime"
              render={props => <Browse {...props} type="ANIME" />}
            />
            <Route
              exact
              path="/manga"
              render={props => <Browse {...props} type="MANGA" />}
            />
            <Route exact path="/anime/:id" component={Media} />
            <Route exact path="/manga/:id" component={Media} />
            <Redirect exact from="*" to="/anime" />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
