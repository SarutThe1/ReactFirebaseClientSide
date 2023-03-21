//axios
import axios from "axios";

export const readUser = async (id) =>
  await axios.get(process.env.REACT_APP_API + "/users/" + id);

export const updateUser = async (authtoken, id, user) =>
  await axios.put(process.env.REACT_APP_API + "/users/" + id, user,{
    headers: {
      authtoken,
    },
  });
