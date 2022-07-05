import Home from "./pages/home/Home";
import Settings from "./pages/home/settings/Settings";
import Single from "./pages/home/single/Single";
import Write from "./pages/home/write/Write";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Topbar from "./topbar/Topbar";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const {user} = useContext(Context)
  return (
    <Router>
      <Topbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/register">
          {user ? <Home /> : <Register />}
        </Route>
        <Route exact path="/login">
          {user ? <Home /> : <Login />}
        </Route>
        <Route exact path="/write">
          {user ? <Write /> : <Register />}
        </Route>
        <Route exact path="/settings">
          {user ? <Settings /> : <Register />}
        </Route>
        <Route exact path="/post/:postId">
          <Single />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
