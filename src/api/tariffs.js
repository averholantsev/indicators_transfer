import axios from "../axios-main";

export const insertTariff = (token, tariffData) => {
  return axios.post(`/tariffs.json?auth=${token}`, tariffData)
};

export const extractTariff = (token, userId) => {
  return axios.get(`/tariffs.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`);
};

export const updateTariff = (id, token, tariffData) => {
  return axios.patch(`/tariffs/${id}.json?auth=${token}`, tariffData)
}

export const daleteTariff = (id, token) => {
  return axios.delete(`/tariffs/${id}.json?auth=${token}`)
}

