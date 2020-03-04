import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Navbar from "./ui/Navbar";
import Search from "./pages/Search";
import BrowseAnime from "./pages/BrowseAnime";
import BrowseManga from "./pages/BrowseManga";
import MediaDetails from "./pages/MediaPage";
import "./styles/main.scss";
import User from "./pages/User";
import Login from "./pages/Login";

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
              render={props => <MediaDetails {...props} type="ANIME" />}
            />
            <Route
              exact
              path="/manga/:id"
              render={props => <MediaDetails {...props} type="MANGA" />}
            />
            <Route exact path="/search" component={Search} />
            <Route exact path="/user/" component={User} />
            <Route exact path="/login/" component={Login} />
            <Redirect exact from="*" to="/anime" />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
