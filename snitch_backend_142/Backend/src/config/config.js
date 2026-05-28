import "dotenv/config"

if(!process.env.MONGO_URI){
    throw new Error ("MONGO_URI is not defined in environment variables")
}

if(!process.env.JWT_SECRET){
    throw new Error ("JWT_SECRET is not defined in environment variables")
}

if(!process.env.CLIENT_ID){
    throw new Error ("CLIENT_ID is not defined in environment variables")
}
if(!process.env.CLIENT_SECRET){
    throw new Error ("CLIENT_SECRET is not defined in environment variables")
}
if(!process.env.RAZORPAY_KEY_ID){
    throw new Error ("RAZORPAY_KEY_ID is not defined in environment variables")
}
if(!process.env.RAZORPAY_KEY_SECRET){
    throw new Error ("RAZORPAY_KEY_SECRET is not defined in environment variables")
}

const config = {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    CLIENT_ID: process.env.CLIENT_ID,
    NODE_ENV: process.env.NODE_ENV,
    IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET
}

export default config