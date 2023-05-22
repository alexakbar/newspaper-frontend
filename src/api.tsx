import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.1.4:9999/api/v1",
});
