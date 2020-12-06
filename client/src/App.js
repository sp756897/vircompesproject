import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import {Provider} from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import CreateIdea from "./components/dashboard/Create_Idea";
import Ideasboard from "./components/dashboard/Ideasboard";
import YourIdeas from "./components/dashboard/Yourideas";
import Jointeam from "./components/dashboard/Jointeam";
import Requests from "./components/dashboard/Requests";
import Search from "./components/dashboard/Search";
import Teammembers from "./components/dashboard/Teammembers";
import Chat from "./components/chat/Chat";


// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
        <div className="App">
          <Navbar/>
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/idea" component={CreateIdea}  />
              <PrivateRoute exact path="/ideas" component={Ideasboard}  />
              <PrivateRoute exact path="/userideas" component={YourIdeas}  />
              <PrivateRoute exact path="/othersideas" component={Jointeam}  />
              <PrivateRoute exact path="/requests" component={Requests}  />
              <PrivateRoute exact path="/search" component={Search}  />
              <PrivateRoute exact path="/teammembers" component={Teammembers}  />
              <PrivateRoute exact path="/chat" component={Chat}  />
            </Switch>
        </div>
      </Router>
      </Provider>
    );
  }
}
export default App;