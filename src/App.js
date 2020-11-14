import './App.css';
import "react-router"
import LoginPage from "./LoginPage/LoginPage";
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import React from "react";
import Error404Page from "./Error404Page/Error404Page";
import StatsPage from "./StatsPage/StatsPage";

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/Stats/" component={StatsPage} />
            <Route path='/login' component={() => {
                window.location.href = 'https://accounts.spotify.com/fr/authorize?client_id=6220d59dbadf4d9796f969a2f2a4ee7e&response_type=code&redirect_uri=' + process.env.REACT_APP_SPOTIFY_REDIRECT + '&scope=user-top-read&show_dialog=true';
                return null;
            }}/>
          <Route exact path="/404/" component={Error404Page} />
          <Redirect to="/404/"/>
        </Switch>
      </Router>
  );
}

export default App;
