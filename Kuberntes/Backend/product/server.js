import express from "express";
import morgan from "morgan";
import axios from "axios";


const app = express();

app.use(morgan("dev"));

app.get("/api/product", async (req, res) => {
    const response = await axios.get("http://main-server-service/")
    res.send(response.data);
});

app.listen(8080, () => {
    console.log("Product server is running on port 8080");
});