import { addToCart, getCart } from "../service/cart.api.js";
import { setItems, addItem } from "../state/cart.slice.js";
import {useDispatch } from "react-redux"

export const useCart = () => {

    const dispatch = useDispatch()

    async function handleAddToCart({productId, variantId}){
        const data = await addToCart({productId, variantId})
        return data
    }
    
    async function handleGetCart(){
        const data = await getCart()
        dispatch(setItems(data.cart.items))
    }

    return {
        handleAddToCart,
        handleGetCart
    }
}