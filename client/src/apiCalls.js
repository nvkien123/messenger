import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    await axios.post (`${process.env.REACT_APP_API_URL}/api/auth/login`, userCredential).then( res =>{
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  })
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};

