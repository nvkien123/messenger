import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    await axios.post ("http://localhost:8080/api/auth/login", userCredential).then( res =>{

    //localStorage.setItem('user',JSON.stringify(res))
   // console.log("res",res.data)
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  })
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};

