import axios from "axios";

export const createPet = async (authtoken, value) => {
  return await axios.post(process.env.REACT_APP_API + "/pet", value, {
    headers: {
      authtoken,
    },
  });
};

export const listPet = async () =>
  await axios.get(process.env.REACT_APP_API + "/pet");

export const searchFilters = async (arg) =>
  await axios.post(process.env.REACT_APP_API + "/search/filters", arg);

export const deletePet = async (id) =>
  await axios.delete(process.env.REACT_APP_API + "/pet/" + id);

export const readPet = async (id) =>
  await axios.get(process.env.REACT_APP_API + "/pets/" + id);

export const updatePet = async (authtoken, id, pet) => {
  return await axios.put(process.env.REACT_APP_API + "/pet/"+id, pet, {
    headers: {
      authtoken,
    },
  });
};
