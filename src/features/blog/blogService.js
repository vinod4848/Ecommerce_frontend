import axios from "axios";
import { base_url } from "../../utils/base_url";
import { Config } from "../../utils/axiosconfig";

const getblogs = async () => {
  const response = await axios.get(`${base_url}blog/`, Config);
  return response.data;
};

const createBlog = async (blog) => {
  const response = await axios.post(`${base_url}blog/createBlog`, blog, Config);
  return response.data;
};

const blogService = {
  getblogs,
  createBlog,
};
export default blogService;
