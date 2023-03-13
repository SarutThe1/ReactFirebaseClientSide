//axios
import axios from "axios";

export const createAndUpdateUser = async (authtoken) => {
  return axios.post(
    `${process.env.REACT_APP_API}/auth`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const currentUser = async (authtoken) => {
  return axios.post(
    `${process.env.REACT_APP_API}/current-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const register = async (value) =>
  await axios.post(process.env.REACT_APP_API + "/register", value);

export const loginN = async (value) =>
  await axios.post(process.env.REACT_APP_API + "/login", value);

export const currentNormUser = async (authtoken) => {
  return await axios.post(process.env.REACT_APP_API + "/current-normuser",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
