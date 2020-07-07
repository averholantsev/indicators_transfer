import * as actionTypes from "./actionTypes";
import { signInWithEmail, signUp } from "../../api/auth";
import { insertUser, extractUser } from "../../api/users";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccessDone = (token, userId) => {
  return { type: actionTypes.AUTH_SUCCESS, idToken: token, userId: userId };
};

export const authSuccess = (token, userId) => {
  return (dispatch) => {
    dispatch(loadUserData());
    dispatch(authSuccessDone(token, userId));
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const auth = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());

    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    signInWithEmail(authData)
      .then((response) => {
        console.log("auth", response);
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );

        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId);

        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((error) => {
        console.log(error);
        dispatch(authFail(error.response.data.error));
      });
  };
};

export const registration = (email, password, userFormData) => {
  return (dispatch) => {
    dispatch(authStart());

    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    signUp(authData)
      .then((response) => {
        console.log("registration", response);
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );

        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId);

        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));

        userFormData["userId"] = response.data.localId;

        insertUser(response.data.idToken, userFormData)
          .then((response) => {
            console.log("registration insertUser", response);
          })
          .catch((error) => {
            console.log("[ERROR] registration insertUser", error);
          });
      })
      .catch((error) => {
        console.log("[ERROR] registration", error);
        dispatch(authFail(error.response.data.error));
      });
  };
};

export const authLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expirationTime * 1000);
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(authLogout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(authLogout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};

export const loadUserDataSuccess = (userDetails, prevIndicators, userIdDb) => {
  return {
    type: actionTypes.LOAD_USERDATA_SUCCESS,
    userDetails: userDetails,
    prevIndicators: prevIndicators,
    userIdDb: userIdDb,
  };
};

export const loadUserData = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    extractUser(token, userId)
      .then((response) => {
        console.log("loadUserData extractUser", response);
        let dataFromDB = response.data[Object.keys(response.data)];

        dispatch(
          loadUserDataSuccess(
            dataFromDB.userDetails,
            dataFromDB.prevIndicators,
            Object.keys(response.data)[0]
          )
        );
      })
      .catch((error) => {
        console.log("[ERROR] loadUserData extractUser", error);
      });
  };
};
