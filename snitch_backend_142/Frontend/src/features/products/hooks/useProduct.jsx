import { setSellerProducts } from "../state/product.slice.js"
import { createProduct, getSellerProducts } from "../service/product.api.js"
import { useDispatch } from "react-redux"

export const useProduct = () => {

    const dispatch = useDispatch()

    async function handleCreateProduct(formData){
        const data = await createProduct(formData)
        return data.products
    }
    async function handleGetSellerProducts(){
        const data = await getSellerProducts()
        dispatch(setSellerProducts(data.products))
        return data.products
    }
    return {
        handleCreateProduct,
        handleGetSellerProducts
    }
}