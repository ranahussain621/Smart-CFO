import axios from "axios";

const baseURL = "http://localhost:4000/";

const Myaxios = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/////For Form Data Request to Backend
const FormData = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/form-data",
  },
});

/////For urlEncodedRequest Request to Backend
const urlEncodedRequest = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export { Myaxios, baseURL, FormData, urlEncodedRequest };
