import api from "../../../api/axios";

export const getStore = (slug) => {
  return api.get(`/stores/${slug}`);
};

export const updateStore = (data) => {
  return api.put("/stores/update", data);
};