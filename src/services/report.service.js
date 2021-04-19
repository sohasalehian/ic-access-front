import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8081/api/report/";

const getAllReports = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

const createReport = (row) => {
  return axios.post(API_URL, row, { headers: authHeader() });
};

const updateReport = (row, id) => {
  return axios.put(API_URL + id, row, { headers: authHeader() });
};

const deleteReport = (id) => {
  return axios.delete(API_URL + id, { headers: authHeader() });
};

export default {
  getAllReports,
  createReport,
  updateReport,
  deleteReport,
};
