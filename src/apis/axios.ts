import axios from "axios";

export const baseRepository = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
});
