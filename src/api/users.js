import axios from "../axios-main";

export const insertUser = (token, userData) => {
  return axios.post(`/users.json?auth=${token}`, userData);
};

export const extractUser = (token, userId) => {
  return axios.get(`/users.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`);
};

export const updateUser = (id, token, userData) => {
  return axios.patch(`/users/${id}.json?auth=${token}`, userData)
}
