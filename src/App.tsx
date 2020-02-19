import React from "react";
import Navbar from "./components/Navbar";
import "./styles/main.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Media from "./pages/Media";
import Search from "./pages/Search";
import BrowseAnime from "./pages/BrowseAnime";
import BrowseManga from "./pages/BrowseManga";

const App = () => {
  return (
    <div className="container">
      <Router>
        <div className="navbar">
          <Navbar />
        </div>
        <div className="main">
          <Switch>
            <Route exact path="/anime" component={BrowseAnime} />
            <Route exact path="/manga" component={BrowseManga} />
            <Route
              exact
              path="/anime/:id"
              render={props => <Media {...props} type="ANIME" />}
            />
            <Route
              exact
              path="/manga/:id"
              render={props => <Media {...props} type="MANGA" />}
            />
            <Route exact path="/search" component={Search} />
            <Redirect exact from="*" to="/anime" />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
