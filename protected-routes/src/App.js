import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import AccountComponent from "./Pages/AccountComponent";
import HomeComponent from "./Pages/HomeComponent";
import CardComponent from "./Pages/CardComponent";
import ProtectedRoute from "./ProtectedRoute";
import useAuth from "./Component/useAuth";

function App() {
  const [isAuth, login, logout] = useAuth(true);
  return (
    <div className="App">
      <Router>
        <div className="nav-bar">
          <ul>
            <li>
              <Link to="/">home</Link>
            </li>
            <li>
              <Link to="/account">Account (Protected) </Link>
            </li>
            <li>
              <Link to="/card">Card (unprotected)</Link>
            </li>
          </ul>
        </div>
        {isAuth ? (
          <>
            <div className="ui message brown"> You are logged IN...</div>
            <button className="ui button blue" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <div className="ui message violet">You are logged out ..</div>{" "}
            <button className="ui button blue" onClick={login}>
              Login
            </button>{" "}
          </>
        )}
        <Switch>
          <Route exact path="/" component={HomeComponent} />
          <Route exact path="/card" component={CardComponent} />
          <ProtectedRoute
            path="/account"
            component={AccountComponent}
            auth={isAuth}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
