import "dotenv/config"
import express from "express";
import Redis from "ioredis";
import mongoose from "mongoose";
import morgan from "morgan";
import userModel from "./models/user.model";


const connectToDB = async () => {
  try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

const redis = new Redis(process.env.REDIS_URI);

redis.once("connect", () => {
  console.log("Connected to Redis");
})

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.get("/users", async (req, res) => {
  try{
    const users = await userModel.findOne({_id: req.params.id});
    res.json(users);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});