import { setAllProducts, setSellerProducts } from "../state/product.slice.js";
import {
  createProduct,
  getAllProducts,
  getSellerProducts,
} from "../service/product.api.js";
import { useDispatch } from "react-redux";
import { getProductDetails } from "../../products/service/product.api.js"
import { addProductVariant } from "../service/product.api.js";

export const useProduct = () => {
  const dispatch = useDispatch();

  async function handleCreateProduct(formData) {
    const data = await createProduct(formData);
    return data.product;
  }
  async function handleGetSellerProducts() {
    const data = await getSellerProducts();
    dispatch(setSellerProducts(data.products));
    return data.products;
  }

  async function handleGetAllProducts() {
    const data = await getAllProducts();
    dispatch(setAllProducts(data.products));
    return data.products;
  }

  async function handleGetProductDetails(productId) {
    const data = await getProductDetails(productId);
    return data.product;
  }

  async function handleAddProductVariant({productId, formData}){
    const data = await addProductVariant({productId, formData})
    return data.product
  }

  return {
    handleCreateProduct,
    handleGetSellerProducts,
    handleGetAllProducts,
    handleGetProductDetails,
    handleAddProductVariant
  };
};
