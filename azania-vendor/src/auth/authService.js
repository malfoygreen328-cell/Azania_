import axios from "../api/axios";

export const loginRequest = async (credentials) => {
  const response = await axios.post("/auth/login", credentials);
  return response.data; // { accessToken, user }
};

export const refreshRequest = async () => {
  const response = await axios.post("/auth/refresh");
  return response.data; // { accessToken, user }
};

export const logoutRequest = async () => {
  await axios.post("/auth/logout");
};
