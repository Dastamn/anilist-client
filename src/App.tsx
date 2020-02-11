import React from "react";
import Navbar from "./components/Navbar";
import "./styles/main.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import BrowseAnime from "./containers/BrowseAnime";
import AnimeDetails from "./containers/AnimeDetails";

const App = () => {
  return (
    <div className="container">
      <Router>
        <div className="navbar">
          <Navbar />
        </div>
        <div className="main">
          <Switch>
            <Route path="/animes" component={BrowseAnime} />
            <Route path="/anime/:id" component={AnimeDetails} />
            <Redirect from="*" to="/animes" />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
