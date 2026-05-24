import axios from "axios"

const cartInstanceApi = axios.create({
    baseURL: "/api/cart",
    withCredentials: true
})

// Add response interceptor for debugging
cartInstanceApi.interceptors.response.use(
    (response) => {
        console.log("Cart API Response:", response.data)
        return response
    },
    (error) => {
        console.error("Cart API Error:", error.response?.data || error.message)
        return Promise.reject(error)
    }
)

export async function addToCart({productId, variantId}){
    const response = await cartInstanceApi.post(`/add/${productId}/${variantId}`, {
        quantity: 1
    })
    return response.data
}

export async function getCart(){
    const response = await cartInstanceApi.get("/")
    return response.data
}

export async function incrementCartItemQuantity({ productId, variantId }) {
    const response = await cartInstanceApi.patch(`/quantity/increment/${productId}/${variantId}`)
    return response.data
}

export async function decrementCartItemQuantity({ productId, variantId }) {
    const response = await cartInstanceApi.patch(`/quantity/decrement/${productId}/${variantId}`)
    return response.data
}

export async function removeCartItem({ cartItemId }) {
    const response = await cartInstanceApi.delete(`/item/${cartItemId}`)
    return response.data
}