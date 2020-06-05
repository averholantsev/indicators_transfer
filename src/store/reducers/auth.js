import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  userDetails: null,
  prevIndicators: null,
  userIdDb: null,
};

const authStart = (state) => {
  return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false,
  });
};

const authFail = (state, action) => {
  let errorMessage;
  console.log(action.error);

  if (action.error.code === 401) {
    errorMessage = "Ошибка авторизации, проверьте данные и повторите попытку";
  } else if (
    action.error.code === 400 &&
    action.error.message === "EMAIL_EXISTS"
  ) {
    errorMessage = "Пользователь с таким Email уже существует";
  } else if (
    action.error.code === 400 &&
    action.error.message === "EMAIL_NOT_FOUND"
  ) {
    errorMessage = "Пользователь с таким Email еще не зарегистрирован";
  } else if (
    action.error.code === 400 &&
    action.error.message === "INVALID_PASSWORD"
  ) {
    errorMessage = "Не правильно указан пароль";
  }else {
    errorMessage = "Произошла ошибка, попробуйте повторите попытку позднее";
  }
  return updateObject(state, {
    error: errorMessage,
    loading: false,
  });
};

const authLogout = (state) => {
  return updateObject(state, { token: null, userId: null });
};

const loadUserData = (state, action) => {
  return updateObject(state, {
    userDetails: action.userDetails,
    prevIndicators: action.prevIndicators,
    userIdDb: action.userIdDb,
  });
};

const reduser = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state);
    case actionTypes.LOAD_USERDATA_SUCCESS:
      return loadUserData(state, action);
    default:
      return state;
  }
};

export default reduser;
