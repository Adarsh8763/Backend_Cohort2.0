import axios from "axios"

const cartInstanceApi = axios.create({
    baseURL: "/api/cart",
    withCredentials: true
})

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