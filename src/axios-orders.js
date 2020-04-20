import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-react-a2896.firebaseio.com/",
});

export default instance;
