import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        totalPrice: null,
        currency: null,
        items: []
    },
    reducers: {
        setCart: (state, action) => {
            state.items = action.payload.items
            state.totalPrice = action.payload.total
            state.currency = action.payload.currency 
        },
        addItem: (state, action) => {
            state.items.push(action.payload)
        },
        incrementItemQuantity: (state, action) => {
            const { productId, variantId } = action.payload

            state.items = state.items.map( item => {
                const itemProductId = typeof item.product === "object" ? item.product._id : item.product;
                const itemVariantId = typeof item.variant === "object" ? item.variant._id : item.variant;

                if(itemProductId === productId && itemVariantId === variantId){
                    return {
                        ...item,
                        quantity: item.quantity + 1
                    }
                }
                else{
                    return item
                }
            })
        },
        decrementItemQuantity: (state, action) => {
            const { productId, variantId } = action.payload

            state.items = state.items.map( item => {
                const itemProductId = typeof item.product === "object" ? item.product._id : item.product;
                const itemVariantId = typeof item.variant === "object" ? item.variant._id : item.variant;

                if(itemProductId === productId && itemVariantId === variantId){
                    return {
                        ...item,
                        quantity: item.quantity - 1
                    }
                }
                else{
                    return item
                }
            })
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item._id !== action.payload)
        }
    }
})

export const { setCart, addItem, incrementItemQuantity, decrementItemQuantity, removeItem } = cartSlice.actions
export default cartSlice.reducer