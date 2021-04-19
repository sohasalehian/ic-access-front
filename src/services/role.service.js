import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8081/api/role/";

const getAllRoles = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

const createRole = (row) => {
  return axios.post(API_URL, row, { headers: authHeader() });
};

const updateRole = (row) => {
  return axios.put(API_URL, row, { headers: authHeader() });
};

const deleteRole = (id) => {
  return axios.delete(API_URL + id, { headers: authHeader() });
};

const getRoleById = (id) => {
  return axios.get(API_URL + id, { headers: authHeader() });
};

export default {
  getAllRoles,
  createRole,
  updateRole,
  deleteRole,
  getRoleById
};
