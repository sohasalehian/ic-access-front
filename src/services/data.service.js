import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8081/api/";

const getAllSites = () => {
  return axios.get(API_URL + 'sites/', { headers: authHeader() });
};

const getDataBySite = (site) => {
  return axios.get(API_URL + 'data?site=' + site, { headers: authHeader() });
};

export default {
  getAllSites,
  getDataBySite,
};
