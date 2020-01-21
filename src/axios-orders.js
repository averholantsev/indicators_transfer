import axios from "axios";

const instance = axios.create({
  baseURL: "https://reacttestproject-70f65.firebaseio.com/"
});

export default instance;