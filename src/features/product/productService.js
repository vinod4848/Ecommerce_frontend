import axios from "axios";
import { base_url } from "../../utils/base_url";
import { Config } from "../../utils/axiosconfig";

const getAllProduct = async () => {
  const response = await axios.get(`${base_url}product/getAllProduct`);
  return response.data;
};

const createProduct = async (product) => {
  const response = await axios.post(
    `${base_url}product/addProduct`,
    product,
    Config
  );
  return response.data;
};

const productService = {
  getAllProduct,
  createProduct,
};
export default productService;
