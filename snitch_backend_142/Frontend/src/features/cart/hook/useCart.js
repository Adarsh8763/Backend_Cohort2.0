import { addToCart } from "../service/cart.api.js";
import { setItems, addItem } from "../state/cart.slice.js";
import {useDispatch } from "react-redux"

export const useCart = () => {

    const dispatch = useDispatch()

    async function handleAddToCart({productId, variantId}){
        const data = await addToCart({productId, variantId})
        // dispatch(setItem)
        return data
    }
    return {
        handleAddToCart
    }
}