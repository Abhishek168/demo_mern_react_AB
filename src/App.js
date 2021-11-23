import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import FetchAPI from "./comonent/FetchAPI";
import DisplayUser from "./comonent/DisplayUser";
import Navbar from "./comonent/Navbar";
import Pagination from "./comonent/Pagination";

import Login from "./comonent/Authentication/Login";
import Logout from "./comonent/Authentication/Logout";

import Home from "./comonent/Home";

const TokenValue = localStorage.getItem("tokenValue");

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <Route
            exact
            path="/addUser"
            component={() => <FetchAPI token={TokenValue} />}
          />
          <Route
            exact
            path="/displayUser"
            component={() => <DisplayUser token={TokenValue} />}
          />
          <Route
            exact
            path="/addUser/:id"
            component={() => <FetchAPI token={TokenValue} />}
          />
          <Route exact path="/pagination" component={Pagination} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
