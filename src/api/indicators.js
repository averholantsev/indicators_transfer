import axios from "../axios-main";

export const insertIndicators = (token, indicatorsData) => {
  return axios.post(`/indicators.json?auth=${token}`, indicatorsData);
};

export const extractIndicators = (token, userId) => {
  return axios.get(`/indicators.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`);
};

export const deleteIndicators = (id, token) => {
  return axios.delete(`/indicators/${id}.json?auth=${token}`);
};
