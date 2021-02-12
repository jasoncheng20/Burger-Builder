import * as actionTypes from "./actionTypes";
import axios from "../../axios-auth";

export const authStart = () => {
  return { type: actionTypes.AUTH_START };
};

export const authSuccess = (token, userId) => {
  return { type: actionTypes.AUTH_SUCCESS, token: token, userId: userId };
};
export const authFail = (e) => {
  return { type: actionTypes.AUTH_FAIL, error: e };
};

export const logout = () => {
  return {type: actionTypes.AUTH_LOGOUT}
}

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout())
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url = "/accounts:signUp?key=AIzaSyDUMKSDM5i75A9B2-Ty4axSKvu7MKrZLaU";
    if (!isSignup) {
      url =
        "/accounts:signInWithPassword?key=AIzaSyDUMKSDM5i75A9B2-Ty4axSKvu7MKrZLaU";
    }
    axios
      .post(url, authData)
      .then((response) => {
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((err) => {
        console.log(err.response);
        dispatch(authFail(err.response.data.error));
      });
  };
};
