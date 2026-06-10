import express from 'express';
import morgan from 'morgan';
import fs from 'fs'

const WORKING_DIR = "/workspace" //Jis folder ko access krna h, jisme kaam krna h

const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.status(200).json({
    message: "Welcome to the sandbox Agent!",
    status: "success"
  })
})

app.get("/list-files", async(req, res) => {
    const elements = await fs.promises.readdir(WORKING_DIR);
    res.status(200).json({
        message: "Elements in the working directory",
        status: "success",
        elements
    });
})


export default app;