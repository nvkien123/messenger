import axios from "axios";
import { apiURL } from "./config/config";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    await axios.post (`${apiURL}/api/auth/login`, userCredential).then( res =>{
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  })
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};

