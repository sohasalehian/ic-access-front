import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8081/api/user/";

const getAllUsers = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

const createUser = (row) => {
  return axios.post(API_URL, row, { headers: authHeader() });
};

const updateUser = (row) => {
  return axios.put(API_URL, row, { headers: authHeader() });
};

const deleteUser = (id) => {
  return axios.delete(API_URL + id, { headers: authHeader() });
};

const updateUserPassword = (password, id) => {
  return axios.post(API_URL + 'password/' + id, password, { headers: authHeader() });
}

const getUserById = (id) => {
  return axios.get(API_URL + id, { headers: authHeader() });
}

// const getUserRolesById = (id) => {
//   return axios.get(API_URL + 'roles' + id, { headers: authHeader() });
// }

export default {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  updateUserPassword,
  getUserById,
  // getUserRolesById
};
