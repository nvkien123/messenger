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
import { getUserById } from "./api/apiUser";

function App() {
  const fetchData = async()=>{
    if (user) {
      console.log("false")
      return 
    }
    let newUser = await getUserById(user._id)
    console.log("new user ",newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
    user = newUser
  }
  const { user } = useContext(AuthContext);
  fetchData()
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Messenger /> : <Register />}
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login/>}</Route>
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
