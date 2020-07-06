import CONFIG from "../configuration.json";
import axios from "../axios-main";

export const signInWithEmail = (authData) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${CONFIG.AUTH_API_KEY}`;
  return axios.post(url, authData);
};

export const signUp = (authData) => {
  let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${CONFIG.AUTH_API_KEY}`;
  return axios.post(url, authData);
};
