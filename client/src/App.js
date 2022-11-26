import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Messenger from "./pages/messenger/Messenger";
import {verifyUserByToken} from "./api/apiUser"
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  const [user,setUser] = useState();
  useEffect(()=>{
    console.log("oke")
    const fetchData = async()=>{
      const token = window.localStorage.getItem("userToken")
      console.log({token})
      if(token){
        const user = await verifyUserByToken(token)
        if(user){
          setUser(user)
        }
      }
    }
    fetchData()
  },[user])
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Messenger user={user}/> : <Register />}
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
