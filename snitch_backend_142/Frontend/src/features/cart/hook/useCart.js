import { addToCart, getCart, incrementCartItemQuantity, decrementCartItemQuantity, removeCartItem } from "../service/cart.api.js";
import { setCart, addItem, incrementItemQuantity, decrementItemQuantity, removeItem } from "../state/cart.slice.js";
import { useDispatch } from "react-redux"

export const useCart = () => {

    const dispatch = useDispatch()

    async function handleAddToCart({ productId, variantId }) {
        try {
            const data = await addToCart({ productId, variantId })
            console.log("Item added to cart:", data)
            return data
        } catch (error) {
            console.error("Error adding to cart:", error)
            throw error
        }
    }

    async function handleGetCart() {
        try {
            const data = await getCart()
            console.log("Cart data received:", data)
            if (data && data.cart) {
                console.log("Dispatching cart to Redux:", data.cart)
                dispatch(setCart(data.cart))
                return data.cart
            } else {
                console.warn("Invalid cart response structure:", data)
                throw new Error("Invalid response structure")
            }
        } catch (error) {
            console.error("Error fetching cart:", error)
            // Dispatch empty cart on error
            dispatch(setCart({ items: [], total: 0, currency: "INR" }))
            throw error
        }
    }

    async function handleIncrementItemQuantity({ productId, variantId }) {
        try {
            const data = await incrementCartItemQuantity({ productId, variantId })
            dispatch(incrementItemQuantity({ productId, variantId }))
            return data
        } catch (error) {
            console.error("Error incrementing quantity:", error)
            throw error
        }
    }

    async function handleDecrementItemQuantity({ productId, variantId }) {
        try {
            const data = await decrementCartItemQuantity({ productId, variantId })
            dispatch(decrementItemQuantity({ productId, variantId }))
            return data
        } catch (error) {
            console.error("Error decrementing quantity:", error)
            throw error
        }
    }

    async function handleRemoveItem({ cartItemId }) {
        try {
            const data = await removeCartItem({ cartItemId })
            if (data && data.cart) {
                dispatch(setCart(data.cart))
            } else {
                // Fetch fresh cart data
                await handleGetCart()
            }
            return data
        } catch (error) {
            console.error("Error removing item:", error)
            throw error
        }
    }

    return {
        handleAddToCart,
        handleGetCart,
        handleIncrementItemQuantity,
        handleDecrementItemQuantity,
        handleRemoveItem
    }
}