import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8081/api/";

const getAllMoEntities = () => {
  return axios.get(API_URL + 'mo-entity', { headers: authHeader() });
};

const getAllMoViews = () => {
  return axios.get(API_URL + 'mo-view', { headers: authHeader() });
};

const getElements = (moEntity, moView) => {
  return axios.get(API_URL + 'mo-element?moEntity=' + moEntity + '&moView=' + moView, { headers: authHeader() });
};

export default {
  getAllMoEntities,
  getAllMoViews,
  getElements,
};
