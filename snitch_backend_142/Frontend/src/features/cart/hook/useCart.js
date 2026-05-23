import { addToCart, getCart, incrementCartItemQuantity, decrementCartItemQuantity, removeCartItem } from "../service/cart.api.js";
import { setItems, addItem, incrementItemQuantity, decrementItemQuantity, removeItem } from "../state/cart.slice.js";
import { useDispatch } from "react-redux"

export const useCart = () => {

    const dispatch = useDispatch()

    async function handleAddToCart({ productId, variantId }) {
        const data = await addToCart({ productId, variantId })
        return data
    }

    async function handleGetCart() {
        const data = await getCart()
        dispatch(setItems(data.cart.items))
        return data.cart
    }

    async function handleIncrementItemQuantity({ productId, variantId }) {
        const data = await incrementCartItemQuantity({ productId, variantId })
        dispatch(incrementItemQuantity({ productId, variantId }))
        return data
    }

    async function handleDecrementItemQuantity({ productId, variantId }) {
        const data = await decrementCartItemQuantity({ productId, variantId })
        dispatch(decrementItemQuantity({ productId, variantId }))
        return data
    }

    async function handleRemoveItem({ cartItemId }) {
        const data = await removeCartItem({ cartItemId })
        if (data.success && data.cart) {
            dispatch(setItems(data.cart.items))
        }
        return data
    }

    return {
        handleAddToCart,
        handleGetCart,
        handleIncrementItemQuantity,
        handleDecrementItemQuantity,
        handleRemoveItem
    }
}