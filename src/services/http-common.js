import axios from "axios";

//Make axios call common
export default axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-type": "application/json",
  },
});
