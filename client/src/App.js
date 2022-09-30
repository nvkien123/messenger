import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Messenger from "./pages/messenger/Messenger";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  const [currentUser,setCurrentUser] = useState()
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Messenger /> : <Register />}
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login setCurrentUser={setCurrentUser}/>}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/messenger">
          {!user ? <Redirect to="/" /> : <Messenger />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
