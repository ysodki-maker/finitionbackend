import axios from "axios";

export default axios.create({
  baseURL: "https://corecrm.cosinus.ma", // ton backend Express
});


