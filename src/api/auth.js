import CONFIG from "../configuration.json";
import axios from "../axios-main";

export const signInWithEmail = (authData) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${CONFIG.AUTH_API_KEY}`;
  return axios.post(url, authData);
};

export const signUp = (authData) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${CONFIG.AUTH_API_KEY}`;
  return axios.post(url, authData);
};

export const sendOobCode = (requestData) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${CONFIG.AUTH_API_KEY}`;
  return axios.post(url, requestData);
};
