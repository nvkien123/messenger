import { useContext, useRef } from "react";
import "./login.css";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { loginCall } from "../../api/apiUser";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching } = useContext(AuthContext);

  const handleClick = async(e) => {
    e.preventDefault();
    let newUser =  await loginCall(
      { email: email.current.value, password: password.current.value }
    );
    console.log("new user ",newUser)
    if(newUser){
      localStorage.setItem("user", JSON.stringify(newUser))
      window.location = "/"
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">messenger</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Messenger.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                <a href="/register" style={{color:"white",textDecoration:"none"}}>Create a New Account</a>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
