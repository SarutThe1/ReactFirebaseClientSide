import axios from "axios";

export const createAd = async (authtoken, value) => {
  return await axios.post(process.env.REACT_APP_API + "/add", value, {
    headers: {
      authtoken,
    },
  });
};

export const listAd = async () =>
  await axios.get(process.env.REACT_APP_API + "/add");

export const searchFiltersAd = async (arg) =>
  await axios.post(process.env.REACT_APP_API + "/search/filtersad", arg);

export const deleteAd = async (id) =>
  await axios.delete(process.env.REACT_APP_API + "/add/" + id);

export const readAd = async (id) =>
  await axios.get(process.env.REACT_APP_API + "/adds/" + id);

export const updateAd = async (authtoken, id, address) => {
  return await axios.put(process.env.REACT_APP_API + "/add/"+id, address, {
    headers: {
      authtoken,
    },
  });
};