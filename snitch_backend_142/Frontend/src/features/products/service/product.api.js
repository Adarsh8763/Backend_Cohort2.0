import axios from "axios"

const productApiInstance = axios.create({
    baseURL: "/api/products",
    withCredentials: true
})

export async function createProduct(formData){
    const response = await productApiInstance.post("/", formData)
    return response.data
}

export async function getSellerProducts(){
    const response = await productApiInstance.get("/seller")
    return response.data
    // console.log(response.data)
}

export async function getAllProducts(){
    const response = await productApiInstance.get("/")

    return response.data
}

export async function getProductDetails(productId){
    const response = await productApiInstance.get(`/details/${productId}`)
    return response.data
}

export async function addProductVariant({productId, formData}){
    const response = await productApiInstance.post(`/${productId}/variants`, formData)

    return response.data
}

export async function searchProducts({search}){
    const response = await productApiInstance.get(`/search?search=${search}`)
    return response.data
}

export async function productRecommendation(productId){
    const response = await productApiInstance.get(`/${productId}/recommendation`)
    return response.data
}